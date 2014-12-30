
// Atributos dinamicos de la Página
var listaOfertas = [], listaOfertasFiltro = [];

jQuery(document).ready(function () {
    
    jQuery('#btnCompletaPlan').hide(); jQuery('#etiPlan').focus();
    
    if (!formControl.isOpenPlanObligatorio()) {
        formControl.openPlanObligatorio(); // Abrio Formulario de Plan
        
        jQuery(document).on('click','.btn-fav-plan', function () {
            // Determinando el Contenedor del Boton
            var obj0 = jQuery(this).parents().get(2); 
            var index = obj0.value; // Obteniendo su Index
            var planSelected =  listaOfertasFiltro[index]; 

            if (agenda.insertPlan(planSelected)) {
                discApp.showMessage('La oferta del Plan Obligatorio de Salud fue agregada a la lista de favoritos');
            }

            else {
                discApp.showMessage('La oferta del Plan Obligatorio de Salud no pudo ser agregada a la lista de favoritos');
            }
        });
        
        jQuery(document).on('click','.btn-comp-plan', function () {
            // Determinando el Contenedor del Boton
            var obj0 = jQuery(this).parents().get(2); 
            var index = obj0.value; // Obteniendo su Index
            var planSelected =  listaOfertasFiltro[index];
            window.plugins.socialsharing.share(getCompartirPOS(planSelected),'Oferta enviada desde DiscApp');
        });
    }

    jQuery("#btnFiltroPlan").click(function () {
        aplicarFiltroPOS(jQuery("#txtFiltroPlan").val().trim()); 
    });

    jQuery("#btnCompletaPlan").click(function () {
        limpiarListaPOS(); cargarOfertasPOS(listaOfertas);
        listaOfertasFiltro = listaOfertas; jQuery('#btnCompletaPlan').hide();
    });
    
    listaOfertas = discApp.getListaPlanObligatorio();
    listaOfertasFiltro = listaOfertas; cargarOfertasPOS(listaOfertas);
});

// Nos permite aplicar el Filtro al DataSet en el Formulario 
function aplicarFiltroPOS(patronFiltro) {
    if (patronFiltro.length !== 0) {
        limpiarListaPOS(); // Limpiamos la Lista
        patronFiltro = patronFiltro.toUpperCase();

        for (var index = 0; index < listaOfertas.length; index++) {
            if (isFiltrableOfertaPOS(listaOfertas[index],patronFiltro)) {
                listaOfertasFiltro.push(listaOfertas[index]);
            }
        }

        if (listaOfertasFiltro.length === 0) {
            jQuery("#etiDataFiltro").html(message.datosCargados(0,listaOfertas.length));
            discApp.showMessage(message.sinOfertasPorFiltro());
        } // No se encontraron Ofertas con patrón Digitado

        else {
            cargarOfertasPOS(listaOfertasFiltro);
        }
        
        jQuery('#btnCompletaPlan').show();
    } // Se ha digitado Datos para realizar Filtro
    
    else {
        discApp.showMessage(message.sinDatosFiltro());
    } // No se ha digitado Datos para realizar Filtro
};

// Permite Limpiar la Lista del Formulario
function limpiarListaPOS() {
    jQuery(".liRemove").remove(); listaOfertasFiltro = [];
};

// Cargando datos del DataSet en la Lista del Formulario
function cargarOfertasPOS(listaDatos) {
    for (var index = 0; index < listaDatos.length; index++) {
        var item = listaDatos[index]; // Cargando elemento de la Lista
        jQuery("#listaInformacion").append(crearComponentPOS(item,index));
    } // Insertando componentes en la Lista
    
    jQuery("#etiDataFiltro").html(message.datosCargados(listaDatos.length,listaOfertas.length)); 
    discApp.adjustFontSizeClass('.compFiltro');
};

function getCompartirPOS(item) {
    var compartir = 'Esta oferta fue compartida desde app móvil DiscApp\n';
    compartir += 'Oferta del Plan Obligatorio de Salud\n';
    compartir += 'Grupo de Servicio: ' + item.gruposervicios + '\n';
    compartir += 'Servicio: ' + item.servicio + '\n\n'; 
    
    return compartir; // Retornando el Mensaje a Compatir
};

function crearComponentPOS(item, index) {
    var incluido; // Variable que determina el tipo de Oferta
    
    if (item.incluidopos === 'S') {
        incluido = '<b>La oferta: </b>pertenece al Plan Obligatorio de Salud';
    }
    
    else {
        incluido = '<b>La oferta: </b>no pertenece al Plan Obligatorio de Salud';
    }
    
    var nuevaFila = "<li class='list-group-item liRemove compSmall compFiltro'>";
    nuevaFila += "<p align='justify'><b>Identificador de oferta de Salud: ";
    nuevaFila += (index + 1) + "</b><br>" + incluido + "</p></li>";
    nuevaFila += "<li value='" + index + "' class='list-group-item liRemove'>";
    nuevaFila += "<p class='compSmall compFiltro' align='justify'><b>Grupo de servicios:</b>";
    nuevaFila += " " + item.gruposervicios + "<br><b>Servicio:</b> " + item.servicio;
    nuevaFila += "<br><b>Descripción:</b> " + item.descripcion + "</p>";
    nuevaFila += "<div class='btn-group btn-group-justified'><div class='btn-group'>";
    nuevaFila += "<button type='button' class='btn btn-primary btn-fav-plan compSmall compFiltro'>";
    nuevaFila += "Agregar a favoritos</button></div><div class='btn-group'><button type='button'";
    nuevaFila += " class='btn btn-primary btn-comp-plan compSmall compFiltro'>Compartir la oferta";
    nuevaFila += "</button></div></div></li>";
    
    return nuevaFila; // Retornando componente para la Lista
};

function isFiltrableOfertaPOS(item, datoFiltro) {
    var arrayFiltro = datoFiltro.split(" "), index = 0, filtrable = false;
    
    while (!filtrable && (index < arrayFiltro.length )) {
        filtrable = applyFilterOfertaPOS(item,arrayFiltro[index]);
        if (!filtrable) {index++;} // El dato no se filtra por lo Digitado
    }
    
    return filtrable; // Retornando el valor si es Filtrable
};

function applyFilterOfertaPOS(item, patronFiltro) {
    if ((item.gruposervicios.toUpperCase()).indexOf(patronFiltro) !== -1) {
        return true; 
    } // Filtro por Nombre de Oferta
    
    if ((item.servicio.toUpperCase()).indexOf(patronFiltro) !== -1) {
        return true; 
    } // Filtro por Entidad de Oferta
    
    if ((item.descripcion.toUpperCase()).indexOf(patronFiltro) !== -1) {
        return true; 
    } // Filtro por Departamento de Oferta
    
    return false; // No hay como Filtrar
};