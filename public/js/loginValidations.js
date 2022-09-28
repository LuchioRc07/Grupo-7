window.addEventListener("load", function(){
    const login_form = document.querySelector("form.login_form");

    login_form.addEventListener("submit", function(e){
        e.preventDefault();
        const errores = [];
        const name  = document.querySelector("input#user");
        const pass  = document.querySelector("input#password");
        const send  = document.querySelector("input#send");

        if(name.value == ""){
            errores.push("Ingresá tu Usuario")
        }

        if(pass.value == ""){
            errores.push("Ingresá tu Contraseña")
        }

        if(errors.length > 0){

            e.preventDefault();

            for(let i=0; i<errors.length; i++){

                errores.innerHTML += "<li>" + errors[i] + "</li>";

            }


        }else(
            send.addEventListener("onclick", function(e){
                // e.preventDefault();
                login_form.submit();
            })
        )

    })
})