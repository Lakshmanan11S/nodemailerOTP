const mongoose = require ('mongoose');

const schema = mongoose.Schema({
    // from:{
    //     type:String,
    // },
    to:{
        type:String,
    },
    subject:{
        type:String,
    },
    text:{
        type:String,
    },
})

const result = new mongoose.model("MAIL",schema)

module.exports = result