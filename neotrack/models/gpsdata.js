const mongoose = require('mongoose');
const gpsdataSchema = new mongoose.Schema({
    assetnumber: {
        type: String,
        required: true
    },
    latitude: {
        type: String,
        required: true
    },
    longitude:{
        type:String,
        required: true
    },
    updatedate:{
        type: Date,
        default: Date.now(),
        required: false
    }
});



/*
{
    "assetnumber":"186165",
    "latitude":"4894512",
    "longitude":"85453"
}
*/

const gpsdata = mongoose.model("gpsdata",gpsdataSchema);
module.exports = gpsdata;