import React, { useState, useEffect } from 'react';
import { ref, set, onValue, db } from '../../../';
import axios from 'axios';

const ProductsAdmin = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', image: '', hashtags: '' });
  const cloudinaryPreset = "farhadsultan";
  const cloudinaryCloudName = "dbiltdpxh";

  useEffect(() => {
    const productsRef = ref(db, 'products');
    const unsubscribe = onValue(productsRef, (snapshot) => {
      const data = snapshot.val() || [];
      setProducts(data);
    });
    return () => unsubscribe();
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', cloudinaryPreset);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/upload`,
        formData
      );
      setNewProduct(prev => ({ ...prev, image: response.data.secure_url }));
    } catch (error) {
      console.error('Image upload failed:', error);
      alert('Failed to upload image');
    }
  };

  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.description || !newProduct.price || !newProduct.image) {
      alert('Please fill all fields');
      return;
    }
    const updatedProducts = [...products, { ...newProduct, hashtags: newProduct.hashtags.split(',') }];
    await set(ref(db, 'products'), updatedProducts);
    setProducts(updatedProducts);
    setNewProduct({ name: '', description: '', price: '', image: '', hashtags: '' });
  };

  const handleRemoveProduct = async (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    await set(ref(db, 'products'), updatedProducts);
    setProducts(updatedProducts);
  };

  return (
    <div className="products-admin">
      <h2>Products Management</h2>
      <div className="add-product">
        <input
          type="text"
          placeholder="Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
        />
        <textarea
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) => setNewProduct(prev => ({ ...prev, description: e.target.value }))}
        />
        <input
          type="text"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct(prev => ({ ...prev, price: e.target.value }))}
        />
        <input
          type="text"
          placeholder="Hashtags (comma separated)"
          value={newProduct.hashtags}
          onChange={(e) => setNewProduct(prev => ({ ...prev, hashtags: e.target.value }))}
        />
        <input type="file" onChange={handleImageUpload} />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>
      <div className="products-list">
        {products.map((product, index) => (
          <div key={index} className="product-item">
            <img src={product.image} alt={product.name} />
            <div>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>{product.price}</p>
              <p>{product.hashtags.join(', ')}</p>
              <button onClick={() => handleRemoveProduct(index)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsAdmin;