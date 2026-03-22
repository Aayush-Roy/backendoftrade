// import { prisma } from "../lib/prisma.js"

// export const getAllHoldings = async(req,res)=>{
//     try{
//         const data = await prisma.holding.findMany();
//         return res.status(200).json(data);
//     }catch(err){
//         console.log("Failed to fetch holdings", err)
//     }
// }

// export const getAllPositions = async(req,res)=>{
//     try{
//         const data = await prisma.position.findMany();
//         return res.status(200).json(data);
//     }catch(err){
//          console.log("Failed to fetch Positions", err)
//     }
// }

import { prisma } from "../lib/prisma.js";

export const getAllHoldings = async(req,res)=>{
    try{

        const data = await prisma.holding.findMany({
            where:{
                userId:req.user.id
            }
        });

        return res.status(200).json({data});

    }catch(err){
        console.log("Failed to fetch holdings", err)
    }
}

export const getAllPositions = async(req,res)=>{
    try{

        const data = await prisma.position.findMany({
            where:{
                userId:req.user.id
            }
        });

        return res.status(200).json(data);

    }catch(err){
         console.log("Failed to fetch Positions", err)
    }
}