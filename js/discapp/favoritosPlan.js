
// Atributos dinamicos de la Página
var listaFavPlan = [], listaFiltroFavPlan = [], indexFavPlan = [];

jQuery(document).ready(function () {
    
    jQuery('#btnCompletaFavPlan').hide();
    
    if (!formControl.isOpenFavoritosPlan()) {
        formControl.openFavoritosPlan(); // Abrio Formulario de Favoritos
        
        jQuery(document).on('click','.btn-rev-plan', function () {
            // Determinando el Contenedor del Boton
            var obj0 = jQuery(this).parents().get(2); 
            var index = obj0.value; // Obteniendo su Index
            var planSelected =  listaFiltroFavPlan[index];

            if (agenda.deletePlan(planSelected[0])) {
                limpiarListaFavoritoPOS(); listaFavPlan.splice(indexFavPlan[index],1);
                listaFiltroFavPlan = listaFavPlan; indexFavPlan = [];
                
                for (var index = 0; index < listaFavPlan.length; index++) {
                    indexFavPlan.push(index);
                } // Cargando index de la Lista Completa
                
                cargarFavoritoPOS(listaFiltroFavPlan);
                jQuery('#btnCompletaFavPlan').hide(); // Ocultando Boton
                discApp.showMessage('La oferta fue removida de la lista de favoritos');
            }

            else {
                discApp.showMessage('La oferta no pudo ser removida de la lista de favoritos');
            }
        });
        
        jQuery(document).on('click','.btn-comp-fav-plan', function () {
            // Determinando el Contenedor del Boton
            var obj0 = jQuery(this).parents().get(2); 
            var index = obj0.value; // Obteniendo su Index
            var planSelected =  listaOfertasFiltro[index];
            window.plugins.socialsharing.share(getFavoritoCompartirPOS(planSelected),'Oferta enviada desde DiscApp');
        });
    }
    
    jQuery("#btnFiltroFavPlan").click(function () {
        aplicarFiltroFavoritoPOS(jQuery("#txtFiltroFavPlan").val().trim()); 
    });

    jQuery("#btnCompletaFavPlan").click(function () {
        limpiarListaFavoritoPOS(); cargarFavoritoPOS(listaFavPlan);
        listaFiltroFavPlan = listaFavPlan; jQuery('#btnCompletaFavPlan').hide();
    });
    
    listaFavPlan = agenda.getFavoritosPlan();
    listaFiltroFavPlan = listaFavPlan;
    
    for (var index = 0; index < listaFavPlan.length; index++) {
        indexFavPlan.push(index);
    } // Cargando index de la Lista Completa
    
    cargarFavoritoPOS(listaFavPlan);
});

// Nos permite aplicar el Filtro al DataSet en el Formulario 
function aplicarFiltroFavoritoPOS(patronFiltro) {
    indexFavPlan = []; // Index de Listado General de Favoritos
    
    if (patronFiltro.length !== 0) {
        limpiarListaFavoritoPOS(); // Limpiamos la Lista

        patronFiltro = patronFiltro.toUpperCase();

        for (var index = 0; index < listaFavPlan.length; index++) {
            if (isFiltrableFavoritoOfertaPOS(listaFavPlan[index],patronFiltro)) {
                listaFiltroFavPlan.push(listaFavPlan[index]);
                indexFavPlan.push(index);
            }
        }

        if (listaFiltroFavPlan.length === 0) {
            jQuery("#etiDataFiltro").html(message.datosCargados(0,listaFavPlan.length));
            discApp.showMessage(message.sinOfertasPorFiltro());
        } // No se encontraron Ofertas con patrón Digitado

        else {
            cargarFavoritoPOS(listaFiltroFavPlan);
        }
        
        jQuery('#btnCompletaFavPlan').show();
    } // Se ha digitado Datos para realizar Filtro
    
    else {
        discApp.showMessage(message.sinDatosFiltro());
    } // No se ha digitado Datos para realizar Filtro
};

// Permite Limpiar la Lista del Formulario
function limpiarListaFavoritoPOS() {
    jQuery(".liRemove").remove(); listaFiltroFavPlan = [];
};

// Cargando datos del DataSet en la Lista del Formulario
function cargarFavoritoPOS(listaDatos) {
    for (var index = 0; index < listaDatos.length; index++) {
        var item = listaDatos[index]; // Cargando elemento de la Lista
        jQuery("#listaFavPlan").append(crearComponentFavoritoPOS(item,index));
    } // Insertando componentes en la Lista
    
    jQuery("#etiFiltroFavPlan").html(message.datosCargados(listaDatos.length,listaFavPlan.length)); 
    discApp.adjustFontSizeClass('.compFiltro');
};

function getFavoritoCompartirPOS(item) {
    var compartir = 'La información fue compartida desde app móvil DiscApp';
    compartir += '\nOferta del Plan Obligatorio de Salud\n';
    compartir += 'Grupo de Servicio: ' + item[3] + '\nServicio: ' + item[4]; 
    
    return compartir; // Retornando el Mensaje a Compatir
};

function crearComponentFavoritoPOS(item, index) {
    var incluido; // Variable que determina el tipo de Oferta
    
    if (item[2] === 'S') {
        incluido = '<b>La oferta: </b>pertenece al Plan Obligatorio de Salud';
    }
    
    else {
        incluido = '<b>La oferta: </b>no pertenece al Plan Obligatorio de Salud';
    }
    
    var nuevaFila = "<li class='list-group-item liRemove compSmall compFiltro'>";
    nuevaFila += "<p align='justify'><b>Identificador de oferta de salud: ";
    nuevaFila += (index + 1) + "</b><br>" + incluido + "</p></li>";
    nuevaFila += "<li value='" + index + "' class='list-group-item liRemove'>";
    nuevaFila += "<p class='compSmall compFiltro' align='justify'><b>Grupo de servicios:</b>";
    nuevaFila += " " + item[3] + "<br><b>Servicio:</b> " + item[4];
    nuevaFila += "<br><b>Descripción:</b> " + item[5] + "</p>";
    nuevaFila += "<div class='btn-group btn-group-justified'><div class='btn-group'>";
    nuevaFila += "<button type='button' class='btn btn-primary btn-rev-plan compSmall compFiltro'>";
    nuevaFila += "Remover de favorito</button></div><div class='btn-group'><button type";
    nuevaFila += "='button' class='btn btn-primary btn-comp-fav-plan compSmall compFiltro'>";
    nuevaFila += "Compartir la oferta</button></div></div></li>";
    
    return nuevaFila; // Retornando componente para la Lista
};

function isFiltrableFavoritoOfertaPOS(item, datoFiltro) {
    var arrayFiltro = datoFiltro.split(" "), index = 0, filtrable = false;
    
    while (!filtrable && (index < arrayFiltro.length )) {
        filtrable = applyFilterFavoritoOfertaPOS(item,arrayFiltro[index]);
        if (!filtrable) {index++;} // El dato no se filtra por lo Digitado
    }
    
    return filtrable; // Retornando el valor si es Filtrable
};

function applyFilterFavoritoOfertaPOS(item, patronFiltro) {
    if ((item[3].toUpperCase()).indexOf(patronFiltro) !== -1) {
        return true; 
    } // Filtro por Nombre de Oferta
    
    if ((item[4].toUpperCase()).indexOf(patronFiltro) !== -1) {
        return true; 
    } // Filtro por Entidad de Oferta
    
    if ((item[5].toUpperCase()).indexOf(patronFiltro) !== -1) {
        return true; 
    } // Filtro por Departamento de Oferta
    
    return false; // No hay como Filtrar
};