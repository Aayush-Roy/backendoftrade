import { prisma } from "../lib/prisma.js";


// BUY STOCK
export const buyStock = async (req,res)=>{
  try{

    const { name, qty, price, product="CNC" } = req.body;

    const userId = req.user.id;

    // 1 create order
    await prisma.order.create({
      data:{
        name,
        qty,
        price,
        mode:"BUY",
        userId
      }
    })


    // 2 check position exists
    const existingPosition = await prisma.position.findFirst({
      where:{ name, userId }
    })

    if(existingPosition){

      const totalQty = existingPosition.qty + qty;

      const newAvg =
        ((existingPosition.avg * existingPosition.qty) + (price * qty))
        / totalQty;

      await prisma.position.update({
        where:{ id: existingPosition.id },
        data:{
          qty: totalQty,
          avg: newAvg,
          price
        }
      })

    }else{

      await prisma.position.create({
        data:{
          product,
          name,
          qty,
          avg: price,
          price,
          net:"0",
          day:"0",
          isLoss:false,
          userId
        }
      })

    }


    // 3 update holding
    const existingHolding = await prisma.holding.findFirst({
      where:{ name, userId }
    })


    if(existingHolding){

      const totalQty = existingHolding.qty + qty;

      const newAvg =
        ((existingHolding.avg * existingHolding.qty) + (price * qty))
        / totalQty;

      await prisma.holding.update({
        where:{ id: existingHolding.id },
        data:{
          qty: totalQty,
          avg: newAvg,
          price
        }
      })

    }else{

      await prisma.holding.create({
        data:{
          name,
          qty,
          avg: price,
          price,
          net:"0",
          day:"0",
          isLoss:false,
          userId
        }
      })

    }


    res.json({
      message:"Stock bought successfully"
    })

  }catch(err){
    console.log(err)
    res.status(500).json({error:"buy failed"})
  }
}






// SELL STOCK
export const sellStock = async (req,res)=>{
  try{

    const { name, qty, price } = req.body;

    const userId = req.user.id;


    // create sell order
    await prisma.order.create({
      data:{
        name,
        qty,
        price,
        mode:"SELL",
        userId
      }
    })


    // update position
    const existingPosition = await prisma.position.findFirst({
      where:{ name, userId }
    })


    if(!existingPosition){
      return res.status(400).json({
        message:"No position found"
      })
    }


    const remainingQty = existingPosition.qty - qty;


    if(remainingQty <= 0){

      await prisma.position.delete({
        where:{ id: existingPosition.id }
      })

    }else{

      await prisma.position.update({
        where:{ id: existingPosition.id },
        data:{
          qty: remainingQty,
          price
        }
      })

    }



    // update holding
    const existingHolding = await prisma.holding.findFirst({
      where:{ name, userId }
    })


    if(existingHolding){

      const remainingQty = existingHolding.qty - qty;

      if(remainingQty <= 0){

        await prisma.holding.delete({
          where:{ id: existingHolding.id }
        })

      }else{

        await prisma.holding.update({
          where:{ id: existingHolding.id },
          data:{
            qty: remainingQty,
            price
          }
        })

      }

    }


    res.json({
      message:"Stock sold successfully"
    })

  }catch(err){
    console.log(err)
    res.status(500).json({error:"sell failed"})
  }
}