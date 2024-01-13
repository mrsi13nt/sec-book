import Layout from "@/components/layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DeleteProductPage() {
    const router = useRouter()
    const [productInfo,setProductInfo] = useState()
    const {id} = router.query
    useEffect(() => {
        if (!id) {
            return;
        }
        console.log('Product ID:', id); // Log the value of id
        axios.get(`/api/products?id=${id}`).then(response => {
            setProductInfo(response.data);
        });
    }, [id]);
    function goBack() {
        router.push('/products')
    }
    async function deleteProduct() {
        try {
            await axios.delete(`/api/products?id=${id}`);
            goBack();
        } catch (error) {
            console.error('Error deleting product:', error);
            // Handle error as needed
        }
    }
    return (
        <Layout>
            <h1 className="text-center">
                Do you really want to delete "{productInfo?.title}" ?
            </h1>
            <div className="flex gap-2 justify-center">
                <button className="btn-red" onClick={deleteProduct}>Yes</button>
                <button className="btn-default" onClick={goBack}>No</button>
            </div>
        </Layout>
    )
}