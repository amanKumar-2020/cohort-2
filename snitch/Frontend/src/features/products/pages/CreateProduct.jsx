import React, { useState } from 'react';
import './CreateProduct.css';
// Icons
import { FiPlus, FiTrash2, FiImage, FiSave, FiTag, FiDollarSign, FiLayers, FiList } from 'react-icons/fi';

const CreateProduct = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    brand: '',
    category: '',
    subCategory: '',
    amount: '',
    originalAmount: '',
    currency: 'INR',
  });

  const [attributes, setAttributes] = useState([
    { key: '', value: '' }
  ]);

  const [variants, setVariants] = useState([
    {
      color: '',
      images: [], // array of File objects
      sizes: [{ size: '', stock: '' }]
    }
  ]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAttributeChange = (index, field, value) => {
    const newAttrs = [...attributes];
    newAttrs[index][field] = value;
    setAttributes(newAttrs);
  };

  const handleAddAttribute = () => {
    setAttributes([...attributes, { key: '', value: '' }]);
  };

  const handleRemoveAttribute = (index) => {
    const newAttrs = attributes.filter((_, i) => i !== index);
    setAttributes(newAttrs);
  };

  const handleVariantChange = (index, field, value) => {
    const newVariants = [...variants];
    newVariants[index][field] = value;
    setVariants(newVariants);
  };

  const handleAddVariant = () => {
    setVariants([
      ...variants,
      { color: '', images: [], sizes: [{ size: '', stock: '' }] }
    ]);
  };

  const handleRemoveVariant = (index) => {
    if (variants.length > 1) {
      const newVariants = variants.filter((_, i) => i !== index);
      setVariants(newVariants);
    }
  };

  const handleImageFileChange = (variantIndex, e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const newVariants = [...variants];
      newVariants[variantIndex].images = [...newVariants[variantIndex].images, ...filesArray];
      setVariants(newVariants);
    }
    // reset input value so the same file can be uploaded again if needed
    e.target.value = null;
  };

  const handleRemoveImage = (variantIndex, imgIndex) => {
    const newVariants = [...variants];
    newVariants[variantIndex].images = newVariants[variantIndex].images.filter((_, i) => i !== imgIndex);
    setVariants(newVariants);
  };

  const handleSizeChange = (variantIndex, sizeIndex, field, value) => {
    const newVariants = [...variants];
    newVariants[variantIndex].sizes[sizeIndex][field] = value;
    setVariants(newVariants);
  };

  const handleAddSize = (variantIndex) => {
    const newVariants = [...variants];
    newVariants[variantIndex].sizes.push({ size: '', stock: '' });
    setVariants(newVariants);
  };

  const handleRemoveSize = (variantIndex, sizeIndex) => {
    const newVariants = [...variants];
    newVariants[variantIndex].sizes = newVariants[variantIndex].sizes.filter((_, i) => i !== sizeIndex);
    setVariants(newVariants);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const submitData = new FormData();
      
      // General info
      submitData.append('name', formData.name);
      submitData.append('description', formData.description);
      submitData.append('brand', formData.brand);
      submitData.append('category', formData.category);
      submitData.append('subCategory', formData.subCategory);
      
      // Pricing
      submitData.append('price[amount]', formData.amount);
      submitData.append('price[originalAmount]', formData.originalAmount);
      submitData.append('price[currency]', formData.currency);
      
      // Attributes
      const validAttributes = attributes.filter(attr => attr.key.trim() !== '' && attr.value.trim() !== '');
      validAttributes.forEach((attr, i) => {
        submitData.append(`attributes[${i}][key]`, attr.key);
        submitData.append(`attributes[${i}][value]`, attr.value);
      });

      // Variants
      variants.forEach((v, vIndex) => {
        submitData.append(`variants[${vIndex}][color]`, v.color);
        
        // Sizes
        v.sizes.forEach((s, sIndex) => {
          if (s.size.trim() !== '') {
            submitData.append(`variants[${vIndex}][sizes][${sIndex}][size]`, s.size);
            submitData.append(`variants[${vIndex}][sizes][${sIndex}][stock]`, s.stock);
          }
        });
        
        // Images (File upload via multipart form-data)
        v.images.forEach((file) => {
           // Using a standard naming convention that your backend multer should pick up
           // E.g., appending files as `images_${vIndex}` or grouping them
           submitData.append(`variants[${vIndex}][images]`, file);
        });
      });

      // Pointing to your server endpoint
      const response = await fetch('http://localhost:3000/api/products', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Content-Type is auto-set to multipart/form-data with boundary
        },
        body: submitData
      });

      const data = await response.json().catch(() => ({ message: 'Invalid server response' }));

      if (response.ok) {
        setSuccess('Product created successfully!');
      } else {
        setError(data.message || 'Failed to create product');
      }
    } catch (err) {
      setError('Network error or server unreachable',err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product-page">
      <div className="product-card">
        <div className="product-header">
          <span className="product-header__label">DASHBOARD</span>
          <h1 className="product-header__title">Create Product</h1>
          <p className="product-header__subtitle">Add a new premium product to your inventory</p>
        </div>

        {error && <div className="product-alert error">{error}</div>}
        {success && <div className="product-alert success">{success}</div>}

        <form className="product-form" onSubmit={handleSubmit}>
          {/* General Information */}
          <div className="form-section full-width">
            <h3 className="section-title"><FiTag /> General Info</h3>
            <div className="form-grid">
              <div className="input-group">
                <label className="input-group__label">Product Name</label>
                <div className="input-group__wrapper">
                  <input
                    type="text"
                    name="name"
                    className="input-group__field"
                    placeholder="e.g. Black Hoodie"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div className="input-group">
                <label className="input-group__label">Brand</label>
                <div className="input-group__wrapper">
                  <input
                    type="text"
                    name="brand"
                    className="input-group__field"
                    placeholder="e.g. Generic"
                    value={formData.brand}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="input-group">
                <label className="input-group__label">Category</label>
                <div className="input-group__wrapper">
                  <input
                    type="text"
                    name="category"
                    className="input-group__field"
                    placeholder="e.g. men"
                    list="category-suggestions"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  />
                  <datalist id="category-suggestions">
                    <option value="men" />
                    <option value="women" />
                    <option value="kids" />
                    <option value="unisex" />
                  </datalist>
                </div>
              </div>

              <div className="input-group">
                <label className="input-group__label">Sub Category</label>
                <div className="input-group__wrapper">
                  <input
                    type="text"
                    name="subCategory"
                    className="input-group__field"
                    placeholder="e.g. general"
                    list="subcategory-suggestions"
                    value={formData.subCategory}
                    onChange={handleChange}
                    required
                  />
                  <datalist id="subcategory-suggestions">
                    <option value="topwear" />
                    <option value="bottomwear" />
                    <option value="winterwear" />
                    <option value="footwear" />
                    <option value="accessories" />
                    <option value="general" />
                  </datalist>
                </div>
              </div>

              <div className="input-group full-width">
                <label className="input-group__label">Description</label>
                <div className="input-group__wrapper">
                  <textarea
                    name="description"
                    className="input-group__field textarea"
                    placeholder="Premium hoodie with excellent comfort..."
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={4}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Attributes */}
          <div className="form-section full-width">
            <div className="section-header">
              <h3 className="section-title"><FiList /> Attributes</h3>
              <button type="button" className="btn-secondary" onClick={handleAddAttribute}>
                <FiPlus /> Add Attribute
              </button>
            </div>
            <div className="attributes-list">
              {attributes.map((attr, index) => (
                <div key={index} className="attribute-row">
                  <input
                    type="text"
                    className="input-group__field"
                    placeholder="Key (e.g. fabric)"
                    value={attr.key}
                    onChange={(e) => handleAttributeChange(index, 'key', e.target.value)}
                  />
                  <input
                    type="text"
                    className="input-group__field"
                    placeholder="Value (e.g. cotton)"
                    value={attr.value}
                    onChange={(e) => handleAttributeChange(index, 'value', e.target.value)}
                  />
                  <button type="button" className="btn-icon danger" onClick={() => handleRemoveAttribute(index)}>
                    <FiTrash2 />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing */}
          <div className="form-section full-width">
            <h3 className="section-title"><FiDollarSign /> Pricing</h3>
            <div className="form-grid">
              <div className="input-group">
                <label className="input-group__label">Selling Price</label>
                <div className="input-group__wrapper">
                  <input
                    type="number"
                    name="amount"
                    className="input-group__field"
                    placeholder="e.g. 999"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="input-group">
                <label className="input-group__label">Original Price</label>
                <div className="input-group__wrapper">
                  <input
                    type="number"
                    name="originalAmount"
                    className="input-group__field"
                    placeholder="e.g. 1499"
                    value={formData.originalAmount}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="input-group">
                <label className="input-group__label">Currency</label>
                <div className="input-group__wrapper">
                  <select name="currency" className="input-group__field" value={formData.currency} onChange={handleChange}>
                    <option value="INR">INR</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Variants */}
          <div className="form-section full-width variants-section">
            <div className="section-header">
              <h3 className="section-title"><FiLayers /> Product Variants</h3>
              <button type="button" className="btn-secondary" onClick={handleAddVariant}>
                <FiPlus /> Add Variant
              </button>
            </div>

            {variants.map((variant, vIndex) => (
              <div key={vIndex} className="variant-card">
                <div className="variant-card-header">
                  <h4>Variant {vIndex + 1}</h4>
                  {variants.length > 1 && (
                    <button type="button" className="btn-icon danger" onClick={() => handleRemoveVariant(vIndex)}>
                      <FiTrash2 />
                    </button>
                  )}
                </div>

                <div className="form-grid">
                  <div className="input-group full-width">
                    <label className="input-group__label">Color</label>
                    <div className="input-group__wrapper">
                      <input
                        type="text"
                        className="input-group__field"
                        placeholder="e.g. black"
                        list={`color-suggestions-${vIndex}`}
                        value={variant.color}
                        onChange={(e) => handleVariantChange(vIndex, 'color', e.target.value)}
                        required
                      />
                      <datalist id={`color-suggestions-${vIndex}`}>
                        <option value="black" />
                        <option value="white" />
                        <option value="red" />
                        <option value="blue" />
                        <option value="green" />
                        <option value="yellow" />
                        <option value="navy" />
                        <option value="grey" />
                        <option value="brown" />
                        <option value="beige" />
                      </datalist>
                    </div>
                  </div>

                  {/* Sizes */}
                  <div className="input-group full-width sub-section">
                    <label className="input-group__label sub-label">Sizes & Stock</label>
                    {variant.sizes.map((size, sIndex) => (
                      <div key={sIndex} className="size-row">
                        <input
                          type="text"
                          className="input-group__field"
                          placeholder="Size (e.g. M)"
                          value={size.size}
                          onChange={(e) => handleSizeChange(vIndex, sIndex, 'size', e.target.value)}
                          required
                        />
                        <input
                          type="number"
                          className="input-group__field"
                          placeholder="Stock"
                          value={size.stock}
                          onChange={(e) => handleSizeChange(vIndex, sIndex, 'stock', e.target.value)}
                          required
                        />
                        {variant.sizes.length > 1 && (
                          <button type="button" className="btn-icon danger" onClick={() => handleRemoveSize(vIndex, sIndex)}>
                            <FiTrash2 />
                          </button>
                        )}
                      </div>
                    ))}
                    <button type="button" className="btn-text" onClick={() => handleAddSize(vIndex)}>
                      <FiPlus /> Add Size
                    </button>
                  </div>

                  {/* Images (File Upload) */}
                  <div className="input-group full-width sub-section">
                    <label className="input-group__label sub-label"><FiImage /> Upload Images</label>
                    <input 
                      type="file" 
                      accept="image/*" 
                      multiple 
                      className="file-input" 
                      onChange={(e) => handleImageFileChange(vIndex, e)} 
                    />
                    
                    {variant.images.length > 0 && (
                      <div className="image-preview-container">
                        {variant.images.map((file, iIndex) => (
                          <div key={iIndex} className="image-preview">
                            <img src={URL.createObjectURL(file)} alt="preview" className="preview-thumb" />
                            <button type="button" className="remove-image-btn" onClick={() => handleRemoveImage(vIndex, iIndex)}>
                              <FiTrash2 />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="product-actions full-width">
            <button type="submit" className="product-btn" disabled={loading}>
              {loading ? <span className="product-btn__spinner"></span> : <><FiSave style={{marginRight: '8px'}} /> Create Product</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
