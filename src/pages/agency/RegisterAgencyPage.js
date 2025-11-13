import React, { useState } from 'react';

const RegisterAgencyPage = () => {
  const [name, setName] = useState('');
  const onSubmit = (e) => {
    e.preventDefault();
    alert(`Registered agency: ${name} (mock)`);
  };

  return (
    <div className="container">
      <h2 className="heading heading--h2">Register Agency</h2>
      <form onSubmit={onSubmit} className="form">
        <input className="input mb-1" placeholder="Agency Name" value={name} onChange={(e) => setName(e.target.value)} />
        <button className="button button--primary" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default RegisterAgencyPage;