import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../../../context/NotificationContext';
import Button from '../../../components/common/Button';
import Card from '../../../components/common/Card';
import Input from '../../../components/common/Input';

const RegisterAgencyPage = () => {
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Business Information
    agencyName: '',
    businessLicense: '',
    email: '',
    phone: '',
    website: '',
    
    // Step 2: Address
    address: '',
    city: '',
    country: 'Morocco',
    postalCode: '',
    
    // Step 3: Owner Information
    ownerFirstName: '',
    ownerLastName: '',
    ownerEmail: '',
    ownerPhone: '',
    ownerIdNumber: '',
    
    // Step 4: Documents
    licenseDocument: null,
    insuranceDocument: null,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (type === 'file') {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.agencyName.trim()) newErrors.agencyName = 'Agency name is required';
      if (!formData.businessLicense.trim()) newErrors.businessLicense = 'Business license is required';
      if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Valid email is required';
      }
      if (!formData.phone) newErrors.phone = 'Phone number is required';
    }
    
    if (step === 2) {
      if (!formData.address.trim()) newErrors.address = 'Address is required';
      if (!formData.city.trim()) newErrors.city = 'City is required';
    }
    
    if (step === 3) {
      if (!formData.ownerFirstName.trim()) newErrors.ownerFirstName = 'First name is required';
      if (!formData.ownerLastName.trim()) newErrors.ownerLastName = 'Last name is required';
      if (!formData.ownerEmail || !/\S+@\S+\.\S+/.test(formData.ownerEmail)) {
        newErrors.ownerEmail = 'Valid email is required';
      }
      if (!formData.ownerPhone) newErrors.ownerPhone = 'Phone number is required';
      if (!formData.ownerIdNumber) newErrors.ownerIdNumber = 'ID number is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simulate API call
    showNotification({
      type: 'success',
      message: 'Agency registration submitted! We will review your application.',
    });
    
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  return (
    <div className="register-agency-page">
      <div className="container container--narrow">
        <div className="register-agency__header">
          <h1>Register Your Agency</h1>
          <p className="text-muted">Join SwiftCar and reach more customers</p>
        </div>

        {/* Progress Steps */}
        <div className="registration-steps">
          <div className={`registration-step ${currentStep >= 1 ? 'registration-step--active' : ''} ${currentStep > 1 ? 'registration-step--completed' : ''}`}>
            <div className="registration-step__number">{currentStep > 1 ? '✓' : '1'}</div>
            <div className="registration-step__label">Business Info</div>
          </div>
          <div className="registration-step__line"></div>
          <div className={`registration-step ${currentStep >= 2 ? 'registration-step--active' : ''} ${currentStep > 2 ? 'registration-step--completed' : ''}`}>
            <div className="registration-step__number">{currentStep > 2 ? '✓' : '2'}</div>
            <div className="registration-step__label">Address</div>
          </div>
          <div className="registration-step__line"></div>
          <div className={`registration-step ${currentStep >= 3 ? 'registration-step--active' : ''} ${currentStep > 3 ? 'registration-step--completed' : ''}`}>
            <div className="registration-step__number">{currentStep > 3 ? '✓' : '3'}</div>
            <div className="registration-step__label">Owner Info</div>
          </div>
          <div className="registration-step__line"></div>
          <div className={`registration-step ${currentStep >= 4 ? 'registration-step--active' : ''}`}>
            <div className="registration-step__number">4</div>
            <div className="registration-step__label">Documents</div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Step 1: Business Information */}
          {currentStep === 1 && (
            <Card>
              <Card.Header>
                <h2>Business Information</h2>
              </Card.Header>
              <Card.Body>
                <div className="registration-form">
                  <Input
                    label="Agency Name"
                    type="text"
                    name="agencyName"
                    value={formData.agencyName}
                    onChange={handleChange}
                    placeholder="Your Agency Name"
                    error={errors.agencyName}
                    required
                  />
                  
                  <Input
                    label="Business License Number"
                    type="text"
                    name="businessLicense"
                    value={formData.businessLicense}
                    onChange={handleChange}
                    placeholder="BL-2024-XXX"
                    error={errors.businessLicense}
                    required
                  />
                  
                  <Input
                    label="Business Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="contact@youragency.com"
                    error={errors.email}
                    required
                  />
                  
                  <div className="registration-form__row">
                    <Input
                      label="Phone Number"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+212 XXX XXXXXX"
                      error={errors.phone}
                      required
                    />
                    
                    <Input
                      label="Website (Optional)"
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      placeholder="https://youragency.com"
                    />
                  </div>
                </div>
              </Card.Body>
            </Card>
          )}

          {/* Step 2: Address */}
          {currentStep === 2 && (
            <Card>
              <Card.Header>
                <h2>Business Address</h2>
              </Card.Header>
              <Card.Body>
                <div className="registration-form">
                  <Input
                    label="Street Address"
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="123 Main Street"
                    error={errors.address}
                    required
                  />
                  
                  <div className="registration-form__row">
                    <Input
                      label="City"
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Agadir"
                      error={errors.city}
                      required
                    />
                    
                    <Input
                      label="Postal Code"
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      placeholder="80000"
                    />
                  </div>
                  
                  <Input
                    label="Country"
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    disabled
                  />
                </div>
              </Card.Body>
            </Card>
          )}

          {/* Step 3: Owner Information */}
          {currentStep === 3 && (
            <Card>
              <Card.Header>
                <h2>Owner Information</h2>
              </Card.Header>
              <Card.Body>
                <div className="registration-form">
                  <div className="registration-form__row">
                    <Input
                      label="First Name"
                      type="text"
                      name="ownerFirstName"
                      value={formData.ownerFirstName}
                      onChange={handleChange}
                      error={errors.ownerFirstName}
                      required
                    />
                    
                    <Input
                      label="Last Name"
                      type="text"
                      name="ownerLastName"
                      value={formData.ownerLastName}
                      onChange={handleChange}
                      error={errors.ownerLastName}
                      required
                    />
                  </div>
                  
                  <Input
                    label="Email"
                    type="email"
                    name="ownerEmail"
                    value={formData.ownerEmail}
                    onChange={handleChange}
                    error={errors.ownerEmail}
                    required
                  />
                  
                  <div className="registration-form__row">
                    <Input
                      label="Phone Number"
                      type="tel"
                      name="ownerPhone"
                      value={formData.ownerPhone}
                      onChange={handleChange}
                      error={errors.ownerPhone}
                      required
                    />
                    
                    <Input
                      label="ID Number"
                      type="text"
                      name="ownerIdNumber"
                      value={formData.ownerIdNumber}
                      onChange={handleChange}
                      placeholder="CIN or Passport"
                      error={errors.ownerIdNumber}
                      required
                    />
                  </div>
                </div>
              </Card.Body>
            </Card>
          )}

          {/* Step 4: Documents */}
          {currentStep === 4 && (
            <Card>
              <Card.Header>
                <h2>Required Documents</h2>
              </Card.Header>
              <Card.Body>
                <div className="registration-form">
                  <div className="file-upload">
                    <label className="file-upload__label">
                      Business License Document *
                      <input
                        type="file"
                        name="licenseDocument"
                        onChange={handleChange}
                        accept=".pdf,.jpg,.jpeg,.png"
                        className="file-upload__input"
                        required
                      />
                      <div className="file-upload__display">
                        {formData.licenseDocument 
                          ? formData.licenseDocument.name 
                          : 'Choose file or drag here'}
                      </div>
                    </label>
                  </div>
                  
                  <div className="file-upload">
                    <label className="file-upload__label">
                      Insurance Document *
                      <input
                        type="file"
                        name="insuranceDocument"
                        onChange={handleChange}
                        accept=".pdf,.jpg,.jpeg,.png"
                        className="file-upload__input"
                        required
                      />
                      <div className="file-upload__display">
                        {formData.insuranceDocument 
                          ? formData.insuranceDocument.name 
                          : 'Choose file or drag here'}
                      </div>
                    </label>
                  </div>

                  <div className="document-info">
                    <p className="text-small text-muted">
                      📄 Accepted formats: PDF, JPG, PNG (max 10MB)
                    </p>
                    <p className="text-small text-muted">
                      ⏱️ Documents will be reviewed within 2-3 business days
                    </p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          )}

          {/* Navigation Buttons */}
          <div className="registration-actions">
            {currentStep > 1 && (
              <Button type="button" variant="outline" onClick={handleBack}>
                Back
              </Button>
            )}
            <div className="registration-actions__right">
              {currentStep < 4 ? (
                <Button type="button" variant="primary" onClick={handleNext}>
                  Next
                </Button>
              ) : (
                <Button type="submit" variant="primary">
                  Submit Application
                </Button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterAgencyPage;
