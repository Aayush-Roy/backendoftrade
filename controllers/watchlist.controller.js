import { prisma } from "../lib/prisma.js";


// add stock to watchlist
export const addToWatchlist = async (req,res)=>{
  try{

    const { name, price, percent, isDown } = req.body;

    const data = await prisma.watchlist.create({
      data:{
        name,
        price,
        percent,
        isDown,
        userId:req.user.id
      }
    })

    res.json(data)

  }catch(err){
    console.log(err)
  }
}



// get watchlist
export const getWatchlist = async (req,res)=>{
  try{

    const data = await prisma.watchlist.findMany(
    //     {
    //   where:{
    //     userId:req.user.id
    //   }
    // }
)

    res.json(data)

  }catch(err){
    console.log(err)
  }
}



// delete stock from watchlist
export const deleteFromWatchlist = async (req,res)=>{
  try{

    const { id } = req.params;

    await prisma.watchlist.delete({
      where:{
        id:Number(id)
      }
    })

    res.json({
      message:"removed"
    })

  }catch(err){
    console.log(err)
  }
}