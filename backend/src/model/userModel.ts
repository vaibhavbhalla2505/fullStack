import {sequelize} from "../config/dbConnect.js"
import { STRING,INTEGER } from "sequelize"
export const user=sequelize.define('User',{
    user_id:{
        type: INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    email:{
        type:STRING,
        allowNull:false
    }
},{
    timestamps:false
})