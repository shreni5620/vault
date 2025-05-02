const express = require('express');
const router = express.Router();
const carController = require('../controllers/CarControllers');

router.get('/', carController.getAllCars);      // GET /car
router.post('/', carController.addCar);         // POST /car
router.put('/:id', carController.updateCar);    // PUT /car/:id
router.delete('/:id', carController.deleteCar); // DELETE /car/:id

module.exports = router;
