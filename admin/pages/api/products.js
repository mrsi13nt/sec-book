import { mongooseConnect } from "@/lib/mongoose"
import { Product } from "@/models/product"

export default async function hundle(req, res) {
    const {method, query} = req
    await mongooseConnect()

    if (method === 'GET') {
        if (req.query?.id) {
            res.json(await Product.findOne({_id:req.query.id}))
        } else {
            res.json(await Product.find())
        }
    }

    if (method === 'POST') {
        const {title,description,price,images} = req.body
        const productDoc = await Product.create({
            title,description,price,images
        })
        res.json(productDoc)
    }
    if (method === 'PUT') {
        const {title,description,price,images,_id} = req.body
        await Product.updateOne({_id},{title,description,price,images})
        res.json(true)
    }
    if (method === 'DELETE') {
        try {
            if (query?.id) {
                await Product.deleteOne({ _id: query.id });
                res.json(true);
            } else {
                res.status(400).json({ error: 'Missing product ID' });
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}