
// Funciones de los Procesos ejecutados

var planSuccess = function () {
    var mensajeAlert = message.alertOfertaSuccess("Plan Obligatorio de Salud");
    tools.processSuccess('alertOfertaPlan','divAlertOfertaPlan',mensajeAlert);
};

var planWaiting = function () {
    var mensajeAlert = message.alertOfertaWaiting("Plan Obligatorio de Salud");
    tools.processWaiting('alertOfertaPlan','divAlertOfertaPlan',mensajeAlert);
};

var planError = function () {
    var mensajeAlert = message.alertOfertaError("Plan Obligatorio de Salud");
    tools.processError('alertOfertaPlan','divAlertOfertaPlan',mensajeAlert);
};

var saludSuccess = function () {
    var mensajeAlert = message.alertOfertaSuccess("Servicios de Salud");
    tools.processSuccess('alertOfertaSalud','divAlertOfertaSalud',mensajeAlert);
};

var saludWaiting = function () {
    var mensajeAlert = message.alertOfertaWaiting("Servicios de Salud");
    tools.processWaiting('alertOfertaSalud','divAlertOfertaSalud',mensajeAlert);
};

var saludError = function () {
    var mensajeAlert = message.alertOfertaError("Servicios de Salud");
    tools.processError('alertOfertaSalud','divAlertOfertaSalud',mensajeAlert);
};

var trabajoWaiting = function () {
    var mensajeAlert = message.alertOfertaWaiting("Trabajo");
    tools.processWaiting('alertOfertaEmpleo','divAlertOfertaEmpleo',mensajeAlert);
};

var trabajoSuccess = function () {
    var mensajeAlert = message.alertOfertaSuccess("Trabajo");
    tools.processSuccess('alertOfertaEmpleo','divAlertOfertaEmpleo',mensajeAlert);
};

var trabajoError = function () {
    var mensajeAlert = message.alertOfertaError("Trabajo");
    tools.processError('alertOfertaEmpleo','divAlertOfertaEmpleo',mensajeAlert);
};

var educacionWaiting = function () {
    var mensajeAlert = message.alertOfertaWaiting("Educación");
    tools.processWaiting('alertOfertaEducacion','divAlertOfertaEducacion',mensajeAlert);
};

var educacionSuccess = function () {
    var mensajeAlert = message.alertOfertaSuccess("Educación");
    tools.processSuccess('alertOfertaEducacion','divAlertOfertaEducacion',mensajeAlert);
};

var educacionError = function () {
    var mensajeAlert = message.alertOfertaError("Educación");
    tools.processError('alertOfertaEducacion','divAlertOfertaEducacion',mensajeAlert);
};

// Metodos para procesos en la Página

function cargarDatosOferta() {
    // Cargando Datos del Plan Obligatorio de Salud en la Aplicación
    if (discApp.isPlanObligatorioCargando() === 0) {
        planError(); 
    }
    
    else {
        if (discApp.isPlanObligatorioCargando() === 2) {
            planWaiting();
        }
        
        else if (discApp.isPlanObligatorioCargando() === 3) {
            planSuccess();
        }
    }
    
    // Cargando Datos de Trabajo en la Aplicación
    discApp.setInformacionCargandoDatos(1); // Lista de Trabajo
    if (discApp.isOfertasCargando() === 0) {
        trabajoError(); 
    }

    else {
        if (discApp.isOfertasCargando() === 2)  {
            trabajoWaiting();
        }
        
        else if (discApp.isOfertasCargando() === 3) {
            trabajoSuccess();
        }
    }
    
    // Cargando Datos de Servicios de Salud en la Aplicación
    discApp.setInformacionCargandoDatos(2); // Lista de Servicios de Salud
    if (discApp.isOfertasCargando() === 0) {
        saludError(); 
    }

    else {
        if (discApp.isOfertasCargando() === 2)  {
            saludWaiting();
        }
        
        else if (discApp.isOfertasCargando() === 3) {
            saludSuccess();
        }
    }
    
    // Cargando Datos de Servicios de Salud en la Aplicación
    discApp.setInformacionCargandoDatos(3); // Lista de Servicios de Salud
    if (discApp.isOfertasCargando() === 0) {
        educacionError(); 
    }

    else {
        if (discApp.isOfertasCargando() === 2)  {
            educacionWaiting();
        }
        
        else if (discApp.isOfertasCargando() === 3) {
            educacionSuccess();
        }
    }
}

$(document).ready(function () {
    cargarDatosOferta();
});