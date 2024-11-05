import React, { useState } from 'react';
import { addProduct } from '../../services/productService';
import '../../css/products/addProduct.css'; 

const AddProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const productId = await addProduct(name, price, description);
            setMessage(`Ürün başarıyla eklendi, ID: ${productId}`);
        } catch (error) {
            setMessage(`Hata: ${error.message}`);
        }
    };

    return (
        <div className="container">
            <h1>Ürün Ekle</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Ürün Adı:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <label htmlFor="price">Fiyat:</label>
                <input
                    type="number"
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    required
                />

                <label htmlFor="description">Açıklama:</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />

                <button type="submit">Ürün Ekle</button>
            </form>
            {message && <div id="message">{message}</div>}
        </div>
    );
};

export default AddProduct;