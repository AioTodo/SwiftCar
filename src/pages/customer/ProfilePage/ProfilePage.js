import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useNotification } from '../../../context/NotificationContext';
import Button from '../../../components/common/Button';
import Card from '../../../components/common/Card';
import Input from '../../../components/common/Input';

const ProfilePage = () => {
  const { user } = useAuth();
  const { showNotification } = useNotification();
  
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || 'Demo',
    lastName: user?.lastName || 'User',
    email: user?.email || 'customer@example.com',
    phone: '+212 600 123456',
    dateOfBirth: '1990-01-01',
    address: '123 Main Street',
    city: 'Agadir',
    country: 'Morocco',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!profileData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!profileData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!profileData.email || !/\S+@\S+\.\S+/.test(profileData.email)) {
      newErrors.email = 'Valid email is required';
    }
    
    if (!profileData.phone || profileData.phone.length < 10) {
      newErrors.phone = 'Valid phone number is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    // Simulate API call
    setTimeout(() => {
      setIsEditing(false);
      showNotification({
        type: 'success',
        message: 'Profile updated successfully!',
      });
    }, 500);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setErrors({});
  };

  return (
    <div className="profile-page">
      <div className="container container--narrow">
        <div className="profile-page__header">
          <h1>My Profile</h1>
          {!isEditing && (
            <Button variant="primary" onClick={() => setIsEditing(true)}>
              Edit Profile
            </Button>
          )}
        </div>

        <Card>
          <Card.Header>
            <h2>Personal Information</h2>
          </Card.Header>
          
          <Card.Body>
            <form onSubmit={handleSubmit} className="profile-form">
              <div className="profile-form__row">
                <Input
                  label="First Name"
                  type="text"
                  name="firstName"
                  value={profileData.firstName}
                  onChange={handleChange}
                  disabled={!isEditing}
                  error={errors.firstName}
                  required
                />
                
                <Input
                  label="Last Name"
                  type="text"
                  name="lastName"
                  value={profileData.lastName}
                  onChange={handleChange}
                  disabled={!isEditing}
                  error={errors.lastName}
                  required
                />
              </div>

              <Input
                label="Email Address"
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleChange}
                disabled={!isEditing}
                error={errors.email}
                required
              />

              <div className="profile-form__row">
                <Input
                  label="Phone Number"
                  type="tel"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                  error={errors.phone}
                  required
                />
                
                <Input
                  label="Date of Birth"
                  type="date"
                  name="dateOfBirth"
                  value={profileData.dateOfBirth}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>

              <Input
                label="Address"
                type="text"
                name="address"
                value={profileData.address}
                onChange={handleChange}
                disabled={!isEditing}
              />

              <div className="profile-form__row">
                <Input
                  label="City"
                  type="text"
                  name="city"
                  value={profileData.city}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
                
                <Input
                  label="Country"
                  type="text"
                  name="country"
                  value={profileData.country}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>

              {isEditing && (
                <div className="profile-form__actions">
                  <Button type="button" variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary">
                    Save Changes
                  </Button>
                </div>
              )}
            </form>
          </Card.Body>
        </Card>

        {/* Account Settings */}
        <Card>
          <Card.Header>
            <h2>Account Settings</h2>
          </Card.Header>
          
          <Card.Body>
            <div className="account-settings">
              <div className="setting-item">
                <div className="setting-item__info">
                  <h4>Password</h4>
                  <p className="text-small text-muted">Last changed 30 days ago</p>
                </div>
                <Button variant="outline" size="small">
                  Change Password
                </Button>
              </div>

              <div className="setting-item">
                <div className="setting-item__info">
                  <h4>Email Notifications</h4>
                  <p className="text-small text-muted">Receive booking updates and promotions</p>
                </div>
                <label className="toggle-switch">
                  <input type="checkbox" defaultChecked />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div className="setting-item__info">
                  <h4>SMS Notifications</h4>
                  <p className="text-small text-muted">Receive SMS updates for bookings</p>
                </div>
                <label className="toggle-switch">
                  <input type="checkbox" defaultChecked />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          </Card.Body>
        </Card>

        {/* Danger Zone */}
        <Card className="danger-zone">
          <Card.Header>
            <h2>Danger Zone</h2>
          </Card.Header>
          
          <Card.Body>
            <div className="danger-zone__content">
              <div>
                <h4>Delete Account</h4>
                <p className="text-small text-muted">
                  Permanently delete your account and all associated data
                </p>
              </div>
              <Button variant="danger">
                Delete Account
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
