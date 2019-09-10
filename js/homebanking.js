//Declaración de variables
var nombreUsuario = "Jana Ferrer";
var saldoCuenta = 100000;
var limiteExtraccion = 5000;
var esAutorizado = false;

//Ejecución de las funciones que actualizan los valores de las variables en el HTML.
window.onload = function() {
    iniciarSesion(); 
    cargarNombreEnPantalla();
    actualizarSaldoEnPantalla();
    actualizarLimiteEnPantalla();
}

//2.2 Guía: parte 2 - Paso 1
function sumarDinero (dinero) {
    saldoCuenta += dinero;
}
//2.2 Guía: parte 2 - Paso 2
function restarDinero (dinero) {
    saldoCuenta -= dinero;
}

//Funciones que tenes que completar
function cambiarLimiteDeExtraccion() {

    if(!esAutorizado) {return;} // si el login no fue exitoso, la función no se ejecuta.

    var limiteVerif = obtenerCantDinero("limite");
    var limiteAnterior = limiteExtraccion;
    limiteExtraccion = limiteVerif;
    if(limiteAnterior != limiteExtraccion ) {
        actualizarLimiteEnPantalla();
        alert("Límite anterior: $" + limiteAnterior + "\n" +
            "Límite actual: $" + limiteExtraccion);
    }
}

function extraerDinero() {

    if(!esAutorizado) {return;} // si el login no fue exitoso, la función no se ejecuta.

    var dineroVerif = obtenerCantDinero("extraer");
    var saldoAnterior = saldoCuenta;
    if(billetesCienOk(dineroVerif)) {
        if(esMenorLimiteExt(dineroVerif)) {
            if(esMenorSaldoDisp(dineroVerif)) {
                restarDinero(dineroVerif);
                if(saldoAnterior != saldoCuenta) {
                    actualizarSaldoEnPantalla();
                    alert("Has retirado: $" + dineroVerif + "\n" +
                        "Saldo anterior: $" + saldoAnterior + "\n" +
                        "Saldo actual: $" + saldoCuenta);
                }
            } else {
                alert("No tienes saldo suficiente en tu cuenta. \nGracias.");
            }
        } else {
            alert("El movimiento supera tu límite de extracción. \nGracias.");
        }
    } else {
        alert("Solo puedes extraer billetes de 100. \nGracias.");
    }
}

function depositarDinero() {

    if(!esAutorizado) {return;} // si el login no fue exitoso, la función no se ejecuta.

    var dineroVerif = obtenerCantDinero("depositar");
    var saldoAnterior = saldoCuenta;
    sumarDinero(dineroVerif);
    if(saldoAnterior != saldoCuenta) {
        actualizarSaldoEnPantalla();
        alert("Has depositado: $" + dineroVerif + "\n" +
        "Saldo anterior: $" + saldoAnterior + "\n" +
        "Saldo actual: $" + saldoCuenta);
    }    
}

function pagarServicio() {

    if(!esAutorizado) {return;}

    var serviciosPorPagar = [["Agua", 350], ["Luz", 210], ["Internet", 570], ["Teléfono", 425]]; //defino la variable como un array de arrays.
    var opcionServicio = prompt("Ingresa el número que corresponda con el servicio que quieres pagar:\n1-Agua\n2-Luz\n3-Internet\n4-Teléfono");

    if (opcionServicio == null || opcionServicio == ""){
        return;
    }

    var opcion = parseInt(opcionServicio); 

    //Compruebo si es un valor numérico 
    if (isNaN(opcion)) { 
        return;
    } else if((opcion > 4) || (opcion < 1)) { 
        //(Si era un número) validoq ue la opciónn esté entre 1 y 4. 
        alert("Ingresaste una opción no válida. \n Gracias.");
        return;
    }
    if(esMenorSaldoDisp(serviciosPorPagar[opcion-1] [1])){ // opcion-1 hace que respete el rango del index del array con la opción elegida.
        var saldoAnterior = saldoCuenta;
        restarDinero(serviciosPorPagar[opcion-1] [1]); //tomo el valor del monto del servicio elegido 
        actualizarSaldoEnPantalla();
        alert("Has pagado el servicio " + serviciosPorPagar[opcion-1] [0] + "." + "\n" + 
        "Saldo anterior: $" + saldoAnterior + "\n" + 
        "Dinero descontado: $" + serviciosPorPagar[opcion-1] [1] + "\n" +
        "Saldo actual: $" + saldoCuenta);
    } else {
        alert("No hay suficiente saldo en tu cuenta para pagar este servicio");
    }
    
}

