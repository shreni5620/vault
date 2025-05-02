const CarModel = require("../models/CarModel");

// add car

const addCar= async(req,res)=>{
    try{
        const savedCar=await CarModel.create(req.body);
        res.status(201).json({
            success: true,
            message:"Car saved successfully",
            data:savedCar
        })
    }catch(err){
        console.error("Error in addCar:", err);
        res.status(500).json({
            success:false,
            message:err.message || "Error saving car"
        });
    }
};


//get Car
const getAllCars = async (req, res) => {
    try {
        const car = await CarModel.find();
        res.status(200).json({
            success: true,
            message: " all car ",
            data: car
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || "Error retrieving cars"
        });
    }
};

// Update car
const updateCar = async (req, res) => {
    try {
        const updatedCar = await CarModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedCar) {
            return res.status(404).json({ success: false, message: "Car not found" });
        }
        res.status(200).json({
            success: true,
            message: "Car updated successfully",
            data: updatedCar
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || "Error updating car"
        });
    }
};

// Delete car
const deleteCar = async (req, res) => {
    try {
        const deletedCar = await CarModel.findByIdAndDelete(req.params.id);
        if (!deletedCar) {
            return res.status(404).json({ success: false, message: "Car not found" });
        }
        res.status(200).json({
            success: true,
            message: "Car deleted successfully"
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || "Error deleting car"
        });
    }
};

module.exports={
    addCar,
    getAllCars,
    updateCar,
    deleteCar,
}