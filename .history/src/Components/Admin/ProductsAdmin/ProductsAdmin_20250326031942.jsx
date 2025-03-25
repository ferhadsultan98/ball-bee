// src/Pages/BallBeeAdmin/ProductsAdmin/ProductsAdmin.jsx
import React, { useState, useEffect } from "react";
import { ref, set, onValue, db } from "../../../Firebase/Firebase";
import axios from "axios";
import "./ProductsAdmin.scss";

const ProductsAdmin = () => {
  const [products, setProducts] = useState([]);
  const [formProduct, setFormProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    hashtags: "",
  });
  const [editIndex, setEditIndex] = useState(null);
  const cloudinaryPreset = "farhadsultan";
  const cloudinaryCloudName = "dbiltdpxh";

  useEffect(() => {
    const productsRef = ref(db, "products");
    const unsubscribe = onValue(
      productsRef,
      (snapshot) => {
        const data = snapshot.val() || [];
        setProducts(data);
      },
      (error) => {
        alert("Məhsullar tapılmır", error);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", cloudinaryPreset);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/upload`,
        formData
      );
      setFormProduct((prev) => ({ ...prev, image: response.data.secure_url }));
    } catch (error) {
      alert("Yükləmə xətası", error);
    }
  };

  const handleAddOrSaveProduct = async () => {
    if (
      !formProduct.name ||
      !formProduct.description ||
      !formProduct.price ||
      !formProduct.image
    ) {
      alert("Bütün xanaları doldur");
      return;
    }

    let updatedProducts;
    if (editIndex !== null) {
      updatedProducts = [...products];
      updatedProducts[editIndex] = {
        ...formProduct,
        hashtags: formProduct.hashtags.split(",").map((tag) => tag.trim()),
      };
    } else {
      updatedProducts = [
        ...products,
        {
          ...formProduct,
          hashtags: formProduct.hashtags.split(",").map((tag) => tag.trim()),
        },
      ];
    }

    try {
      await set(ref(db, "products"), updatedProducts);
      setProducts(updatedProducts);
      setFormProduct({
        name: "",
        description: "",
        price: "",
        image: "",
        hashtags: "",
      });
      setEditIndex(null);
    } catch (error) {
      alert(`Xəta  ${editIndex !== null ? "update" : "add"} məhsul`);
    }
  };

  const handleEditProduct = (index) => {
    setEditIndex(index);
    setFormProduct({
      ...products[index],
      hashtags: products[index].hashtags.join(", "),
    });
  };

  const handleCancelEdit = () => {
    setEditIndex(null);
    setFormProduct({
      name: "",
      description: "",
      price: "",
      image: "",
      hashtags: "",
    });
  };

  const handleRemoveProduct = async (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    try {
      await set(ref(db, "products"), updatedProducts);
      setProducts(updatedProducts);
    } catch (error) {
      alert("Məhsul silinmədi", error);
    }
  };

  return (
    <div className="products-admin">
      <h2>Məhsullar</h2>

      {/* Unified Form for Add/Edit */}
      <div className="form-section">
        <h3>{editIndex !== null ? "Edit Product" : "Add New Product"}</h3>
        <input
          type="text"
          placeholder="Ad"
          value={formProduct.name}
          onChange={(e) =>
            setFormProduct((prev) => ({ ...prev, name: e.target.value }))
          }
        />
        <textarea
          placeholder="Detay"
          value={formProduct.description}
          onChange={(e) =>
            setFormProduct((prev) => ({ ...prev, description: e.target.value }))
          }
        />
        <input
          type="text"
          placeholder="Qiymət"
          value={formProduct.price}
          onChange={(e) =>
            setFormProduct((prev) => ({ ...prev, price: e.target.value }))
          }
        />
        <input
          type="text"
          placeholder="Haştaqlar (vergül ilə və ayrı yaz)"
          value={formProduct.hashtags}
          onChange={(e) =>
            setFormProduct((prev) => ({ ...prev, hashtags: e.target.value }))
          }
        />
        <input type="file" onChange={handleImageUpload} />
        {formProduct.image && (
          <div className="image-preview">
            <img src={formProduct.image} alt="Preview" />
          </div>
        )}
        <div className="form-buttons">
          <button className="action-btn" onClick={handleAddOrSaveProduct}>
            {editIndex !== null ? "Saxla" : "Əlavə et"}
          </button>
          {editIndex !== null && (
            <button className="cancel-btn" onClick={handleCancelEdit}>
              Ləğv
            </button>
          )}
        </div>
      </div>

      {/* Products List as Cards */}
      <div className="products-list">
        {products.length === 0 ? (
          <p>Məhsul yoxdur</p>
        ) : (
          products.map((product, index) => (
            <div key={index} className="product-card">
              <img src={product.image} alt={product.name} />
              <div className="card-content">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p className="price">Qiymət: {product.price}₼</p>
                <p className="hashtags">
                  Haştaqlar: {product.hashtags.join(", ")}
                </p>
                <div className="card-buttons">
                  <button
                    className="edit-btn"
                    onClick={() => handleEditProduct(index)}
                  >
                    Sil
                  </button>
                  <button
                    className="remove-btn"
                    onClick={() => handleRemoveProduct(index)}
                  >
                    Düzəlt
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductsAdmin;
