import React, { useEffect, useState } from 'react';
import Card from '../../../components/common/Card';
import Button from '../../../components/common/Button';
import Input from '../../../components/common/Input';
import { settingsService } from '../../../services/settingsService';
import AdminSidebar from '../../../components/layout/AdminSidebar';

const AdminSettingsPage = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const cfg = settingsService.getSettings();
    setSettings(cfg);
    setLoading(false);
  }, []);

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setSettings((prev) => {
      if (!prev) return prev;
      let nextValue = value;
      if (name === 'commissionRate') {
        // commissionRate is stored as decimal (0.06), input is percentage
        const num = Number(value);
        nextValue = Number.isNaN(num) ? prev.commissionRate : num / 100;
      } else if (type === 'checkbox') {
        nextValue = checked;
      }
      return { ...prev, [name]: nextValue };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!settings) return;
    setSaving(true);
    setError('');
    try {
      settingsService.updateSettings(settings);
    } catch (err) {
      setError(err?.message || 'Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !settings) {
    return (
      <section className="page page--admin-settings">
        <div className="page__container">
          <p className="text-muted">Loading settings...</p>
        </div>
      </section>
    );
  }

  const commissionPercent = Math.round((settings.commissionRate || 0) * 1000) / 10; // 6.0

  return (
    <section className="page page--admin-settings">
      <div className="page__container admin-settings">
        <header className="page-header">
          <h1 className="page__title">Platform Settings</h1>
          <p className="page__description">
            Configure global platform behavior such as commission rate, maintenance mode, and policy links.
          </p>
        </header>

        <div className="admin-dashboard__layout">
          <AdminSidebar />

          <form onSubmit={handleSubmit} className="admin-settings__form">
          <Card className="admin-panel">
            <Card.Header>
              <h2>Financial Settings</h2>
            </Card.Header>
            <Card.Body>
              <div className="settings-grid">
                <div>
                  <Input
                    label="Default commission rate (%)"
                    type="number"
                    name="commissionRate"
                    value={commissionPercent}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    step="0.1"
                    fullWidth
                  />
                  <p className="text-small text-muted">
                    This rate is applied as a platform commission on bookings when no per-agency override exists.
                  </p>
                </div>
              </div>
            </Card.Body>
          </Card>

          <Card className="admin-panel">
            <Card.Header>
              <h2>Maintenance Mode</h2>
            </Card.Header>
            <Card.Body>
              <div className="settings-grid">
                <div className="settings-toggle">
                  <label className="settings-toggle__label">
                    <input
                      type="checkbox"
                      name="maintenanceMode"
                      checked={settings.maintenanceMode}
                      onChange={handleChange}
                    />
                    <span>Enable maintenance mode</span>
                  </label>
                  <p className="text-small text-muted">
                    When enabled, the platform can show a maintenance banner and restrict certain flows.
                  </p>
                </div>
                <div>
                  <label className="filter-label" htmlFor="maintenanceMessage">
                    Maintenance message
                  </label>
                  <textarea
                    id="maintenanceMessage"
                    name="maintenanceMessage"
                    className="settings-textarea"
                    value={settings.maintenanceMessage}
                    onChange={handleChange}
                    rows={3}
                  />
                </div>
              </div>
            </Card.Body>
          </Card>

          <Card className="admin-panel">
            <Card.Header>
              <h2>Policy Links</h2>
            </Card.Header>
            <Card.Body>
              <div className="settings-grid">
                <Input
                  label="Terms & Conditions URL"
                  type="url"
                  name="termsUrl"
                  value={settings.termsUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/terms"
                  fullWidth
                />
                <Input
                  label="Privacy Policy URL"
                  type="url"
                  name="privacyUrl"
                  value={settings.privacyUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/privacy"
                  fullWidth
                />
              </div>
            </Card.Body>
          </Card>

          {error && (
            <div className="alert alert--error mt-2">{error}</div>
          )}

          <div className="admin-settings__actions">
            <Button type="submit" variant="primary" size="large" disabled={saving}>
              {saving ? 'Saving...' : 'Save Settings'}
            </Button>
          </div>
        </form>
        </div>
      </div>
    </section>
  );
};

export default AdminSettingsPage;
