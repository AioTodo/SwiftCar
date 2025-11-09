import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../../../context/NotificationContext';
import Button from '../../../components/common/Button';
import Card from '../../../components/common/Card';
import Input from '../../../components/common/Input';

const AddCarPage = () => {
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    category: 'economy',
    licensePlate: '',
    pricePerDay: '',
    location: '',
    description: '',
    features: {
      gps: false,
      automatic: false,
      ac: false,
      bluetooth: false,
      fourWD: false,
      sunroof: false,
    },
    photos: [],
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        features: { ...prev.features, [name]: checked },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({ ...prev, photos: files }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.brand.trim()) newErrors.brand = 'Brand is required';
    if (!formData.model.trim()) newErrors.model = 'Model is required';
    if (!formData.year || formData.year < 1990 || formData.year > new Date().getFullYear() + 1) {
      newErrors.year = 'Valid year is required';
    }
    if (!formData.licensePlate.trim()) newErrors.licensePlate = 'License plate is required';
    if (!formData.pricePerDay || formData.pricePerDay <= 0) {
      newErrors.pricePerDay = 'Valid price is required';
    }
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    // Simulate API call
    showNotification({
      type: 'success',
      message: 'Car added successfully!',
    });
    
    setTimeout(() => {
      navigate('/agency/manage-cars');
    }, 1000);
  };

  const selectedFeatures = Object.keys(formData.features).filter(
    (key) => formData.features[key]
  );

  return (
    <div className="add-car-page">
      <div className="container container--narrow">
        <div className="add-car__header">
          <h1>Add New Vehicle</h1>
          <Button variant="outline" onClick={() => navigate('/agency/dashboard')}>
            Cancel
          </Button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Basic Information */}
          <Card>
            <Card.Header>
              <h2>Basic Information</h2>
            </Card.Header>
            <Card.Body>
              <div className="car-form">
                <div className="car-form__row">
                  <Input
                    label="Brand"
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    placeholder="Toyota, Dacia, etc."
                    error={errors.brand}
                    required
                  />
                  
                  <Input
                    label="Model"
                    type="text"
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                    placeholder="Corolla, Duster, etc."
                    error={errors.model}
                    required
                  />
                </div>

                <div className="car-form__row">
                  <Input
                    label="Year"
                    type="number"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    min="1990"
                    max={new Date().getFullYear() + 1}
                    error={errors.year}
                    required
                  />
                  
                  <div className="input">
                    <label htmlFor="category" className="input__label">
                      Category <span className="input__required">*</span>
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="input__field"
                      required
                    >
                      <option value="economy">Economy</option>
                      <option value="compact">Compact</option>
                      <option value="suv">SUV</option>
                      <option value="luxury">Luxury</option>
                      <option value="van">Van</option>
                    </select>
                  </div>
                </div>

                <div className="car-form__row">
                  <Input
                    label="License Plate"
                    type="text"
                    name="licensePlate"
                    value={formData.licensePlate}
                    onChange={handleChange}
                    placeholder="A-12345"
                    error={errors.licensePlate}
                    required
                  />
                  
                  <Input
                    label="Price Per Day (MAD)"
                    type="number"
                    name="pricePerDay"
                    value={formData.pricePerDay}
                    onChange={handleChange}
                    min="0"
                    placeholder="250"
                    error={errors.pricePerDay}
                    required
                  />
                </div>

                <Input
                  label="Location"
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Agadir, Marrakech, etc."
                  error={errors.location}
                  required
                />

                <div className="input">
                  <label htmlFor="description" className="input__label">
                    Description <span className="input__required">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe the vehicle..."
                    className="input__field"
                    rows="4"
                    required
                  />
                  {errors.description && (
                    <span className="input__error">{errors.description}</span>
                  )}
                </div>
              </div>
            </Card.Body>
          </Card>

          {/* Features */}
          <Card>
            <Card.Header>
              <h2>Features & Amenities</h2>
            </Card.Header>
            <Card.Body>
              <div className="features-grid">
                <label className="feature-checkbox">
                  <input
                    type="checkbox"
                    name="gps"
                    checked={formData.features.gps}
                    onChange={handleChange}
                  />
                  <span>GPS Navigation</span>
                </label>

                <label className="feature-checkbox">
                  <input
                    type="checkbox"
                    name="automatic"
                    checked={formData.features.automatic}
                    onChange={handleChange}
                  />
                  <span>Automatic Transmission</span>
                </label>

                <label className="feature-checkbox">
                  <input
                    type="checkbox"
                    name="ac"
                    checked={formData.features.ac}
                    onChange={handleChange}
                  />
                  <span>Air Conditioning</span>
                </label>

                <label className="feature-checkbox">
                  <input
                    type="checkbox"
                    name="bluetooth"
                    checked={formData.features.bluetooth}
                    onChange={handleChange}
                  />
                  <span>Bluetooth</span>
                </label>

                <label className="feature-checkbox">
                  <input
                    type="checkbox"
                    name="fourWD"
                    checked={formData.features.fourWD}
                    onChange={handleChange}
                  />
                  <span>4WD</span>
                </label>

                <label className="feature-checkbox">
                  <input
                    type="checkbox"
                    name="sunroof"
                    checked={formData.features.sunroof}
                    onChange={handleChange}
                  />
                  <span>Sunroof</span>
                </label>
              </div>

              {selectedFeatures.length > 0 && (
                <div className="selected-features">
                  <p className="text-small text-muted">
                    Selected: {selectedFeatures.length} feature{selectedFeatures.length > 1 ? 's' : ''}
                  </p>
                </div>
              )}
            </Card.Body>
          </Card>

          {/* Photos */}
          <Card>
            <Card.Header>
              <h2>Photos</h2>
            </Card.Header>
            <Card.Body>
              <div className="file-upload">
                <label className="file-upload__label">
                  Upload Car Photos
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    multiple
                    className="file-upload__input"
                  />
                  <div className="file-upload__display">
                    {formData.photos.length > 0
                      ? `${formData.photos.length} file${formData.photos.length > 1 ? 's' : ''} selected`
                      : 'Choose files or drag here'}
                  </div>
                </label>
              </div>
              <p className="text-small text-muted">
                📸 Accepted formats: JPG, PNG (max 5MB each). Upload multiple photos for better visibility.
              </p>
            </Card.Body>
          </Card>

          {/* Actions */}
          <div className="car-form__actions">
            <Button type="button" variant="outline" onClick={() => navigate('/agency/dashboard')}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="large">
              Add Vehicle
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCarPage;
