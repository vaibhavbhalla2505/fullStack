import { INTEGER, STRING } from "sequelize";
import { sequelize } from "../config/dbConnect.js";
export const Author = sequelize.define('Authors', {
    author_id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    author_name: {
        type: STRING,
        allowNull: false
    },
}, {
    timestamps: false
});
