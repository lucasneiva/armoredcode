import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
    streetAddress: {    // Logradouro (street name and number)
        type: String
    },

    neighborhood: {   
        type: String
    },

    city: {           
        type: String,
        required: true
    },

    state: {          
        type: String,
        default: "SP"
    },

    zipCode: {  // CEP
        type: String
    },

    country: {
        type: String,
        default: "Brazil" 
    }
    
});

export default mongoose.model("Location", LocationSchema);