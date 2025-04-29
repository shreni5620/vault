/*const mongoose = require("mongoose")
const Schema = mongoose.Schema

const carSchema = new Schema({
    make: {
        type: String,
    },
    model: {
        type: String,
    },
    year: {
        type: Number,
    },
    variant: {
        type: String,
    },

    mileage: {
        type: Number,
    },

    fuelType: {
        type: String,
    },


    transmissionType: {
        type: String,
    },
    price: {
        type: Number,
    }, color: {
        type: String,
    },

    description: {
        type: String,
    },

    status: {
        type: String,
    },


    listingDate: {
        type: Date,
    }, registrationNum: {
        type: String,
    }, userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
    }, cityId: {
        type: Schema.Types.ObjectId,
        ref: "city",
    },

    areaId: {
        type: Schema.Types.ObjectId,
        ref: "area",
    },

    stateId: {
        type: Schema.Types.ObjectId,
        ref: "state",
    }, registrationYear: {
        type: Number,
    },


    insurance: {
        type: String,
    },

    seats: {
        type: Number,
    },


    kmsDriven: {
        type: Number,
    },



    OwnerShip: {
        type: String,
    },


    engineDisplacement: {
        type: String,
    },


    NoOfAirBags: {
        type: Number,
    }
})

module.exports = mongoose.model("car", carSchema) */

const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Car name is required']
    },
    image: {
        type: String,
        required: [true, 'Car image URL is required']
    },
    price: {
        type: String,
        required: [true, 'Car price is required']
    },
    type: {
        type: String,
        required: [true, 'Car type is required']
    },
    fuel: {
        type: String,
        required: [true, 'Fuel type is required']
    },
    mileage: {
        type: String,
        required: [true, 'Mileage information is required']
    },
    engine: {
        type: String,
        required: [true, 'Engine information is required']
    },
    transmission: {
        type: String,
        required: [true, 'Transmission type is required']
    }
}, {
    timestamps: true
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;