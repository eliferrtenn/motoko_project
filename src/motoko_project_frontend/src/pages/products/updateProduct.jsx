import React, { useEffect, useState } from 'react';
import { getProduct, updateStockStatus } from '../../services/productService'; // Servis dosyanızın yolu
import '../../css/products/updateProduct.css'; 

const UpdateProduct = ({ productId }) => {
    const [product, setProduct] = useState(null);
    const [inStock, setInStock] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const fetchedProduct = await getProduct(productId);
                setProduct(fetchedProduct);
                setInStock(fetchedProduct?.inStock);
            } catch (error) {
                setMessage(`Hata: ${error.message}`);
            }
        };

        fetchProduct();
    }, [productId]);

    const handleUpdate = async (event) => {
        event.preventDefault();
        try {
            const success = await updateStockStatus(productId, inStock);
            if (success) {
                //TO DO : Mesajlar constantsa alınacak
                setMessage('Stok durumu başarıyla güncellendi.');
            } else {
                setMessage('Güncelleme sırasında hata oluştu.');
            }
        } catch (error) {
            setMessage(`Hata: ${error.message}`);
        }
    };

    if (!product) return <div>Yükleniyor...</div>;

    return (
        <div className="container">
            <h1>Ürünü Güncelle</h1>
            <form onSubmit={handleUpdate}>
                <label htmlFor="name">Ürün Adı:</label>
                <input
                    type="text"
                    id="name"
                    value={product.name}
                    readOnly
                />

                <label htmlFor="price">Fiyat:</label>
                <input
                    type="number"
                    id="price"
                    value={product.price}
                    readOnly
                />

                <label htmlFor="inStock">Stok Durumu:</label>
                <select
                    id="inStock"
                    value={inStock}
                    onChange={(e) => setInStock(e.target.value === 'true')}
                >
                    <option value="true">Stokta Var</option>
                    <option value="false">Stokta Yok</option>
                </select>

                <button type="submit">Güncelle</button>
            </form>
            {message && <div id="message">{message}</div>}
        </div>
    );
};

export default UpdateProduct;