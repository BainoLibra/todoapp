import React from 'react';
import './StatCard.css';

const StatCard = ({ title, value, icon, color = 'primary' }) => {
  return (
    <div className={`stat-card stat-card--${color}`}>
      <div className="stat-card__header">
        <h3 className="stat-card__title">{title}</h3>
        {icon && <div className="stat-card__icon">{icon}</div>}
      </div>
      <p className="stat-card__value">{value}</p>
    </div>
  );
};

export default StatCard;