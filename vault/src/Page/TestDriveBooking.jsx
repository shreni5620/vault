import React, { useState } from 'react';
import { X, User, Mail, Phone, MapPin, Calendar, Clock, Car } from 'lucide-react';
import "../assets/TestDriveBooking.css";

const TestDriveBooking = ({ car, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
    location: '',
    additionalMessage: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Test Drive Form:', formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="test-drive-modal">
        <div className="success-message">
          <div className="success-icon">✓</div>
          <h2>Test Drive Scheduled!</h2>
          <p>Your test drive for the {car.name} has been scheduled.</p>
          <p>We will confirm your appointment for {formData.preferredDate} at {formData.preferredTime}.</p>
          <button className="close-button" onClick={onClose}>Close</button>
        </div>
      </div>
    );
  }

  return (
    <div className="test-drive-modal">
      <div className="test-drive-content">
        <button className="modal-close" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="car-preview">
          <img src={car.image} alt={car.name} />
          <div className="car-info">
            <h3>{car.name}</h3>
            <p className="price">${car.price.toLocaleString()}</p>
            <div className="car-specs">
              <span><Car size={16} /> {car.year}</span>
              <span><MapPin size={16} /> {car.location}</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="test-drive-form">
          <h2>Schedule Test Drive</h2>
          
          <div className="form-group">
            <label>
              <User size={16} />
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="form-group">
            <label>
              <Mail size={16} />
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>
              <Phone size={16} />
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>
                <Calendar size={16} />
                Preferred Date
              </label>
              <input
                type="date"
                name="preferredDate"
                value={formData.preferredDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>
                <Clock size={16} />
                Preferred Time
              </label>
              <select
                name="preferredTime"
                value={formData.preferredTime}
                onChange={handleChange}
                required
              >
                <option value="">Select time</option>
                <option value="09:00">9:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="12:00">12:00 PM</option>
                <option value="13:00">1:00 PM</option>
                <option value="14:00">2:00 PM</option>
                <option value="15:00">3:00 PM</option>
                <option value="16:00">4:00 PM</option>
                <option value="17:00">5:00 PM</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>
              <MapPin size={16} />
              Preferred Location
            </label>
            <select
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            >
              <option value="">Select dealership location</option>
              <option value="downtown">Downtown Dealership</option>
              <option value="north">North Branch</option>
              <option value="south">South Branch</option>
              <option value="east">East Branch</option>
              <option value="west">West Branch</option>
            </select>
          </div>

          <div className="form-group">
            <label>Additional Message (Optional)</label>
            <textarea
              name="additionalMessage"
              value={formData.additionalMessage}
              onChange={handleChange}
              placeholder="Any specific questions or requests?"
              rows="4"
            />
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Schedule Test Drive
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TestDriveBooking;