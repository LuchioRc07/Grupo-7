const sequelize = require("sequelize");
// import { Sequelize, Model, DataTypes } from "sequelize";

module.exports = (sequelize, dataTypes) => {
    let alias = 'User'
    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        } ,
        name: {
            type: dataTypes.STRING
        },
        pass: {
            type: dataTypes.STRING
        },
   

    }
    let config = {
        tableName: 'users',
        timestamps: false

    } 

    

    const Usuarios = sequelize.define(alias,cols, config)

   


    return Usuarios

}