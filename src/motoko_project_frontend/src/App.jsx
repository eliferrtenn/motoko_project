import React, { useState, useEffect } from 'react';
import AddProduct from './pages/products/addProduct.jsx';
import { getAllProducts } from './services/productService'; 
import './App.css';

function App() {
    const [greeting, setGreeting] = useState('');
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [products, setProducts] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const fetchedProducts = await getAllProducts();
                setProducts(fetchedProducts);
                if (fetchedProducts.length === 0) {
                    setMessage('Şu an ürün bulunmamaktadır. Lütfen yeni ürün ekleyin!');
                }
            } catch (error) {
                setMessage(`Hata: ${error.message}`);
            }
        };

        fetchProducts();
    }, []);

    function handleSubmit(event) {
        event.preventDefault();
        const name = event.target.elements.name.value;
        motoko_project_backend.greet(name).then((greeting) => {
            setGreeting(greeting);
        });
    }

    return (
        <div className="app-container">
            <header className="app-header">
                <img src="/logo2.svg" alt="DFINITY logo" className="logo" />
                <button className="add-product-btn" onClick={() => setShowAddProduct(!showAddProduct)}>
                    {showAddProduct ? 'Ürün Ekleme Formunu Gizle' : 'Ürün Ekle'}
                </button>
            </header>

            {showAddProduct && <AddProduct />}

            {message && <div className="message">{message}</div>}

            {products.length > 0 ? (
                <section className="product-list">
                    <h2>Ürünler Listesi</h2>
                    <ul>
                        {products.map((product) => (
                            <li key={product.id} className="product-item">
                                <span>{product.name}</span> - Fiyat: <strong>{product.price}₺</strong> - Stokta: {product.inStock ? 'Evet' : 'Hayır'}
                            </li>
                        ))}
                    </ul>
                </section>
            ) : (
                <section className="empty-message">
                    <p>Henüz eklenmiş ürün bulunmamaktadır. Yeni ürün eklemek için "Ürün Ekle" butonuna tıklayın!</p>
                </section>
            )}
        </div>
    );
}

export default App;