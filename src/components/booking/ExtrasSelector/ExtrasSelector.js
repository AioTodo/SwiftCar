import React from 'react';

const ExtrasSelector = ({ extras, onToggle }) => {
  const rows = [
    { key: 'insurance', title: 'Full Insurance Coverage', price: 15, desc: 'Complete protection with zero excess' },
    { key: 'gps', title: 'GPS Navigation', price: 5, desc: 'Latest maps and real-time traffic' },
    { key: 'childSeat', title: 'Child Seat', price: 7, desc: 'Safety-certified child seat' },
    { key: 'additionalDriver', title: 'Additional Driver', price: 10, desc: 'Add another licensed driver' },
  ];

  return (
    <div className="extras-selector">
      {rows.map((r) => (
        <label key={r.key} className="extra-item__label">
          <input
            type="checkbox"
            name={r.key}
            checked={Boolean(extras?.[r.key])}
            onChange={(e) => onToggle(r.key, e.target.checked)}
            className="extra-item__checkbox"
          />
          <div className="extra-item__content">
            <h4 className="extra-item__title">{r.title}</h4>
            <p className="extra-item__desc">{r.desc}</p>
          </div>
          <div className="extra-item__price">+{r.price} per day</div>
        </label>
      ))}
    </div>
  );
};

export default ExtrasSelector;
