import React, { useState } from 'react';
import Card from '../../../components/common/Card';
import Input from '../../../components/common/Input';
import Button from '../../../components/common/Button';
import { validators } from '../../../utils/validators';
import { storage } from '../../../services/storageService';
import { useNotification } from '../../../context/NotificationContext';

const CONTACT_KEY = 'contact_messages';

const ContactPage = () => {
  const { showNotification } = useNotification();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const err = {};
    if (!validators.required(form.name)) err.name = 'Name is required';
    if (!validators.email(form.email)) err.email = 'Please enter a valid email';
    if (!validators.minLength(form.message, 10)) err.message = 'Message must be at least 10 characters';
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const list = storage.get(CONTACT_KEY, []);
    const entry = { id: `msg-${Date.now()}`, ...form };
    storage.set(CONTACT_KEY, [entry, ...list]);
    showNotification({ type: 'success', message: 'Thanks! We will get back to you soon.' });
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="contact-page">
      <div className="container">
        <Card>
          <Card.Header>
            <h1>Contact Us</h1>
          </Card.Header>
          <Card.Body>
            <form onSubmit={onSubmit} className="form">
              <Input label="Name" name="name" value={form.name} onChange={onChange} error={errors.name} required fullWidth />
              <Input label="Email" name="email" type="email" value={form.email} onChange={onChange} error={errors.email} required fullWidth />
              <div className="form__group">
                <label className="form__label" htmlFor="message">Message</label>
                <textarea id="message" className="input__field" rows="6" name="message" value={form.message} onChange={onChange} />
                {errors.message && <span className="input__error">{errors.message}</span>}
              </div>
              <div className="form__actions">
                <Button type="submit" variant="primary">Send Message</Button>
              </div>
            </form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default ContactPage;
