module.exports = function( db ) {

    db["Producto"].hasMany(db["Cart"],{
        foreignkey: "id_product"
    });
    db["Cart"].belongsTo(db["Producto"],{
        // foreignkey: "id_product"
    }); 

    db["User"].hasMany(db["Cart"],{
        foreignkey: "id_user"
    });
    db["Cart"].belongsTo(db["User"],{
        // foreignkey: "id_user"
    }); 

    

    return db;

}