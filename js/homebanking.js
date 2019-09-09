//Declaración de variables
var nombreUsuario = "Jana Ferrer";
var saldoCuenta = 100000;
var limiteExtraccion = 5000;


//Ejecución de las funciones que actualizan los valores de las variables en el HTML.
window.onload = function() {
    iniciarSesion(); //TODO: ultimo paso d ela guia 3.
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
    var dineroVerif = obtenerCantDinero("extraer");
    var saldoAnterior = saldoCuenta;
    if(billetesCienOk(dineroVerif)) {
        if(esMenorSaldoDisp(dineroVerif)) {
            if(esMenorLimiteExt(dineroVerif)) {
                restarDinero(dineroVerif);
                if(saldoAnterior != saldoCuenta) {
                    actualizarSaldoEnPantalla();
                    alert("Has retirado: $" + dineroVerif + "\n" +
                        "Saldo anterior: $" + saldoAnterior + "\n" +
                        "Saldo actual: $" + saldoCuenta);
                }
            } else {
                alert("El movimiento supera tu límite de extracción. \n Gracias.");
            }
        } else {
            alert("No tienes saldo suficiente en tu cuenta. \n Gracias.");
        }
    } else {
        alert("Solo puedes extraer billetes de 100. \n Gracias.");
    }
}

function depositarDinero() {
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
    var serviciosPorPagar = [["Agua", 350], ["Luz", 210], ["Internet", 570], ["Teléfono", 425]];
    var opcionServicio = prompt("Ingreses el número que corresponda con el servicio que quieres pagar:\n1-Agua\n2-Luz\n3-Internet\n4-Teléfono");

    var opcion = parseInt(opcionServicio); 

    //Compruebo si es un valor numérico 
    if (isNaN(opcion)) { 
        //entonces (no es numero) devuelvo un mensaje de error. 
        alert("Ingresa un número válido por favor. \n Gracias.");
        return;
    } else if((opcion > 4) || (opcion < 1)) { 
        //(Si era un número) devuelvo el valor si es distinto de cero. 
        alert("Ingresaste una opción no válida. \n Gracias.");
        return;
    }
    if(esMenorSaldoDisp(serviciosPorPagar[opcion-1] [1])){
        var saldoAnterior = saldoCuenta;
        restarDinero(serviciosPorPagar[opcion-1] [1]);
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
    //TODO: voy a utilizar switch en esta funcion 
}

function iniciarSesion() {
    //TODO: esta función debe ejecutarse antes que cualquier otra en el arranque
}

function esMenorLimiteExt (valor) {
    if (valor < limiteExtraccion) {
        return true;
    } else {
        return false;
    }
}

function esMenorSaldoDisp (valor) {
    if (valor < saldoCuenta) {
        return true;
    } else {
        return false;
    }
}

function billetesCienOk (valor) {
    if ((valor % 100) == 0) {
        return true;
    } else {
        return false;
    }
}

function obtenerCantDinero(tipo) {
    var valorRecibido = 0;
    if(tipo == "extraer") {
        valorRecibido = prompt("Cuanto dinero quieres extraer?");
    } else if(tipo == "depositar") {
        valorRecibido = prompt("Cuanto dinero quieres depositar?");
    } else if(tipo == "limite") {
        valorRecibido = prompt("Cuál será tu nuevo límite de extracción?");
    } else {
        alert("El sistema no está funcionando correctamente");
    }

    var valor = parseInt(valorRecibido); 

    //Compruebo si es un valor numérico 
    if (isNaN(valor)) { 
        //entonces (no es numero) devuelvo un mensaje de error. 
        alert("Ingresa un número válido por favor. \n Gracias.");
        if(tipo == "limite") {
            return limiteExtraccion;
        }
        return 0;
    } else if(valor <= 0) { 
        //(Si era un número) devuelvo el valor si es distinto de cero. 
        alert("Ingresaste $0, por lo tanto no se registrará. \n Gracias.");
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
    document.getElementById("nombre").innerHTML = "Bienvenido/a " + nombreUsuario;
}

function actualizarSaldoEnPantalla() {
    document.getElementById("saldo-cuenta").innerHTML = "$" + saldoCuenta;
}

function actualizarLimiteEnPantalla() {
    document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es: $" + limiteExtraccion;
}