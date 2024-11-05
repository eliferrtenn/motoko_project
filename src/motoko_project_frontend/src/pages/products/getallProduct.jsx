import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../../services/productService';
import '../../css/products/getAllProduct.css'; 
import { useHistory } from 'react-router-dom'; 

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [message, setMessage] = useState('');
    const history = useHistory(); // useHistory hook'u ile yönlendirme işlemi yapacağız

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const fetchedProducts = await getAllProducts();
                setProducts(fetchedProducts);
            } catch (error) {
                setMessage(`Hata: ${error.message}`);
            }
        };

        fetchProducts();
    }, []);

    const handleProductClick = (productId) => {
        history.push(`/product/${productId}`); // Ürüne tıklandığında detay sayfasına yönlendiriyoruz
    };

    const handleAddProduct = () => {
        history.push('/add-product'); // Yeni ürün ekleme sayfasına yönlendiriyoruz
    };

    return (
        <div className="container">
            <h1>Ürün Listesi</h1>
            {message && <div id="message">{message}</div>}
            <button className="add-product-button" onClick={handleAddProduct}>
                Yeni Ekle
            </button>
            <ul>
                {products.map((product) => (
                    <li key={product.id} onClick={() => handleProductClick(product.id)}>
                        {product.name} - Fiyat: {product.price} - Stokta: {product.inStock ? 'Evet' : 'Hayır'}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
