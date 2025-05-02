import React, { useState } from 'react';
import { X, User, Mail, Phone, MessageSquare, MapPin, Car } from 'lucide-react';
import "../assets/ContactSeller.css";
import axios from 'axios';

const ContactSeller = ({ car, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    preferredContact: 'email'
  });

  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/user/contact-seller', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        preferredContact: formData.preferredContact
      });
      setStatus('Message sent successfully!');
      setSubmitted(true);
    } catch (err) {
      setStatus('Failed to send message.');
    }
  };

  if (submitted) {
    return (
      <div className="contact-seller-modal">
        <div className="success-message">
          <div className="success-icon">✓</div>
          <h2>Message Sent!</h2>
          <p>Your message has been sent to the seller of the {car.name}.</p>
          <p>They will contact you shortly through your preferred method: {formData.preferredContact}.</p>
          <button className="close-button" onClick={onClose}>Close</button>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-seller-modal">
      <div className="contact-seller-content">
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

        <form onSubmit={handleSubmit} className="contact-form">
          <h2>Contact Seller</h2>
          
          <div className="form-group">
            <label>
              <User size={16} />
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
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

          <div className="form-group">
            <label>
              <MessageSquare size={16} />
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message to the seller..."
              rows="4"
              required
            />
          </div>

          <div className="form-group">
            <label>Preferred Contact Method</label>
            <div className="contact-method-options">
              <label className="radio-option">
                <input
                  type="radio"
                  name="preferredContact"
                  value="email"
                  checked={formData.preferredContact === 'email'}
                  onChange={handleChange}
                />
                Email
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="preferredContact"
                  value="phone"
                  checked={formData.preferredContact === 'phone'}
                  onChange={handleChange}
                />
                Phone
              </label>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Send Message
            </button>
          </div>
        </form>
      </div>
      {status && <p>{status}</p>}
    </div>
  );
};

export default ContactSeller; 