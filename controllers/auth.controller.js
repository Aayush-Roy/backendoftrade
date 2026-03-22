import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma.js";

const JWT_SECRET = process.env.JWT_SECRET || "secret123";


// REGISTER
export const register = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    // check existing user
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { username }
        ]
      }
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await prisma.user.create({
      data: {
        name,
        username,
        email,
        password: hashedPassword
      }
    });

    return res.status(201).json({
      message: "User registered successfully",
      user
    });

  } catch (err) {
    console.log("Register error", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};



// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // find user
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    // create token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      user:{
        id:user.id,
        name:user.name,
        email:user.email,
        username:user.username
      }
    });

  } catch (err) {
    console.log("Login error", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};