import React, { useState } from 'react';
import { X, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import './CarComparison.css';

function CarComparison() {
  const [cars, setCars] = useState([
    {
      id: 1,
      make: 'BMW',
      model: 'X5',
      year: '2023',
      price: '$78,900',
      mileage: '15,000',
      fuelType: 'Petrol',
      transmission: 'Automatic',
      engine: '3.0L V6',
      features: ['4WD', 'Leather Seats', 'Sunroof', 'Navigation'],
      image: 'https://example.com/bmw-x5.jpg'
    },
    {
      id: 2,
      make: 'Tesla',
      model: 'Model 3',
      year: '2023',
      price: '$42,500',
      mileage: '10,000',
      fuelType: 'Electric',
      transmission: 'Automatic',
      engine: 'Electric Motor',
      features: ['Autopilot', 'Premium Sound', 'Glass Roof', 'Wireless Charging'],
      image: 'https://example.com/tesla-model3.jpg'
    }
  ]);

  const [selectedCars, setSelectedCars] = useState([1, 2]);
  const [showAddCar, setShowAddCar] = useState(false);

  const removeCar = (carId) => {
    setSelectedCars(selectedCars.filter(id => id !== carId));
  };

  const addCar = (carId) => {
    if (!selectedCars.includes(carId)) {
      setSelectedCars([...selectedCars, carId]);
    }
    setShowAddCar(false);
  };

  return (
    <div className="comparison-container">
      <div className="comparison-header">
        <h1>Car Comparison</h1>
        <button 
          className="add-car-button"
          onClick={() => setShowAddCar(true)}
        >
          <Plus size={20} />
          Add Car
        </button>
      </div>

      <div className="comparison-grid">
        {selectedCars.map((carId, index) => {
          const car = cars.find(c => c.id === carId);
          return (
            <div key={carId} className="car-card">
              <div className="car-card-header">
                <h2>{car.make} {car.model}</h2>
                <button 
                  className="remove-car-button"
                  onClick={() => removeCar(carId)}
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="car-image">
                <img src={car.image} alt={`${car.make} ${car.model}`} />
              </div>

              <div className="car-specs">
                <div className="spec-row">
                  <span className="spec-label">Year:</span>
                  <span className="spec-value">{car.year}</span>
                </div>
                <div className="spec-row">
                  <span className="spec-label">Price:</span>
                  <span className="spec-value">{car.price}</span>
                </div>
                <div className="spec-row">
                  <span className="spec-label">Mileage:</span>
                  <span className="spec-value">{car.mileage}</span>
                </div>
                <div className="spec-row">
                  <span className="spec-label">Fuel Type:</span>
                  <span className="spec-value">{car.fuelType}</span>
                </div>
                <div className="spec-row">
                  <span className="spec-label">Transmission:</span>
                  <span className="spec-value">{car.transmission}</span>
                </div>
                <div className="spec-row">
                  <span className="spec-label">Engine:</span>
                  <span className="spec-value">{car.engine}</span>
                </div>
              </div>

              <div className="car-features">
                <h3>Key Features</h3>
                <ul>
                  {car.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      {showAddCar && (
        <div className="add-car-modal">
          <div className="modal-content">
            <h2>Add Car to Comparison</h2>
            <div className="available-cars">
              {cars
                .filter(car => !selectedCars.includes(car.id))
                .map(car => (
                  <div 
                    key={car.id} 
                    className="available-car"
                    onClick={() => addCar(car.id)}
                  >
                    <img src={car.image} alt={`${car.make} ${car.model}`} />
                    <div className="car-info">
                      <h3>{car.make} {car.model}</h3>
                      <p>{car.year} • {car.price}</p>
                    </div>
                  </div>
                ))}
            </div>
            <button 
              className="close-modal"
              onClick={() => setShowAddCar(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CarComparison; 