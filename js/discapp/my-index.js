
// Atributos del Script index.js

var discApp = new DiscApp(), tools = new IndexTools();
var message = new Message(), agenda = new Agenda();
var formControl = new FormControl();

// Maneja el evento del botón "Atrás"
function onBackKeyDown() {
    if (discApp.getContadorPage() < 0) {
        if (discApp.getContadorPage() === -1) {
            insertComponent('inicio.html'); jQuery('#footerApp').show();
            discApp.adjustFontSizeListForm(); discApp.decreaseContadorPage();
            jQuery('#index-content').show(); jQuery('#mapa-content').hide();
            jQuery('#groupOne').show(); jQuery('#groupTwo').show();
            discApp.posicionarContent(); discApp.hideCargando();
        }
        
        else {
            navigator.app.exitApp();
        }
    }
    
    else {
        insertComponent(discApp.getBackPage()); jQuery('#footerApp').show(); 
        discApp.adjustFontSizeListForm(); discApp.decreaseContadorPage();
        jQuery('#index-content').show(); jQuery('#mapa-content').hide();
        jQuery('#groupOne').show(); jQuery('#groupTwo').show();
        discApp.posicionarContent(); discApp.hideCargando();
    }
}

jQuery(document).ready(function () {
    // Cargando Pagina de Inicio en la Aplicación
    insertComponent('inicio.html'); agenda.createTable(); agenda.cargarFavoritosPlan();
    
    // Configurando Fuente de la Aplicación
    discApp.loadFontSize(); discApp.adjustFontSizeDefault(); discApp.posicionarContent();
    
    // Establecer eventos de Botones del Header
    discApp.eventClick('btnInicio',cargarFormularioInicio);
    discApp.eventClick('btnOfertas',cargarFormularioOfertas);
    discApp.eventClick('btnFavoritos', cargarFormularioFavoritos);
    discApp.eventClick('btnAyuda', cargarFormularioAyuda);
    
    //Establecer eventos de Botones del Modal
    discApp.eventClick('btnMapaOferta',cargarMapaOferta);
    discApp.eventClick('btnCloseOferta',cerrarDialogOfertas);
    
    // Establecer eventos de Botones del Footer
    discApp.eventClick('btnAumentarFont',increaseFontSize);
    discApp.eventClick('btnDisminuirFont',decreaseFontSize);
    
    //Estableciendo Geolocalización
    //mapa.geolocalizar();
    jQuery('#btnInicio').focus();
    
    jQuery('#btnCloseAlert').click(function () {
        jQuery('#dialogMessage').modal('hide');
    });
    
    //document.addEventListener('deviceready', onDeviceReady, false);
    document.addEventListener('backbutton', onBackKeyDown, false);
});

// Eventos de la clase Index

var decreaseFontSize =  function () {
    discApp.decreaseFontSize(); discApp.posicionarContent();
};

var increaseFontSize = function () {
    discApp.increaseFontSize(); discApp.posicionarContent();
};

var cargarFormularioInicio = function () {
    insertComponent('inicio.html');  jQuery('#footerApp').show();
    discApp.adjustFontSizeListForm(); discApp.addBackPage('inicio.html');
    discApp.posicionarContent(); jQuery('#nameApp').focus();
};

var cargarFormularioOfertas = function () {
    insertComponent('selectorOfertas.html'); jQuery('#footerApp').show();
    discApp.adjustFontSizeListForm(); discApp.addBackPage('selectorOfertas.html');
    discApp.posicionarContent(); jQuery('#btnPlan').focus();
};

var cargarFormularioFavoritos = function () {
    insertComponent('favoritos.html'); jQuery('#footerApp').show();
    discApp.adjustFontSizeListForm(); discApp.addBackPage('favoritos.html');
    discApp.posicionarContent(); jQuery('#btnPlan').focus();
};

var cargarFormularioAyuda = function () {
    insertComponent('ayuda.html'); jQuery('#footerApp').show();
    discApp.adjustFontSizeClass('.compAyuda'); discApp.posicionarContent();
    discApp.addBackPage('ayuda.html');
};

var cargarMapaOferta = function () {
    // Visualizando y Ocultando componentes
    discApp.showCargando(); jQuery('#dialogOferta').modal('hide'); 
    jQuery('#index-content').hide(); jQuery('#mapa-content').show();
    jQuery('#groupOne').hide(); jQuery('#groupTwo').hide(); 
    
    discApp.insertComponent('mapa.html','mapa-content'); 
    discApp.adjustFontSizeClass('.compMapSmall'); discApp.posicionarContent();
};

var cerrarDialogOfertas = function () {
    jQuery('#dialogOferta').modal('hide'); 
};

// Metodos del Script index.js

function insertComponent(url) {
    discApp.insertComponent(url,'index-content'); 
};