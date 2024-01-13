import { Category } from "@/models/category";
import connectDB from "@/db";
connectDB()
export default async function handle(req, res) {
  const { method } = req;

  if (req.method === 'POST') {
    try {
      const { name } = req.body;

      if (!name) {
        return res.status(400).json({ error: 'Category name is required' });
      }

      console.log('Received request with name:', name);

      const categoryDoc = await Category.create({ name }).catch((error) => {
        console.error('Error creating category:', error);
        res.status(200).json({ message: 'Category created successfully' });
      });
      

      console.log('Category created successfully:', categoryDoc);

      res.status(201).json(categoryDoc);
    } catch (error) {
      console.error('Error creating category:', error);

      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
