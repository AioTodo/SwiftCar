import React, { useEffect, useState } from 'react';
import Card from '../../../components/common/Card';
import AdminSidebar from '../../../components/layout/AdminSidebar';
import { storage } from '../../../services/storageService';

const CONTACT_KEY = 'contact_messages';

const AdminSupportPage = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const list = storage.get(CONTACT_KEY, []);
    setMessages(Array.isArray(list) ? list : []);
  }, []);

  return (
    <section className="page page--admin-support">
      <div className="page__container admin-support">
        <header className="page-header">
          <h1 className="page__title">Support Inbox</h1>
          <p className="page__description">
            View contact messages submitted via the public contact form.
          </p>
        </header>

        <div className="admin-dashboard__layout">
          <AdminSidebar />

          <main className="admin-support__main">
            <Card className="admin-panel">
              <Card.Header>
                <h2>Contact messages</h2>
              </Card.Header>
              <Card.Body>
                {messages.length === 0 ? (
                  <p className="text-muted">No messages have been received yet.</p>
                ) : (
                  <div className="table-wrapper">
                    <table className="table table--admin-support">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Message</th>
                          <th>Received</th>
                        </tr>
                      </thead>
                      <tbody>
                        {messages.map((msg) => (
                          <tr key={msg.id}>
                            <td className="text-small">{msg.name}</td>
                            <td className="text-small">{msg.email}</td>
                            <td className="text-small">
                              <div className="text-ellipsis">{msg.message}</div>
                            </td>
                            <td className="text-small">{msg.createdAt}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </Card.Body>
            </Card>
          </main>
        </div>
      </div>
    </section>
  );
};

export default AdminSupportPage;
