
jQuery(document).ready(function () {
    
    // Cargando Favoritos de las Ofertas
    agenda.cargarFavoritosPlan(); agenda.cargarFavoritosOfertas();
    jQuery('#btnFavPlan').focus();
    
    jQuery('#btnFavPlan').click(function () {
        discApp.showCargando(); setTimeout('loadFavoritosPlan()',500);
    });
    
    jQuery('#btnFavOfertas').click(function () {
        discApp.showCargando(); setTimeout('loadFavoritosOferta()',500);
    });
});

function loadFavoritosPlan() {
    insertComponent('favoritosPlan.html'); discApp.adjustFontSizeListForm(); discApp.hideCargando();
};

function loadFavoritosOferta() {
    insertComponent('favoritosOfertas.html'); discApp.adjustFontSizeListForm(); discApp.hideCargando();
};