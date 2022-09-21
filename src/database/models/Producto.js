const sequelize = require("sequelize")

module.exports = (sequelize, dataTypes) => {
    let alias = 'Producto'
    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        } ,
        name: {
            type: dataTypes.STRING
        },
        price: {
            type: dataTypes.DOUBLE
        },
        discount: {
            type: dataTypes.DOUBLE
        },
        category: {
            type: dataTypes.STRING
        }, 
        description: {
            type: dataTypes.STRING
        },
        image:{
            type: dataTypes.STRING
        }
        /*
        createdAt: {
            type: dataTypes.DATE
        },
        updatedAt: {
            type: dataTypes.DATE
       
        }     */    

    }
    let config = {
        tableName: 'products',
        timestamps: false
    } 

    

    const Producto = sequelize.define(alias,cols, config)

    return Producto

}