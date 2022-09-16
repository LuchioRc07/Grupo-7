const sequelize = require("sequelize")

module.exports = (sequelize, dataTypes) => {
    let alias = 'Cart'
    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        } ,
        id_user:{
            type: dataTypes.INTEGER,
            
       
        },
        id_product:{
            type: dataTypes.INTEGER,
        
           
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
        tableName: 'cart',
        timestamps: false
    } 

    

    const Cart = sequelize.define(alias,cols, config)

    return Cart

}