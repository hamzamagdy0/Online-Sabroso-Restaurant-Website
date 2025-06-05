const mongoose = require('mongoose');
const MenuSchema=mongoose.Schema(
    {
        ItemName: { 
            type: String,
            required: [true]
        },
        ItemPrice: { 
            type: Number,
            required: [true]
        },
        Category: { 
            type: String,
            required: [true]
        }, 
        ItemDescription:{
            type:String
        }
    }, { timestamps: true }
);
const Menu = mongoose.model("Menu",MenuSchema);
module.exports=Menu;