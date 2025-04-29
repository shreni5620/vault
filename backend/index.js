const express = require("express") //express....
const mongoose = require("mongoose")
const cors = require("cors")
require('dotenv').config();
//express object..
const app = express()
app.use(cors({
    origin: "http://localhost:5173", //frontend url
    credentials: true, 
}))
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});
app.use(express.json()) //to accept data as json...

//userRoutes
const userRoutes = require("./src/routes/UserRoutes")
app.use("/user",userRoutes)

const areaRoutes = require("./src/routes/AreaRoutes")
app.use("/area",areaRoutes)

const cityRoutes = require("./src/routes/CityRoutes")
app.use("/city",cityRoutes)

const stateRoutes = require("./src/routes/StateRoute")
app.use("/state",stateRoutes)

const featureRoutes = require("./src/routes/FeatureRoutes")
app.use("/feature",featureRoutes)

const inquiryRoutes = require("./src/routes/InquiryRoutes")
app.use("/inquiry",inquiryRoutes)

const insuranceRoutes = require("./src/routes/InsuranceRoutes")
app.use("/insurance",insuranceRoutes)

const carRoutes = require("./src/routes/CarRoutes")
app.use("/car",carRoutes)

const reviewRoutes = require("./src/routes/ReviewRoutes")
app.use("/review",reviewRoutes)

const otpRoutes = require("./src/routes/OtpRoutes")
app.use("/otp",otpRoutes)

const wishlistRoutes = require("./src/routes/WishlistRoutes")
app.use("/wishlist",wishlistRoutes)

const notification = require("./src/routes/NotificationRoutes")
app.use("/notification",notification)

mongoose.connect("mongodb://127.0.0.1:27017/vehicle_vault").then(()=>{
    console.log("Connected to MongoDB")
})
.catch((err) => console.error("MongoDB connection error:", err));

//server creation...
const PORT = process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: true, message: 'Something went wrong!' });
});