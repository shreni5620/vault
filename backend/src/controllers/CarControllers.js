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
        res.status(500).json({
            success:false,
            message:err.message || "Error saving car"
        });
    }
};


//get Car
const getCar= async(req,res)=>{
    try{
        const car= await CarModel.find();
        res.status(200).json({
            success:true,
            message:" all car ",
            data:car
        })

    }catch(err){
        res.status(500).json({
            success:false,
            message:err.message || "Error retrieving cars"
        });

    }
};


module.exports={
    addCar,
    getCar,
}