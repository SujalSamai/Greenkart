import mongoose from "mongoose";

const NewAddressSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectedId,
        ref : 'User'
    },
    fullName : String,
    address : String,
    city : String,
    country : String,
    postalCode : String,
}, {timestamps : true})

const Address = mongoose.models.Address ||  mongoose.model('Address', NewAddressSchema)

export default Address;
