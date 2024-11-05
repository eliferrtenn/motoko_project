import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'; 
import { getProduct } from '../../services/productService';
import '../../css/products/getProduct.css'; 

const ProductDetail = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState<Product | null>(null);  
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        const fetchProduct = async () => {
            if (productId) {
                try {
                    const fetchedProduct = await getProduct(Number(productId)); 
                    setProduct(fetchedProduct);
                } catch (error) {
                    setMessage(`Hata: ${error.message}`);
                }
            }
        };

        fetchProduct();
    }, [productId]); 

    if (!product) {
        return <div className="loading">Yükleniyor...</div>;
    }

    return (
        <div className="product-detail-container">
            <h1 className="product-title">{product.name}</h1>
            {message && <div className="error-message">{message}</div>}
            <div className="product-details">
                <p><strong>Açıklama:</strong> {product.description}</p>
                <p><strong>Fiyat:</strong> {product.price} TL</p>
                <p><strong>Stok Durumu:</strong> {product.inStock ? 'Stokta Var' : 'Stokta Yok'}</p>
            </div>

            {/* Stok Durumu Güncelleme Linki Eklendi */}
            <Link to={`/update-product/${product.id}`} className="update-link">
                Stok Durumunu Güncelle
            </Link>

            <button className="back-button" onClick={() => window.history.back()}>Geri Dön</button>
        </div>
    );
};

export default ProductDetail;