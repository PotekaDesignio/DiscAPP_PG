
jQuery(document).ready(function () {
    
    // Establecer eventos de Botones de las Ofertas
    
    jQuery("#btnCloseAlert").click(function () {
        jQuery('#dialogMessage').modal('hide');
    });
    
    jQuery('#btnPlan').click(function () {
        if (discApp.getListaPlanObligatorio().length > 0) {
            insertComponent('servicsaludpcd.html');
            discApp.adjustFontSizeListForm(); discApp.hideCargando();
        } // Han cargado Correctamente Plan Obligatorio

        else {
            discApp.showCargando(); discApp.setStatusData(0,1);
            discApp.insertComponent('cargarDatos.html','index-content');
            discApp.adjustFontSizeListForm(); 
        }
    });
    
    jQuery('#btnTrabajo').click(function () {
        discApp.showCargando(); setTimeout('cargarDatosEmpleo()',1000);
    });
    
    jQuery('#btnSalud').click(function () {
        discApp.showCargando(); setTimeout('cargarDatosSalud()',1000);
    });
    
    jQuery('#btnEducacion').click(function () {
        discApp.showCargando(); setTimeout('cargarDatosEducacion()',1000);
    });
});
    
function cargarDatosOfertas(tipoOferta, nameOferta) {
    discApp.setInformacionCargandoDatos(tipoOferta);

    if (discApp.getListaDeOfertas().length > 0) {
        discApp.setTypeOferta(nameOferta);
        insertComponent('ofertainstpcd.html');
        discApp.adjustFontSizeListForm(); discApp.hideCargando();
    } // Han cargado Correctamente Trabajo

    else {
        discApp.setStatusData(tipoOferta,1);
        discApp.insertComponent('cargarDatos.html','index-content');
        discApp.adjustFontSizeListForm(); 
    }
};

function cargarDatosSalud() {
    cargarDatosOfertas(2,'Servicio de Salud');
};

function cargarDatosEmpleo() {
    cargarDatosOfertas(1,'Trabajo');
};

function cargarDatosEducacion() {
    cargarDatosOfertas(3,'Educación');
};