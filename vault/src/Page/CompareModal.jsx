import React, { useEffect, useState } from 'react';
import { X, Car, Fuel, Settings, Calendar, IndianRupee } from 'lucide-react';

const CompareModal = ({ cars, onClose }) => {
  const [suggestions, setSuggestions] = useState([]);
  const specs = [
    { label: 'Price', key: 'price', icon: IndianRupee },
    { label: 'Type', key: 'type', icon: Car },
    { label: 'Fuel', key: 'fuel', icon: Fuel },
    { label: 'Mileage', key: 'mileage', icon: Calendar },
    { label: 'Engine', key: 'engine', icon: Settings },
    { label: 'Transmission', key: 'transmission', icon: Settings },
  ];

  if (!cars || cars.length === 0) {
    return (
      <div className="modal-overlay">
        <div className="compare-modal">
          <button className="close-button" onClick={onClose}>
            <X size={24} />
          </button>
          <h2>No cars selected for comparison</h2>
        </div>
      </div>
    );
  }

  const saveComparison = (comparedCars) => {
    fetch('http://localhost:3000/api/comparison', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        comparedCars // e.g. ["BMW X5", "Audi Q7", "Mercedes GLC"]
      })
    });
  };

  const getAccessorySuggestions = async (comparedCars) => {
    const res = await fetch('http://localhost:3000/api/accessory-suggestion/suggest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ comparedCars })
    });
    const data = await res.json();
    setSuggestions(data.suggestions || []);
  };

  // Save comparison when modal opens and there are at least 2 cars
  useEffect(() => {
    if (cars && cars.length >= 2) {
      const comparedCars = cars.map(car => car.name.replace(/^20\d{2} /, ''));
      console.log("Compared cars being sent:", comparedCars);
      saveComparison(comparedCars);
      getAccessorySuggestions(comparedCars);
    }
    // eslint-disable-next-line
  }, [cars]);

  return (
    <div className="modal-overlay">
      <div className="compare-modal">
        <button className="close-button" onClick={onClose}>
          <X size={24} />
        </button>

        <h2>Compare Vehicles</h2>

        <div className="compare-grid">
          {/* Header Row */}
          <div className="compare-row header">
            <div className="compare-cell label"></div>
            {cars.map((car, index) => (
              <div key={car?.id || index} className="compare-cell">
                <div className="car-image">
                  <img src={car?.image || '/placeholder.jpg'} alt={car?.name || 'Car'} />
                </div>
                <h3>{car?.name || 'Unknown'}</h3>
              </div>
            ))}
          </div>

          {/* Specs Rows */}
          {specs.map(spec => (
            <div key={spec.key} className="compare-row">
              <div className="compare-cell label">
                <spec.icon size={20} />
                <span>{spec.label}</span>
              </div>
              {cars.map((car, index) => (
                <div key={`${car?.id || index}-${spec.key}`} className="compare-cell">
                  {car[spec.key] ?? 'N/A'}
                </div>
              ))}
            </div>
          ))}
        </div>
        {suggestions.length > 0 && (
          <div className="accessory-suggestions" style={{ marginTop: '2rem' }}>
            <h3>Recommended Accessories</h3>
            <ul>
              {suggestions.map((name, idx) => (
                <li key={idx}>{name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompareModal;