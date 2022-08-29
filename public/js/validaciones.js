window.addEventListener('load', function(){
    var formulario = document.querySelector('form.form');

    formulario.addEventListener('submit', function(e) {
        e.preventDefault();

        var campoNombre = document.querySelector('input.log');

        if(campoNombre.value == ""){
            alert('El campo de nombre está')
        }

    });
} )