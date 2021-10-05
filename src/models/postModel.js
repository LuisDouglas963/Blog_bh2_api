const mongoose = require('mongoose'); //Importando mongoose

const postSchema = new mongoose.Schema({
    _id:{
        type:String,   //definindo tipo
        required: true, //Tornando obrigatorio
    },
    title: {
        type:String,
        required:true, //Tornando obrigatorio

    },
    description: {
        type:String,
        required: true, //Tornando obrigatorio
    },
    active: {
        type:Boolean,
        default: false
    }
});

module.exports = mongoose.model("Post" , postSchema); //Exportando model Post