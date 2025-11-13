import React, { useState } from 'react';
import Input from '../../common/Input';
import Button from '../../common/Button';

const initial = {
  title: '',
  brand: '',
  model: '',
  pricePerDay: '',
  location: '',
  features: '', // comma-separated
  images: '',   // comma-separated URLs
  available: true,
};

const CarForm = ({ defaultValues, onSubmit, onCancel }) => {
  const normalizedDefaults = defaultValues
    ? {
        ...defaultValues,
        features: Array.isArray(defaultValues.features)
          ? defaultValues.features.join(', ')
          : defaultValues.features || '',
        images: Array.isArray(defaultValues.images)
          ? defaultValues.images.join(', ')
          : defaultValues.images || '',
      }
    : undefined;
  const [form, setForm] = useState({ ...initial, ...(normalizedDefaults || {}) });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const validate = () => {
    const err = {};
    if (!String(form.title).trim()) err.title = 'Title is required';
    if (!String(form.brand).trim()) err.brand = 'Brand is required';
    if (!String(form.model).trim()) err.model = 'Model is required';
    if (form.pricePerDay === '' || isNaN(Number(form.pricePerDay))) err.pricePerDay = 'Price per day is required';
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const payload = {
      title: String(form.title).trim(),
      brand: String(form.brand).trim(),
      model: String(form.model).trim(),
      pricePerDay: Number(form.pricePerDay),
      location: String(form.location || ''),
      features: String(form.features || '')
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      images: String(form.images || '')
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      available: Boolean(form.available),
    };
    onSubmit && onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="car-form">
      <div className="grid grid--2">
        <Input label="Title" name="title" value={form.title} onChange={handleChange} error={errors.title} required />
        <Input label="Brand" name="brand" value={form.brand} onChange={handleChange} error={errors.brand} required />
        <Input label="Model" name="model" value={form.model} onChange={handleChange} error={errors.model} required />
        <Input label="Price per day" type="number" name="pricePerDay" value={form.pricePerDay} onChange={handleChange} error={errors.pricePerDay} required />
        <Input label="Location" name="location" value={form.location} onChange={handleChange} />
        <Input label="Features (comma-separated)" name="features" value={form.features} onChange={handleChange} />
        <Input label="Image URLs (comma-separated)" name="images" value={form.images} onChange={handleChange} />
        <label className="input">
          <input type="checkbox" name="available" checked={form.available} onChange={handleChange} />
          <span>Available</span>
        </label>
      </div>
      <div className="form__actions">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" variant="primary">
          Save
        </Button>
      </div>
    </form>
  );
};

export default CarForm;