function transferirDinero() {

    if(!esAutorizado) {return;}

    //TODO: voy a utilizar switch en esta funcion 
    var cuentaAmiga1 = 1234567;
    var cuentaAmiga2 = 7654321;

    var dineroTransferir = obtenerCantDinero("transferir");

    if(dineroTransferir != 0) {
        if(esMenorSaldoDisp(dineroTransferir)){

            var cuentaIngresada = prompt("Ingresa el número que corresponda a la cuenta destino:");

            if (cuentaIngresada == null || cuentaIngresada == ""){
                return;
            }

            var cuentaDestino = parseInt(cuentaIngresada); 

            //Compruebo si es un valor numérico 
            if (isNaN(cuentaDestino)) { 
                //entonces (no es numero) devuelvo un mensaje de error. 
                //alert("Ingresa un número válido por favor. \n Gracias.");
                return;
            } else if(cuentaIngresada.length != 7) { 
                //salgo si el número de cuenta no tiene 7 digitos. 
                alert("Ingresaste una cuenta no válida. \n Gracias.");
                return;
            }
        
            switch (cuentaDestino) {
                case 1234567:
                    break;
                case 7654321:
                    break;
                default:
                    alert("Ingresaste una cuenta que no es amiga. \nGracias.");
                    return;
            }

            restarDinero(dineroTransferir);
            actualizarSaldoEnPantalla();
            alert("Se han tranferido: $" + dineroTransferir + "\n" + "Cuenta destino: " + cuentaDestino);
        } else {
            alert("No hay suficiente saldo en tu cuenta para hacer la transferencia.");
        }
    }
}

function iniciarSesion() {
    //TODO: esta función debe ejecutarse antes que cualquier otra en el arranque
    var claveActual = 1234;
    var intentos = 1;

    while(!esAutorizado && intentos < 4){
        var claveIngresada = prompt("Ingresa la clave de tu cuenta:");

        if (claveIngresada === null || claveIngresada === ""){
            continue;
        }

        var clave = parseInt(claveIngresada); 

        //Compruebo si es un valor numérico 
        if (isNaN(clave)) { 
            //entonces (no es numero) devuelvo un mensaje de error. 
            //alert("Ingresa un número válido por favor. \n Gracias.");
            continue;
        } else if(claveIngresada.length != 4 ) { 
            //(Si era un número) salgo si el número de cuenta no tiene 7 digitos.
            console.log(clave, claveActual); 
            alert("Ingresaste una clave no válida. \nGracias.");
            continue;
        }

        //console.log(clave, claveActual);

        if(clave == claveActual) {
            alert("Bienvenido/a " + nombreUsuario + " ya puedes comenzar a realizar operaciones.");
            esAutorizado = !esAutorizado;
            console.log(esAutorizado);
        } else {
            alert("Código incorrecto " + intentos + " de 3." + " Tu dinero ha sido retenido por cuestiones de seguridad.");
            intentos++;
        }
    }
    if (intentos == 4) {
        alert("No tienes más intentos, tu dinero ha sido retenido. Llamar al 0800.");
        document.getElementById("saldo-cuenta").innerHTML = "$0"
        return;
    }    
}

function esMenorLimiteExt (valor) {
    return (valor <= limiteExtraccion) ? true : false
}

function esMenorSaldoDisp (valor) {
    return (valor <= saldoCuenta) ? true : false
}

function billetesCienOk (valor) {
    return ((valor % 100) == 0) ? true : false
}

function obtenerCantDinero(tipo) { //es una tarea que se repite para extraer, depositar, transferir y cambiar el límite. 
    
    if(!esAutorizado) {return;}

    var valorRecibido = 0;
    if(tipo == "extraer") {
        valorRecibido = prompt("Cuanto dinero quieres extraer?");
    } else if(tipo == "depositar") {
        valorRecibido = prompt("Cuanto dinero quieres depositar?");
    } else if(tipo == "limite") {
        valorRecibido = prompt("Cuál será tu nuevo límite de extracción?");
    } else if (tipo == "transferir") {
        valorRecibido = prompt("Ingresa el monto de dinero a tranferir:");
    } else {
        alert("El sistema no está funcionando correctamente");
    }

    if (valorRecibido == null || valorRecibido == ""){
        if(tipo == "limite") {
            return limiteExtraccion; // mantiene el mismo límite de extracción.
        }
        return 0;
    }

    var valor = parseInt(valorRecibido); //lo intento convertir a número al string recibido del input prompt.

    //Compruebo si es un valor numérico 
    if (isNaN(valor)) { 
        //entonces (no es numero) devuelvo un valor sin cambios que no afecte al funcionamiento de las funciones. 
        if(tipo == "limite") {
            return limiteExtraccion; // mantiene el mismo límite de extracción.
        }
        return 0; // hace que al sumar o restar 0, el saldo no cambie. En transferir pregunto si el valor es distinto de 0 para continuar.
    } else if(valor <= 0) { 
        //(Si era un número) devuelvo el valor si es distinto de cero. 
        alert("Ingresaste $0, por lo tanto no se registrará. \nGracias.");
        if(tipo == "limite") {
            return limiteExtraccion;
        }
        return 0;
    } else {
        return valor;
    }
}

//Funciones que actualizan el valor de las variables en el HTML
function cargarNombreEnPantalla() {
    if(!esAutorizado) {return;}
    document.getElementById("nombre").innerHTML = "Bienvenido/a " + nombreUsuario;
}

function actualizarSaldoEnPantalla() {
    if(!esAutorizado) {return;}
    document.getElementById("saldo-cuenta").innerHTML = "$" + saldoCuenta;
}

function actualizarLimiteEnPantalla() {
    if(!esAutorizado) {return;}
    document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es: $" + limiteExtraccion;
}