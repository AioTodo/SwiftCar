import React from 'react';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Notification from './components/common/Notification';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <div className="app">
      <Header />
      <main className="app__main">
        <AppRoutes />
      </main>
      <Footer />
      <Notification />
    </div>
  );
}

export default App;
