console.log("Validando Registro");
window.addEventListener("load", function(){

    
    const register_form = document.querySelector(".register_form");
    register_form.addEventListener("submit", function(e){

        const user          = document.querySelector("input#user");
        const email         = document.querySelector("input#email");
        const pass          = document.querySelector("input#pass");
        const pass_confirm  = document.querySelector("input#pass_confirm");
        // const Image         = document.querySelector("input#Image");
        const errores       = document.querySelector("div.errores ul");
        const enviar        = document.querySelector("input#enviar");
        
        e.preventDefault();
        
        const errors = [];
        
        if(user.value == ""){
            
            errors.push("El Campo del Nombre Tiene Que Estar Completo!");
        }else if(user.value.length < 3){
            errors.push("El Campo del Nombre Tiene Que Tener Más De 3 Catacteres!");
        }

        if(email.value == ""){
            errors.push("El Campo del Email Tiene Que Estar Completo!");
        }

        if(pass.value == ""){
            errors.push("Escriba Su Contraseña!");
        }else if(pass.value < 6){
            errors.push("Su Contraseña Tiene Que Tener Más De 6 Catacteres, Una Mayúscula Y Un Caracter Numerico !");
        }   

        if(pass_confirm.value == ""){
            errors.push("Confirme Su contraseña!");
        }else if(pass_confirm.value < 6){
            errors.push("Su Contraseña Tiene Que Tener Más De 6 Catacteres, Una Mayúscula Y Un Caracter Numerico !");
        }else{

        }   

        if(pass.value != pass_confirm.value){
            errors.push("Sus Contraseñas No Coinciden!");
        }

        if(errors.length > 0){

            e.preventDefault();

            for(let i=0; i<errors.length; i++){

                errores.innerHTML += "<li>" + errors[i] + "</li>";

            }


        }else(
            enviar.addEventListener("onclick", function(e){
                // e.preventDefault();
                register_form.submit();
            })
        )

        
        console.log("enviado")

            
        
    })


})
