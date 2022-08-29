const sequelize = require("sequelize")

module.exports = (sequelize, dataTypes) => {
    let alias = 'Cart'
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
        /*
        createdAt: {
            type: dataTypes.DATE
        },
        updatedAt: {
            type: dataTypes.DATE
       
        }     */    

    }
    let config = {
        tableName: 'cart',
        timestamps: false
    } 

    

    const Cart = sequelize.define(alias,cols, config)

    return Cart

}