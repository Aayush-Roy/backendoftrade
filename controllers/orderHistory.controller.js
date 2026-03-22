import { prisma } from "../lib/prisma.js";


export const getOrders = async (req,res)=>{
  try{

    const data = await prisma.order.findMany({
      where:{
        userId:req.user.id
      },
      orderBy:{
        id:"desc"
      }
    })

    res.json(data)

  }catch(err){
    console.log(err)
  }
}