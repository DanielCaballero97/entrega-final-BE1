import e, { Router } from "express";
import Cart from "../models/Cart.js"

const cartsRoutes = Router();


cartsRoutes.get('/',async (req,res)=>{
    let cart = await Cart.find({}).populate();
    res.json(cart)
})

cartsRoutes.get("/:cid",async(req,res)=>{
    const { cid } = req.params;
    console.log(cid)
    const cart = await Cart.findOne({_id:cid}).populate();
    console.log(cart)
    res.json(cart)
})

cartsRoutes.post('/',async(req,res)=>{
    const body = req.body
    const cart = await Cart.create(body)
    res.status(200).json(cart)
})

cartsRoutes.put("/:cid",async(req,res)=>{
    try {
        const { cid } = req.params
        const body = req.body
        const cart = await Cart.findOne({_id:cid})
        body.forEach(e => {

            cart.products.push({product: e.id , quantity: e.quantity})

        });
        await Cart.updateOne({_id:cid},cart);
        res.status(200).json({cart});

    } catch (error) {
        res.json(error)
    }
})

cartsRoutes.put("/:cid/products/:pid",async(req,res)=>{
    try {
        const { cid , pid } = req.params
        const body = req.body
        const cart = await Cart.findOne({_id:cid})
        cart.products.forEach(e => {
            if(e.id = pid)
                e.quantity = body.newQuantity
        });
        await Cart.updateOne({_id:cid},cart)
        res.status(200).json({cart})
    } catch (error) {
        res.json(error)
    }
})

cartsRoutes.delete("/:cid",async(req,res)=>{
    try {
        const { cid } = req.params
        const cart = await Cart.findOne({_id:cid})
        cart.products = []
        await Cart.updateOne({_id:cid},cart)
        res.status(200).json(cart)
    } catch (error) {
        res.json(error)
    }
})

export default cartsRoutes;