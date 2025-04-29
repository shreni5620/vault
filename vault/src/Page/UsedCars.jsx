import React, { useState } from 'react';
import { Search, Filter, MapPin, Calendar, Car, Fuel, Settings, IndianRupee, ChevronDown, Heart, X, Star, Shield, Gauge, Radio, Box, Users, ThumbsUp, AlertTriangle } from 'lucide-react';
import Accessory from './Accessory';
import "../assets/UsedCars.css";
import TestDriveBooking from './TestDriveBooking';
import ContactSeller from './ContactSeller';
import { useWishlist } from './WishlistContext';

const UsedCars = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [showTestDrive, setShowTestDrive] = useState(false);
  const [showContactSeller, setShowContactSeller] = useState(false);
  const [showAccessories, setShowAccessories] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: { min: 0, max: 100000 },
    brand: 'all',
    year: 'all',
    fuel: 'all',
    transmission: 'all',
    bodyType: 'all',
    mileage: 'all',
    owners: 'all'
  });
  const { addToWishlist, removeFromWishlist, wishlistItems } = useWishlist();

  const usedCars = [
    {
      id: 1,
      name: "2021 BMW 3 Series",
      price: 32500,
      location: "New York, NY",
      mileage: "25,000",
      year: "2021",
      fuel: "Petrol",
      transmission: "Automatic",
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=2000",
      owner: "1st Owner",
      verified: true,
      description: "Well-maintained BMW 3 Series with full service history. Features include leather seats, sunroof, and advanced driver assistance systems.",
      features: [
        "Leather Seats",
        "Sunroof",
        "Navigation",
        "Bluetooth",
        "Parking Sensors",
        "360° Camera"
      ],
      specs: {
        engine: "2.0L 4-cylinder Turbo",
        power: "255 hp",
        torque: "295 lb-ft",
        acceleration: "5.6 seconds (0-60 mph)",
        topSpeed: "155 mph",
        fuelEconomy: "26 city / 36 highway"
      },
      rating: 4.8,
      reviews: 48,
      images: [
        "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=2000",
        "https://images.unsplash.com/photo-1616422285623-13ff0162193c?auto=format&fit=crop&q=80&w=2000",
        "https://images.unsplash.com/photo-1619682817481-e994891cd1f5?auto=format&fit=crop&q=80&w=2000"
      ]
    },
    {
      id: 2,
      name: "2022 Mercedes-Benz E-Class",
      price: 48900,
      location: "Los Angeles, CA",
      mileage: "18,500",
      year: "2022",
      fuel: "Hybrid",
      transmission: "Automatic",
      image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=2000",
      owner: "1st Owner",
      verified: true,
      description: "Luxurious E-Class with premium features and hybrid efficiency. Includes premium sound system and driver assistance package.",
      features: [
        "Premium Sound System",
        "Panoramic Roof",
        "Heated Seats",
        "Wireless Charging",
        "Lane Assist",
        "Blind Spot Monitor"
      ],
      specs: {
        engine: "2.0L 4-cylinder Hybrid",
        power: "295 hp",
        torque: "325 lb-ft",
        acceleration: "5.2 seconds (0-60 mph)",
        topSpeed: "155 mph",
        fuelEconomy: "28 city / 38 highway"
      },
      rating: 4.9,
      reviews: 32,
      images: [
        "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=2000",
        "https://images.unsplash.com/photo-1583356322882-85559b472f56?auto=format&fit=crop&q=80&w=2000",
        "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&q=80&w=2000"
      ]
    },
    {
      id: 3,
      name: "2021 Tesla Model 3",
      price: 39900,
      location: "Miami, FL",
      mileage: "22,000",
      year: "2021",
      fuel: "Electric",
      transmission: "Automatic",
      image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&q=80&w=2000",
      owner: "2nd Owner",
      verified: true,
      description: "Long-range Tesla Model 3 with Autopilot capability. Premium interior and recent software updates included.",
      features: [
        "Autopilot",
        "Glass Roof",
        "Premium Audio",
        "Premium Connectivity",
        "Supercharging",
        "Smart Summon"
      ],
      specs: {
        engine: "Dual Motor Electric",
        power: "346 hp",
        torque: "389 lb-ft",
        acceleration: "4.2 seconds (0-60 mph)",
        topSpeed: "145 mph",
        range: "358 miles"
      },
      rating: 4.7,
      reviews: 56,
      images: [
        "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&q=80&w=2000",
        "https://images.pexels.com/photos/23325521/pexels-photo-23325521/free-photo-of-white-tesla-model-3-on-street-in-city.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/9300914/pexels-photo-9300914.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      ]
    },
    {
      id: 4,
      name: "2020 Porsche 911 Carrera",
      price: 89500,
      location: "Chicago, IL",
      mileage: "15,800",
      year: "2020",
      fuel: "Petrol",
      transmission: "PDK",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=2000",
      owner: "1st Owner",
      verified: true,
      description: "Pristine Porsche 911 Carrera with Sport Chrono Package. Meticulously maintained with complete service history.",
      features: [
        "Sport Chrono Package",
        "PASM Sport Suspension",
        "Sports Exhaust",
        "Carbon Fiber Interior",
        "LED Matrix Headlights",
        "Burmester Sound"
      ],
      specs: {
        engine: "3.0L Twin-Turbo Flat-6",
        power: "379 hp",
        torque: "331 lb-ft",
        acceleration: "3.5 seconds (0-60 mph)",
        topSpeed: "182 mph",
        fuelEconomy: "18 city / 24 highway"
      },
      rating: 5.0,
      reviews: 28,
      images: [
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=2000",
        "https://images.unsplash.com/photo-1503428593586-e225b39bddfe?auto=format&fit=crop&q=80&w=2000",
        "https://images.unsplash.com/photo-1502161254066-6c74afbf07aa?auto=format&fit=crop&q=80&w=2000"
      ]
    },
    {
      id: 5,
      name: "2022 Audi Q7",
      price: 54900,
      location: "Seattle, WA",
      mileage: "28,500",
      year: "2022",
      fuel: "Petrol",
      transmission: "Automatic",
      image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&q=80&w=2000",
      owner: "1st Owner",
      verified: true,
      description: "Spacious and luxurious Audi Q7 with premium features. Perfect family SUV with advanced safety features.",
      features: [
        "Virtual Cockpit",
        "Bang & Olufsen Sound",
        "Adaptive Air Suspension",
        "Quattro AWD",
        "Panoramic Sunroof",
        "Head-up Display"
      ],
      specs: {
        engine: "3.0L V6 TFSI",
        power: "335 hp",
        torque: "369 lb-ft",
        acceleration: "5.7 seconds (0-60 mph)",
        topSpeed: "155 mph",
        fuelEconomy: "20 city / 25 highway"
      },
      rating: 4.8,
      reviews: 42,
      images: [
        "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&q=80&w=2000",
        "https://images.pexels.com/photos/30721556/pexels-photo-30721556/free-photo-of-sleek-black-audi-q7-showcased-in-outdoor-setting.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/31575929/pexels-photo-31575929/free-photo-of-red-audi-driving-on-turkish-highway.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      ]
    },
    {
      id: 6,
      name: "2021 Ford Mustang GT",
      price: 42900,
      location: "Dallas, TX",
      mileage: "12,500",
      year: "2021",
      fuel: "Petrol",
      transmission: "Manual",
      image: "https://images.pexels.com/photos/29615596/pexels-photo-29615596/free-photo-of-white-ford-mustang-in-urban-setting.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      owner: "1st Owner",
      verified: true,
      description: "Powerful Mustang GT with performance package. Features include active exhaust and premium sound system.",
      features: [
        "Performance Package",
        "Active Exhaust",
        "Recaro Seats",
        "MagneRide Suspension",
        "Brembo Brakes",
        "Track Apps"
      ],
      specs: {
        engine: "5.0L V8",
        power: "450 hp",
        torque: "410 lb-ft",
        acceleration: "4.3 seconds (0-60 mph)",
        topSpeed: "155 mph",
        fuelEconomy: "15 city / 24 highway"
      },
      rating: 4.7,
      reviews: 36,
      images: [
        "https://images.pexels.com/photos/29615596/pexels-photo-29615596/free-photo-of-white-ford-mustang-in-urban-setting.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/15166495/pexels-photo-15166495/free-photo-of-a-ford-mustang-gt-parked-on-the-side-of-a-street-with-palm-trees.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/29615585/pexels-photo-29615585/free-photo-of-dynamic-white-mustang-on-open-highway.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=20"
      ]
    },
    {
      id: 7,
      name: "2022 Toyota RAV4 Hybrid",
      price: 32900,
      location: "Denver, CO",
      mileage: "8,200",
      year: "2022",
      fuel: "Hybrid",
      transmission: "Automatic",
      image: "https://images.pexels.com/photos/9615358/pexels-photo-9615358.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      owner: "1st Owner",
      verified: true,
      description: "Efficient and practical RAV4 Hybrid with advanced safety features and excellent fuel economy.",
      features: [
        "Toyota Safety Sense",
        "AWD",
        "Power Liftgate",
        "Heated Seats",
        "Wireless Charging",
        "Blind Spot Monitor"
      ],
      specs: {
        engine: "2.5L 4-cylinder Hybrid",
        power: "219 hp",
        torque: "163 lb-ft",
        acceleration: "7.8 seconds (0-60 mph)",
        topSpeed: "112 mph",
        fuelEconomy: "41 city / 38 highway"
      },
      rating: 4.6,
      reviews: 52,
      images: [
        "https://images.pexels.com/photos/9615358/pexels-photo-9615358.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/9598106/pexels-photo-9598106.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/31507821/pexels-photo-31507821/free-photo-of-urban-traffic-scene-in-burnaby-canada.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      ]
    },
    {
      id: 8,
      name: "2021 Chevrolet Corvette Stingray",
      price: 68900,
      location: "Las Vegas, NV",
      mileage: "6,800",
      year: "2021",
      fuel: "Petrol",
      transmission: "Automatic",
      image:"https://hips.hearstapps.com/hmg-prod/images/2020-chevrolet-corvette-c8-101-1571146871.jpg?crop=1.00xw:0.446xh;0,0.368xh&resize=980:*",
      owner: "1st Owner",
      verified: true,
      description: "Mid-engine Corvette with Z51 performance package. Includes magnetic ride control and performance exhaust.",
      features: [
        "Z51 Performance Package",
        "Magnetic Ride Control",
        "Performance Exhaust",
        "Carbon Fiber Interior",
        "Heads-up Display",
        "Bose Premium Audio"
      ],
      specs: {
        engine: "6.2L V8",
        power: "495 hp",
        torque: "470 lb-ft",
        acceleration: "2.9 seconds (0-60 mph)",
        topSpeed: "194 mph",
        fuelEconomy: "15 city / 27 highway"
      },
      rating: 4.9,
      reviews: 41,
      images: [
        "https://hips.hearstapps.com/hmg-prod/images/2020-chevrolet-corvette-c8-101-1571146871.jpg?crop=1.00xw:0.446xh;0,0.368xh&resize=980:*",
        "https://hips.hearstapps.com/hmg-prod/images/2020-chevrolet-corvette-z51quickvette-1604696511.jpg?crop=1xw:0.9204545454545454xh;center,top&resize=281:*",
        "https://hips.hearstapps.com/hmg-prod/images/2020-chevrolet-corvette-c8-111-1571146877.jpg?crop=1xw:1xh;center,top&resize=980:*"
      ]
    },
    {
      id: 9,
      name: "2022 Honda Civic Type R",
      price: 39900,
      location: "Boston, MA",
      mileage: "4,500",
      year: "2022",
      fuel: "Petrol",
      transmission: "Manual",
      image: "https://images.unsplash.com/photo-1605756580041-21312e9fb2bc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      owner: "1st Owner",
      verified: true,
      description: "High-performance Civic Type R with track-ready features and aggressive styling.",
      features: [
        "Adaptive Suspension",
        "Brembo Brakes",
        "Limited Slip Differential",
        "Sport Seats",
        "Dual-Zone Climate",
        "Wireless Apple CarPlay"
      ],
      specs: {
        engine: "2.0L Turbo 4-cylinder",
        power: "306 hp",
        torque: "295 lb-ft",
        acceleration: "5.0 seconds (0-60 mph)",
        topSpeed: "169 mph",
        fuelEconomy: "22 city / 28 highway"
      },
      rating: 4.8,
      reviews: 29,
      images: [
        "https://images.unsplash.com/photo-1605756580041-21312e9fb2bc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.pexels.com/photos/16368805/pexels-photo-16368805/free-photo-of-revving-into-the-weekend-with-the-stunning-11th-gen-honda-civic-type-r-unleashing-its-power-on-this-iconic-uk-track-it-s-truly-a-sight-to-behold-as-it-conquers-every-curve-with-preci.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/28861479/pexels-photo-28861479/free-photo-of-red-toyota-supra-iconic-jdm-sports-car.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      ]
    },
    {
      id: 10,
      name: "2021 Jeep Wrangler Rubicon",
      price: 45900,
      location: "Phoenix, AZ",
      mileage: "15,200",
      year: "2021",
      fuel: "Petrol",
      transmission: "Automatic",
      image: "https://images.pexels.com/photos/13696704/pexels-photo-13696704.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      owner: "1st Owner",
      verified: true,
      description: "Off-road ready Wrangler Rubicon with premium features and trail-rated capability.",
      features: [
        "Rock-Trac 4x4 System",
        "Electronic Sway Bar Disconnect",
        "Locking Differentials",
        "LED Lighting Group",
        "Premium Audio",
        "Cold Weather Group"
      ],
      specs: {
        engine: "3.6L V6",
        power: "285 hp",
        torque: "260 lb-ft",
        acceleration: "7.5 seconds (0-60 mph)",
        topSpeed: "112 mph",
        fuelEconomy: "17 city / 23 highway"
      },
      rating: 4.7,
      reviews: 38,
      images: [
        "https://images.pexels.com/photos/13696704/pexels-photo-13696704.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://imgd.aeplcdn.com/664x374/cw/ec/41418/Jeep-Wrangler-Right-Front-Three-Quarter-165896.jpg?wm=0&q=80",
        "https://imgd.aeplcdn.com/664x374/cw/ec/41418/Jeep-New-Wrangler-Exterior-164856.jpg?wm=0&q=80"
      ]
    },
    {
      id: 11,
      name: "2022 Subaru Outback Wilderness",
      price: 37900,
      location: "Portland, OR",
      mileage: "9,800",
      year: "2022",
      fuel: "Petrol",
      transmission: "Automatic",
      image: "https://images.pexels.com/photos/15928567/pexels-photo-15928567/free-photo-of-a-car-on-the-road.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      owner: "1st Owner",
      verified: true,
      description: "Adventure-ready Outback Wilderness with enhanced off-road capability and premium features.",
      features: [
        "Symmetrical AWD",
        "X-Mode with Dual Function",
        "Wilderness Package",
        "StarTex Water-Repellent Seats",
        "Harman Kardon Audio",
        "EyeSight Driver Assist"
      ],
      specs: {
        engine: "2.4L Turbo 4-cylinder",
        power: "260 hp",
        torque: "277 lb-ft",
        acceleration: "6.8 seconds (0-60 mph)",
        topSpeed: "130 mph",
        fuelEconomy: "22 city / 26 highway"
      },
      rating: 4.6,
      reviews: 45,
      images: [
        "https://images.pexels.com/photos/15928567/pexels-photo-15928567/free-photo-of-a-car-on-the-road.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://hips.hearstapps.com/hmg-prod/images/22my-obkw-51-1663367536.jpg?resize=980:*",
        "https://hips.hearstapps.com/hmg-prod/images/22my-obkw-2-1663367707.jpg?resize=980:*"
      ]
    },
    {
      id: 12,
      name: "2021 Lexus RX 450h",
      price: 52900,
      location: "San Francisco, CA",
      mileage: "12,300",
      year: "2021",
      fuel: "Hybrid",
      transmission: "Automatic",
      image: "https://images.pexels.com/photos/1005632/pexels-photo-1005632.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      owner: "1st Owner",
      verified: true,
      description: "Luxurious RX 450h with premium features and excellent fuel efficiency.",
      features: [
        "Mark Levinson Audio",
        "Panoramic Moonroof",
        "Heated/Ventilated Seats",
        "Wireless Charging",
        "360° Camera",
        "Lexus Safety System+"
      ],
      specs: {
        engine: "3.5L V6 Hybrid",
        power: "308 hp",
        torque: "247 lb-ft",
        acceleration: "7.2 seconds (0-60 mph)",
        topSpeed: "124 mph",
        fuelEconomy: "31 city / 28 highway"
      },
      rating: 4.8,
      reviews: 34,
      images: [
        "https://images.pexels.com/photos/1005632/pexels-photo-1005632.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://editorial.pxcrush.net/carsales/general/editorial/lexus-rx450h-03.jpg?width=1024&height=682",
        "https://editorial.pxcrush.net/carsales/general/editorial/lexus-rx450h-01.jpg?width=1024&height=682"
      ]
    },
    {
      id: 13,
      name: "2022 Volvo XC90 Recharge",
      price: 69900,
      location: "Washington, DC",
      mileage: "7,500",
      year: "2022",
      fuel: "Plug-in Hybrid",
      transmission: "Automatic",
      image: "https://images.pexels.com/photos/20695289/pexels-photo-20695289/free-photo-of-volvo-c40-recharge-on-parking-lot.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      owner: "1st Owner",
      verified: true,
      description: "Premium plug-in hybrid SUV with advanced safety features and luxurious interior.",
      features: [
        "Bowers & Wilkins Audio",
        "Pilot Assist",
        "Air Suspension",
        "Heated/Ventilated Seats",
        "Head-up Display",
        "360° Camera"
      ],
      specs: {
        engine: "2.0L Turbo/Supercharged + Electric",
        power: "455 hp",
        torque: "523 lb-ft",
        acceleration: "4.9 seconds (0-60 mph)",
        topSpeed: "140 mph",
        electricRange: "35 miles",
        fuelEconomy: "55 MPGe"
      },
      rating: 4.9,
      reviews: 27,
      images: [
        "https://images.pexels.com/photos/20695289/pexels-photo-20695289/free-photo-of-volvo-c40-recharge-on-parking-lot.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://imgd.aeplcdn.com/664x374/n/cw/ec/106395/xc90-exterior-right-rear-three-quarter.jpeg?isig=0&q=80",
        "https://imgd.aeplcdn.com/664x374/n/cw/ec/106395/xc90-exterior-rear-view.jpeg?isig=0&q=80"
      ]
    },
    {
      id: 14,
      name: "2021 Land Rover Defender",
      price: 78900,
      location: "Austin, TX",
      mileage: "11,200",
      year: "2021",
      fuel: "Petrol",
      transmission: "Automatic",
      image: "https://images.pexels.com/photos/29999371/pexels-photo-29999371/free-photo-of-luxury-land-rover-defender-in-milan.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      owner: "1st Owner",
      verified: true,
      description: "Modern interpretation of the classic Defender with advanced off-road capabilities.",
      features: [
        "Terrain Response 2",
        "Air Suspension",
        "Meridian Audio",
        "ClearSight Ground View",
        "Heated Steering Wheel",
        "Advanced Tow Assist"
      ],
      specs: {
        engine: "3.0L Turbo 6-cylinder",
        power: "395 hp",
        torque: "406 lb-ft",
        acceleration: "5.8 seconds (0-60 mph)",
        topSpeed: "149 mph",
        fuelEconomy: "17 city / 22 highway"
      },
      rating: 4.7,
      reviews: 31,
      images: [
        "https://imgd.aeplcdn.com/664x374/n/cw/ec/41970/landrover-defender-right-front-three-quarter1.jpeg?q=80",
        "https://imgd.aeplcdn.com/664x374/n/cw/ec/41970/defender-exterior-right-side-view.jpeg?q=80",
        "https://imgd.aeplcdn.com/664x374/n/cw/ec/41970/defender-exterior-rear-view.jpeg?q=80"
      ]
    },
    {
      id: 15,
      name: "2022 Genesis GV80",
      price: 59900,
      location: "Nashville, TN",
      mileage: "8,900",
      year: "2022",
      fuel: "Petrol",
      transmission: "Automatic",
      image: "https://images.pexels.com/photos/19899717/pexels-photo-19899717/free-photo-of-the-left-front-view-of-the-gv80-coupe-parked-underneath-a-red-sunset-sky.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      owner: "1st Owner",
      verified: true,
      description: "Luxury SUV with premium features and exceptional comfort.",
      features: [
        "Lexicon Audio",
        "Adaptive Suspension",
        "Nappa Leather",
        "Heated/Ventilated Seats",
        "Head-up Display",
        "360° Camera"
      ],
      specs: {
        engine: "3.5L Twin-Turbo V6",
        power: "375 hp",
        torque: "391 lb-ft",
        acceleration: "5.5 seconds (0-60 mph)",
        topSpeed: "149 mph",
        fuelEconomy: "18 city / 23 highway"
      },
      rating: 4.8,
      reviews: 29,
      images: [
        "https://www.edmunds.com/assets/m/genesis/gv80/2021/oem/2021_genesis_gv80_4dr-suv_35t-advanced-plus_fq_oem_1_815.jpg",
        "https://media.ed.edmunds-media.com/genesis/gv80/2021/oem/2021_genesis_gv80_4dr-suv_35t-advanced-plus_rq_oem_2_1280x855.jpg",
        "https://media.ed.edmunds-media.com/genesis/gv80/2021/oem/2021_genesis_gv80_4dr-suv_35t-advanced-plus_detail_oem_1_1280x855.jpg"
      ]
    },
    {
      id: 16,
      name: "2021 Mazda MX-5 Miata",
      price: 29900,
      location: "San Diego, CA",
      mileage: "5,600",
      year: "2021",
      fuel: "Petrol",
      transmission: "Manual",
      image: "https://images.pexels.com/photos/27393756/pexels-photo-27393756/free-photo-of-a-car-is-driving-in-the-rain-at-night.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      owner: "1st Owner",
      verified: true,
      description: "Pure driving pleasure in a lightweight roadster with perfect balance.",
      features: [
        "Bilstein Dampers",
        "Limited Slip Differential",
        "Bose Audio",
        "Heated Seats",
        "Blind Spot Monitor",
        "Apple CarPlay"
      ],
      specs: {
        engine: "2.0L 4-cylinder",
        power: "181 hp",
        torque: "151 lb-ft",
        acceleration: "6.5 seconds (0-60 mph)",
        topSpeed: "135 mph",
        fuelEconomy: "26 city / 34 highway"
      },
      rating: 4.9,
      reviews: 47,
      images: [
        "https://images.pexels.com/photos/27393756/pexels-photo-27393756/free-photo-of-a-car-is-driving-in-the-rain-at-night.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://www.mazdausa.com/siteassets/vehicles/2025/mx-5-st/02_vlp/001_35th-anniversary/b_carousel/desktop/2025-mazda-mx-5-miata-35th-anniversary-edition-artisan-red-exterior_desktop?w=1920",
        "https://www.mazdausa.com/siteassets/vehicles/2025/mx-5-st/02_vlp/001_35th-anniversary/b_carousel/desktop/2025-mazda-mx-5-miata-35th-anniversary-edition-tan-nappa-leather-interior_desktop?w=1920"
      ]
    },
    {
      id: 17,
      name: "2022 Kia Telluride",
      price: 42900,
      location: "Charlotte, NC",
      mileage: "10,300",
      year: "2022",
      fuel: "Petrol",
      transmission: "Automatic",
      image: "https://images.pexels.com/photos/17395382/pexels-photo-17395382/free-photo-of-kia-ev9-electric-car.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      owner: "1st Owner",
      verified: true,
      description: "Premium three-row SUV with exceptional comfort and features.",
      features: [
        "Nappa Leather",
        "Harman Kardon Audio",
        "Heated/Ventilated Seats",
        "360° Camera",
        "Blind Spot Monitor",
        "Smart Power Liftgate"
      ],
      specs: {
        engine: "3.8L V6",
        power: "291 hp",
        torque: "262 lb-ft",
        acceleration: "7.2 seconds (0-60 mph)",
        topSpeed: "130 mph",
        fuelEconomy: "20 city / 26 highway"
      },
      rating: 4.8,
      reviews: 53,
      images: [
        "https://images.pexels.com/photos/17395382/pexels-photo-17395382/free-photo-of-kia-ev9-electric-car.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://media.ed.edmunds-media.com/kia/telluride/2022/oem/2022_kia_telluride_4dr-suv_sx_rq_oem_1_1280x855.jpg",
        "hhttps://media.ed.edmunds-media.com/kia/telluride/2022/oem/2022_kia_telluride_4dr-suv_ex_fq_oem_1_1280x855.jpg"
      ]
    },
    {
      id: 18,
      name: "2021 Acura NSX",
      price: 159900,
      location: "Miami, FL",
      mileage: "3,200",
      year: "2021",
      fuel: "Hybrid",
      transmission: "Automatic",
      image: "https://images.pexels.com/photos/9661268/pexels-photo-9661268.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      owner: "1st Owner",
      verified: true,
      description: "Exotic supercar with hybrid technology and exceptional performance.",
      features: [
        "Sport Hybrid SH-AWD",
        "Carbon Ceramic Brakes",
        "E-LSD",
        "Sport Seats",
        "Carbon Fiber Interior",
        "Track Mode"
      ],
      specs: {
        engine: "3.5L Twin-Turbo V6 + Electric",
        power: "573 hp",
        torque: "476 lb-ft",
        acceleration: "2.9 seconds (0-60 mph)",
        topSpeed: "191 mph",
        fuelEconomy: "21 city / 22 highway"
      },
      rating: 4.9,
      reviews: 19,
      images: [
        "https://images.pexels.com/photos/9661268/pexels-photo-9661268.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://hips.hearstapps.com/hmg-prod/images/2021-acura-nsx-mmp-1-1605117388.jpg?crop=0.582xw:0.511xh;0.261xw,0.316xh&resize=1200:*",
        "https://hips.hearstapps.com/hmg-prod/images/2021-acura-nsx-mmp-3-1605117600.jpg?crop=1xw:0.84375xh;center,top&resize=281:*"
      ]
    },
    {
      id: 19,
      name: "2022 Hyundai Palisade",
      price: 39900,
      location: "Orlando, FL",
      mileage: "7,800",
      year: "2022",
      fuel: "Petrol",
      transmission: "Automatic",
      image: "https://images.pexels.com/photos/11194510/pexels-photo-11194510.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      owner: "1st Owner",
      verified: true,
      description: "Premium three-row SUV with advanced safety features and luxurious interior.",
      features: [
        "Nappa Leather",
        "Harman Kardon Audio",
        "Heated/Ventilated Seats",
        "360° Camera",
        "Blind Spot Monitor",
        "Smart Power Liftgate"
      ],
      specs: {
        engine: "3.8L V6",
        power: "291 hp",
        torque: "262 lb-ft",
        acceleration: "7.2 seconds (0-60 mph)",
        topSpeed: "130 mph",
        fuelEconomy: "19 city / 26 highway"
      },
      rating: 4.7,
      reviews: 48,
      images: [
        "https://images.pexels.com/photos/11194510/pexels-photo-11194510.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://stimg.cardekho.com/images/carexteriorimages/630x420/Hyundai/Hyundai-Palisade/6721/1544621705432/rear-left-view-121.jpg?tr=w-664",
        "https://stimg.cardekho.com/images/carexteriorimages/630x420/Hyundai/Hyundai-Palisade/6721/1544621705432/grille-97.jpg?tr=w-664"
      ]
    },
    {
      id: 20,
      name: "2021 Dodge Challenger SRT Hellcat",
      price: 69900,
      location: "Detroit, MI",
      mileage: "4,500",
      year: "2021",
      fuel: "Petrol",
      transmission: "Automatic",
      image: "https://images.pexels.com/photos/13916690/pexels-photo-13916690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      owner: "1st Owner",
      verified: true,
      description: "Muscle car with extreme power and performance.",
      features: [
        "SRT Performance Pages",
        "Brembo Brakes",
        "Launch Control",
        "Performance Seats",
        "Uconnect 4C",
        "Performance Suspension"
      ],
      specs: {
        engine: "6.2L Supercharged HEMI V8",
        power: "717 hp",
        torque: "650 lb-ft",
        acceleration: "3.6 seconds (0-60 mph)",
        topSpeed: "199 mph",
        fuelEconomy: "13 city / 22 highway"
      },
      rating: 4.8,
      reviews: 33,
      images: [
        "https://images.pexels.com/photos/13916690/pexels-photo-13916690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://hips.hearstapps.com/hmg-prod/images/2021-dodge-challenger-srt-hellcat-128-1593640343.jpg?crop=1xw:0.84375xh;center,top&resize=281:*",
        "https://hips.hearstapps.com/hmg-prod/images/2021-dodge-challenger-srt-hellcat-106-1593640221.jpg?crop=1xw:1xh;center,top&resize=980:*"
      ]
    }
  ];

  const handleToggleWishlist = async (car) => {
    try {
      if (wishlistItems.some(item => item.id === car.id)) {
        await removeFromWishlist(car.id);
      } else {
        await addToWishlist(car);
      }
    } catch (error) {
      console.error('Error toggling wishlist:', error);
    }
  };
  

  const ViewDetailsModal = ({ car, onClose }) => (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="car-gallery">
          <img src={car.images[0]} alt={car.name} className="main-image" />
          <div className="thumbnail-grid">
            {car.images.map((image, index) => (
              <img key={index} src={image} alt={`${car.name} view ${index + 1}`} />
            ))}
          </div>
        </div>

        <div className="car-details">
          <div className="car-header">
            <div>
              <h2>{car.name}</h2>
              <div className="rating">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className={i < Math.floor(car.rating) ? 'filled' : ''} />
                ))}
                <span>({car.reviews} Reviews)</span>
              </div>
            </div>
            <div className="price-tag">
              <IndianRupee size={24} />
              {car.price.toLocaleString()}
            </div>
          </div>

          <div className="car-description">
            <p>{car.description}</p>
          </div>

          <div className="specifications">
            <h3>Key Specifications</h3>
            <div className="specs-grid">
              {Object.entries(car.specs).map(([key, value]) => (
                <div key={key} className="spec-item">
                  <h4>{key.replace(/([A-Z])/g, ' $1').trim()}</h4>
                  <p>{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="features">
            <h3>Features</h3>
            <div className="features-grid">
              {car.features.map((feature, index) => (
                <div key={index} className="feature-item">
                  <Shield size={16} />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="seller-info">
            <h3>Seller Information</h3>
            <div className="seller-details">
              <div className="seller-rating">
                <ThumbsUp size={20} />
                <span>Highly Rated Seller</span>
              </div>
              <div className="seller-location">
                <MapPin size={20} />
                <span>{car.location}</span>
              </div>
            </div>
          </div>

          <div className="action-buttons">
            <button 
              className="schedule-test"
              onClick={() => {
                setShowTestDrive(true);
                onClose();
              }}
            >
              Schedule Test Drive
            </button>
            <button 
              className="contact-seller"
              onClick={() => {
                setShowContactSeller(true);
                onClose();
              }}
            >
              Contact Seller
            </button>
            <button 
              className="view-accessories"
              onClick={() => {
                setShowAccessories(true);
                onClose();
              }}
            >
              View Accessories
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const AdvancedFilters = ({ show, onClose }) => (
    <div className={`advanced-filters ${show ? 'show' : ''}`}>
      <div className="filters-header">
        <h3>Advanced Filters</h3>
        <button onClick={onClose}>
          <X size={20} />
        </button>
      </div>

      <div className="filters-body">
        <div className="filter-section">
          <h4>Price Range</h4>
          <div className="range-inputs">
            <input 
              type="number" 
              placeholder="Min Price"
              value={filters.priceRange.min}
              onChange={e => setFilters({
                ...filters,
                priceRange: { ...filters.priceRange, min: e.target.value }
              })}
            />
            <span>to</span>
            <input 
              type="number" 
              placeholder="Max Price"
              value={filters.priceRange.max}
              onChange={e => setFilters({
                ...filters,
                priceRange: { ...filters.priceRange, max: e.target.value }
              })}
            />
          </div>
        </div>

        <div className="filter-section">
          <h4>Mileage</h4>
          <select 
            value={filters.mileage}
            onChange={e => setFilters({ ...filters, mileage: e.target.value })}
          >
            <option value="all">All Mileage</option>
            <option value="0-30000">Under 30,000 miles</option>
            <option value="30000-60000">30,000 - 60,000 miles</option>
            <option value="60000-90000">60,000 - 90,000 miles</option>
            <option value="90000+">Over 90,000 miles</option>
          </select>
        </div>

        <div className="filter-section">
          <h4>Body Type</h4>
          <div className="body-type-options">
            {['Sedan', 'SUV', 'Coupe', 'Hatchback', 'Wagon', 'Truck'].map(type => (
              <button
                key={type}
                className={filters.bodyType === type.toLowerCase() ? 'active' : ''}
                onClick={() => setFilters({ ...filters, bodyType: type.toLowerCase() })}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-section">
          <h4>Features</h4>
          <div className="features-grid">
            {[
              'Leather Seats',
              'Sunroof',
              'Navigation',
              'Bluetooth',
              'Backup Camera',
              'Parking Sensors'
            ].map(feature => (
              <label key={feature} className="feature-checkbox">
                <input type="checkbox" />
                {feature}
              </label>
            ))}
          </div>
        </div>

        <div className="filters-actions">
          <button className="reset-filters">Reset All</button>
          <button className="apply-filters" onClick={onClose}>Apply Filters</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="used-cars-container">
      <div className="used-cars-header">
        <div className="header-content">
          <h1>Used Cars</h1>
          <p>Find certified pre-owned cars with complete peace of mind</p>
        </div>
      </div>

      <div className="search-section">
        <div className="search-container">
          <div className="search-box">
            <Search size={20} />
            <input type="text" placeholder="Search by make, model, or keyword" />
          </div>
          <div className="location-box">
            <MapPin size={20} />
            <input type="text" placeholder="Location" />
          </div>
          <button className="search-button">
            Search Cars
          </button>
        </div>
      </div>

      <div className="filters-section">
        <div className="filters-container">
          <div className="filter-groups">
            <div className="filter-group">
              <label>Budget</label>
              <select>
                <option>Under $20,000</option>
                <option>$20,000 - $30,000</option>
                <option>$30,000 - $40,000</option>
                <option>$40,000+</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Brand</label>
              <select>
                <option>All Brands</option>
                <option>BMW</option>
                <option>Mercedes-Benz</option>
                <option>Audi</option>
                <option>Toyota</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Year</label>
              <select>
                <option>All Years</option>
                <option>2023</option>
                <option>2022</option>
                <option>2021</option>
                <option>2020</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Fuel Type</label>
              <select>
                <option>All Types</option>
                <option>Petrol</option>
                <option>Diesel</option>
                <option>Electric</option>
                <option>Hybrid</option>
              </select>
            </div>
          </div>
          <button 
            className="more-filters-button"
            onClick={() => setShowFilters(true)}
          >
            <Filter size={20} />
            More Filters
          </button>
        </div>
      </div>

      <div className="cars-grid-container">
        {usedCars.map(car => (
          <div className="car-card" key={car.id}>
            <div className="car-image">
              <img src={car.image} alt={car.name} />
              <button
                className={`favorite-btn ${wishlistItems.some(item => item.id === car.id) ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleToggleWishlist(car);
                }}
                aria-label={wishlistItems.some(item => item.id === car.id) ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart
                  size={20}
                  fill={wishlistItems.some(item => item.id === car.id) ? "#ff4444" : "none"}
                />
              </button>

              {car.verified && (
                <div className="verified-badge">
                  Certified
                </div>
              )}
            </div>
            
            <div className="car-content">
              <div className="car-header">
                <h3>{car.name}</h3>
                <div className="price">
                  <IndianRupee size={16} />
                  {car.price.toLocaleString()}
                </div>
              </div>

              <div className="car-location">
                <MapPin size={16} />
                {car.location}
              </div>
              
              <div className="car-specs">
                <div className="spec">
                  <Calendar size={16} />
                  <span>{car.year}</span>
                </div>
                <div className="spec">
                  <Car size={16} />
                  <span>{car.mileage} km</span>
                </div>
                <div className="spec">
                  <Fuel size={16} />
                  <span>{car.fuel}</span>
                </div>
                <div className="spec">
                  <Settings size={16} />
                  <span>{car.transmission}</span>
                </div>
              </div>

              <div className="owner-info">
                <span className="owner-badge">{car.owner}</span>
              </div>

              <div className="car-actions">
                <button className="view-details" onClick={() => setSelectedCar(car)}>
                  View Details
                  <ChevronDown size={16} />
                </button>
                <button 
                  className="contact-seller"
                  onClick={() => {
                    setSelectedCar(car);
                    setShowContactSeller(true);
                  }}
                >
                  Contact Seller
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedCar && !showTestDrive && !showContactSeller && !showAccessories && (
        <ViewDetailsModal
          car={selectedCar}
          onClose={() => setSelectedCar(null)}
        />
      )}

      {showTestDrive && selectedCar && (
        <TestDriveBooking
          car={selectedCar}
          onClose={() => {
            setShowTestDrive(false);
            setSelectedCar(null);
          }}
        />
      )}

      {showContactSeller && selectedCar && (
        <ContactSeller
          car={selectedCar}
          onClose={() => {
            setShowContactSeller(false);
            setSelectedCar(null);
          }}
        />
      )}

      {showAccessories && selectedCar && (
        <div className="accessories-section">
          <div className="section-header">
            <h2>Recommended Accessories for {selectedCar.name}</h2>
            <button 
              className="close-accessories" 
              onClick={() => {
                setShowAccessories(false);
                setSelectedCar(null);
              }}
            >
              <X size={20} />
            </button>
          </div>
          <Accessory 
            carType={selectedCar.name.split(' ')[0]} 
            carModel={selectedCar.name.split(' ').slice(1).join(' ')} 
          />
        </div>
      )}

      <AdvancedFilters 
        show={showFilters}
        onClose={() => setShowFilters(false)}
      />
    </div>
  );
};

export default UsedCars;