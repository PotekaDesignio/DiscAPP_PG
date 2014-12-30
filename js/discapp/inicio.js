
$(document).ready(function () {
    
    if (discApp.isDatosOfertasCargados()) {
        $('#btnReload').hide(); // Ocultando boton de Navegación
        var reload = 'Toda la información de las ofertas, estan';
        reload += ' cargadas completamente en la aplicación';
        $('#etiReload').html(reload);
    }
    
    $('#btnReload').click(function () {
        discApp.insertComponent('estadoDatos.html','index-content');
        discApp.adjustFontSizeClass('.compSmall'); discApp.addBackPage('estadoDatos.html');
    });

    $('#btnAcerca').click(function () {
        discApp.insertComponent('acerca-de.html', 'index-content'); discApp.adjustFontSizeClass('.compSmall');
        discApp.adjustFontSizeClass('.compBig'); discApp.addBackPage('acerca-de.html');
    });
});