window.addEventListener("load", function(){
    const products_form = document.getElementById("form.products_form");

    products_form.addEventListener("submit", function(e){

        e.preventDefault();

            const errores = [];

        const name           = document.querySelector("input#name");

        if(name.value == ""){
            errors.push("Asignale un nombre al Pruducto!");
        }

        const price          = document.querySelector("input#price");

        if(price.value == ""){
            errors.push("Asignale precio al Pruducto!");
        }
        
        const discount       = document.querySelector("input#discount");
        
        if(discount.value == ""){
            errors.push("Asignale un descuento al Pruducto!");
        }
        
        const category       = document.querySelector("select#category");
        
        if(category.value == ""){
            errors.push("Asignale una Categoría al Pruducto!");
        }
        
        const image          = document.querySelector("input#image");
        
        if(image.value == ""){
            errors.push("Asignale una imagen al Pruducto!");
        }
        
        let crear_product  = document.querySelector("button#crear_product");
        
        
        if(errors.length > 0){
            
            e.preventDefault();
            
            for(let i=0; i<errors.length; i++){
                
                errores.innerHTML += "<li>" + errors[i] + "</li>";
                
            }
            
            
        }else(
            crear_product.addEventListener("onclick", function(e){
                // e.preventDefault();
                products_form.submit();
            })
        )

    })
})