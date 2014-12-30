
// URL de los DataSet de Ofertas

var urlPlan = 'http://servicedatosabiertoscolombia.cloudapp.net/v1/Ministerio_de_Salud/servicsaludpcd1?$format=json';
var urlTrabajo = 'http://servicedatosabiertoscolombia.cloudapp.net/v1/Ministerio_de_Salud/ofertainstpcd1?$filter=sector=%27Trabajo%27&$format=json';
var urlEducacion = 'http://servicedatosabiertoscolombia.cloudapp.net/v1/Ministerio_de_Salud/ofertainstpcd1?$filter=sector=%27Educaci%C3%B3n%27&$format=json';
var urlSalud = 'http://servicedatosabiertoscolombia.cloudapp.net/v1/Ministerio_de_Salud/ofertainstpcd1?$filter=sector=%27Salud%27&$top=3000&$format=json';

function success (typeOferta) {
    var mensajeAlert = message.alertOfertaSuccess(typeOferta);
    tools.processSuccess('alertCargando','divAlertCargando',mensajeAlert);
    jQuery('#btnOpen').show(); discApp.hideCargando(); jQuery('#alertCargando').focus();
};

function waiting (typeOferta) {
    var mensajeAlert = message.alertOfertaWaiting(typeOferta);
    tools.processWaiting('alertCargando','divAlertCargando',mensajeAlert);
};

function error (typeOferta) {
    var mensajeAlert = message.alertOfertaError(typeOferta);
    tools.processError('alertCargando','divAlertCargando',mensajeAlert);
};

var planSuccess = function () {
    success('Plan Obligatorio de Salud');
};

var planError = function () {
    error('Plan Obligatorio de Salud');
};

var trabajoSuccess = function () {
    success('Trabajo');
};

var trabajoError = function () {
    error('Trabajo');
};

var saludSuccess = function () {
    success('Servicio de Salud');
};

var saludError = function () {
    error('Servicio de Salud');
};

var educacionSuccess = function () {
    success('Educación');
};

var educacionError = function () {
    error('Educación');
};

jQuery(document).ready(function () {
    
    jQuery('#btnOpen').hide(); jQuery('#alertCargando').focus();
    discApp.setInformacionCargandoDatos(discApp.getOfertaProcess());
    
    switch (discApp.getOfertaProcess()) {
        // Oferta del Plan Obligatorio
        case (0) :
            if (discApp.isPlanObligatorioCargando() === 1) {
                waiting('Plan Obligatorio de Salud'); discApp.setStatusData(0,2);
                tools.cargarDatosOferta(urlPlan,0,planSuccess,planError);
            }
            
            else {
                if (discApp.isPlanObligatorioCargando() === 2) {
                    waiting('Plan Obligatorio de Salud'); 
                }
                
                else if (discApp.isPlanObligatorioCargando() === 3) {
                    success('Plan Obligatorio de Salud');
                }
            }
        break;
        
        // Oferta de Trabajo
        case (1) :
            if (discApp.isOfertasCargando() === 1) {
                waiting('Trabajo'); discApp.setStatusData(1,2);
                tools.cargarDatosOferta(urlTrabajo,1,trabajoSuccess,trabajoError);
            }
            
            else {
                if (discApp.isOfertasCargando() === 2) {
                    waiting('Trabajo'); 
                }
                
                else if (discApp.isOfertasCargando() === 3) {
                    success('Trabajo');
                }
            }
        break;
        
        // Oferta de Salud
        case (2) :
            if (discApp.isOfertasCargando() === 1) {
                waiting('Servicio de Salud'); discApp.setStatusData(2,2);
                tools.cargarDatosOferta(urlSalud,2,saludSuccess,saludError);
            }
            
            else {
                if (discApp.isOfertasCargando() === 2) {
                    waiting('Servicio de Salud'); 
                }
                
                else if (discApp.isOfertasCargando() === 3) {
                    success('Servicio de Salud');
                }
            }
        break;
        
        // Oferta de Educación
        case (3) :
            if (discApp.isOfertasCargando() === 1) {
                waiting('Educación'); discApp.setStatusData(3,2);
                tools.cargarDatosOferta(urlEducacion,3,educacionSuccess,educacionError);
            }
            
            else {
                if (discApp.isOfertasCargando() === 2) {
                    waiting('Educación'); 
                }
                
                else if (discApp.isOfertasCargando() === 3) {
                    success('Educación');
                }
            }
        break;
    };
    
    jQuery('#btnOpen').click(function () {
        discApp.setInformacionCargandoDatos(discApp.getOfertaProcess());
         discApp.showCargando(); setTimeout('cargarDatosOfertaSeleccionada()',1000);
    });
});
    
function cargarDatosOfertaSeleccionada() {
    switch (discApp.getOfertaProcess()) {
        // Oferta del Plan Obligatorio
        case (0) :
            insertComponent('servicsaludpcd.html'); discApp.adjustFontSizeListForm();
        break;

        // Oferta del Trabajo
        case (1) :
            discApp.setTypeOferta('Trabajo'); insertComponent('ofertainstpcd.html');
            discApp.adjustFontSizeListForm();
        break;

        // Oferta del Salud
        case (2) :
            discApp.setTypeOferta('Servicio de Salud'); insertComponent('ofertainstpcd.html');
            discApp.adjustFontSizeListForm();
        break;

        // Oferta del Educación
        case (3) :
            discApp.setTypeOferta('Educación'); insertComponent('ofertainstpcd.html');
            discApp.adjustFontSizeListForm();
        break;
    }
    
    discApp.hideCargando();
}