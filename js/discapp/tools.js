
// Clase Message del Script tools.js
    
function Message() {

    // Este método retorna el mensaje cuando la Aplicacíon no
    // se encuentra conectada a Internet.

    Message.prototype.offline = function () {
        var mensaje = "No se pudo cargar datos de la oferta. Posibles";
        mensaje += " causas:<br>1. Se ha caido la conexión a Intenet ";
        mensaje += "en el dispositivo.<br><br>Posible soluciones: rev";
        mensaje += "ise si el dispositivo esta conectado a Internet.";
        return mensaje; // Retornando mensaje
    };
    
    // Este método nos retorna el mensaje para la Notificación, cuando
    // no ha digitado texto para Buscar Ofertas en la Aplicación.
    
    Message.prototype.sinDatosFiltro = function () {
        var mensaje = "No ha digitado texto para realizar la consulta por temas de las ofertas establecidas";
        return mensaje; // Retornando mensaje
    };
    
    // Este método nos retorna el mensaje para la Notificación, cuando
    // no se ha encontrado Ofertas por Filtro en la Aplicación.
    
    Message.prototype.sinOfertasPorFiltro = function () {
        var mensaje = "No existen ofertas con los temas digitado en la aplicación";
        return mensaje; // Retornando mensaje
    };
    
    // 
    
    Message.prototype.datosCargados = function (cargados, total) {
        var textoFiltro = "Se han cargado " + cargados + " ofertas";
        textoFiltro += " de las " + total + " ofertas existentes";
        return textoFiltro; // Retornando mensaje
    };
    
    Message.prototype.sinDatosCargados = function (typeOferta) {
        var mensaje = "Actualmente no se han cargado los datos de las";
        mensaje += " ofertas de " + typeOferta +  " en la Aplicación.<br>";
        mensaje += "<br>Por favor, ingrese a la página de Inicio para";
        mensaje += " visualizar el estado de los datos de las ofertas.";
        return mensaje; // Retornando mensaje
    };
    
    // Este método nos retorna el mensaje para las Alertas, cuando
    // los datos Ofertas se han cargado correctamente en la Aplicación.
    
    Message.prototype.alertOfertaWaiting = function (oferta) {
        var mensaje = "Cargando los datos de las ofertas de " + oferta; 
        mensaje += " en la Aplicación, por favor espere";
        
        return mensaje; // Retornando mensaje
    };
    
    // Este método nos retorna el mensaje para las Alertas, cuando
    // los datos Ofertas se han cargado correctamente en la Aplicación.
    
    Message.prototype.alertOfertaSuccess = function (oferta) {
        var mensaje = "Los datos de las ofertas de " + oferta+ " han sido cargados con éxito en la Aplicación";
        
        return mensaje; // Retornando mensaje
    };
    
    // Este método nos retorna el mensaje para las Alertas, cuando los
    // datos Ofertas no se han cargado correctamente en la Aplicación.
    
    Message.prototype.alertOfertaError = function (oferta) {
        var mensaje = "Los datos de las ofertas de " + oferta + " no han sido cargados en la Aplicación";
        
        return mensaje; // Retornando mensaje
    };
};

// Clase IndexTools del Script tools.js

function IndexTools() {
        
    // Este método se ejecuta cuando hay exito en la carga de Datos.

    IndexTools.prototype.processWaiting = function (idAlert, idAlertDiv, message) {
        jQuery('#' + idAlert).html(message); // Cambiando Texto
        jQuery('#' + idAlertDiv).removeClass('alert-danger');
        jQuery('#' + idAlertDiv).addClass('alert-info');
    };
        
    // Este método se ejecuta cuando hay exito en la carga de Datos.

    IndexTools.prototype.processSuccess = function (idAlert, idAlertDiv, message) {
        jQuery('#' + idAlert).html(message); // Cambiando Texto
        jQuery('#' + idAlertDiv).removeClass('alert-info');
        jQuery('#' + idAlertDiv).removeClass('alert-danger');
        jQuery('#' + idAlertDiv).addClass('alert-success');
    };
    
    // Este método se ejecuta cuando hay error en la carga de Datos.

    IndexTools.prototype.processError = function (idAlert, idAlertDiv, message) {
        jQuery('#' + idAlert).html(message); // Cambiando Texto
        jQuery('#' + idAlertDiv).removeClass('alert-info');
        jQuery('#' + idAlertDiv).addClass('alert-danger');
    };

    // Este método se permite cargar Ofertas en la Aplicación.

    IndexTools.prototype.cargarDatosOferta = function (url, type, processSuccess, processError) {
        jQuery.ajax({
            type: "GET",
            url: url,
            contentType: "application/json; charset=utf-8",
            dataType: "jsonp",
            async: false,

            success: function (result) {
                discApp.setListaDeOfertas(type,result.d); 
                processSuccess(); // Accion correcta
            },

            error: function (jqXHR, status, error) {
                discApp.setStatusData(0,type); processError(); // Proceso de Error
            }
        });
    };
};

function ProcessImage() {
    
    var width, heigth; // Datos para el Tamaño Final de la Imagen
    
    function calcularNuevoValor(a, b, c) {
        return ((b * c) / a);
    };
    
    ProcessImage.prototype.calcularDimensiones = function (wImagen, hImagen, wComp, hComp) {
        width = wImagen; heigth = hImagen; // Asignando dimensiones de Imagen
        
        while (!((wComp >= width) && (hComp >= heigth))) {
            if (wComp < width) {
                heigth = calcularNuevoValor(width,wComp,heigth);
                width = wComp;
            } // Ajustando por Ancho de la Imagen
            
            else {
                width = calcularNuevoValor(heigth,hComp,width);
                heigth = hComp;
            } // Ajustando por Alto de la Imagen
        }
    };
    
    ProcessImage.prototype.getWidth = function () {
        return width;
    };
    
    ProcessImage.prototype.getHeigth = function () {
        return heigth;
    };
};