
// Atributos dinamicos de la Página
var listaFavOfertas = [], listaFavOfertasFiltro = [], indexFavOfertas = [];
var indexSelected, ofertaSelected;

jQuery(document).ready(function () {
    
    jQuery('#btnAgendaOferta').hide(); jQuery('#btnQuitarOferta').show();
    jQuery('#btnCompartirOferta').hide(); jQuery('#btnCompartirFavOferta').show();
    jQuery('#btnCompletaFavOferta').hide();
    
    if (!formControl.isOpenFavoritosOfertas()) {
        formControl.openFavoritosOfertas(); // Abrio Formulario de Favoritos
        
        jQuery(document).on('click','.btn-fav-oferta', function () {
            // Determinando el Contenedor del Boton
            var obj0 = jQuery(this).parents().get(0); 
            indexSelected = obj0.value; // Obteniendo su Index
            ofertaSelected =  listaFavOfertasFiltro[indexSelected];

            // Cargando los datos en el Dialog
            jQuery("#titleDetail").html("<b>" + ofertaSelected[5] + "</b>");
            jQuery("#txtInstitucionOferta").html(ofertaSelected[2]);
            jQuery("#areaDescripcionOferta").html(ofertaSelected[6]);
            jQuery("#txtUbicacionOferta").html(getFavoritoUbicacion(ofertaSelected));
            jQuery("#txtDireccionOferta").html(getFavoritoDireccion(ofertaSelected));
            jQuery("#txtAplicaDiscp").html(getFavoritoNoAplicaDiscapacidad(ofertaSelected));
            jQuery("#txtHorarioOferta").html(ofertaSelected[8]);
            jQuery("#txtVigenciaOferta").html(getFavoritoVigencia(ofertaSelected));
            jQuery("#txtRequisitosOferta").html(getFavoritoRequisitos(ofertaSelected));
            jQuery("#txtContactoOferta").html(getFavoritoContacto(ofertaSelected));

            mapa.insertar(getFavoritoAddressMap(ofertaSelected));

            jQuery('#dialogOferta').modal('show'); // Visualizamos Dialog
        });

        jQuery('#btnQuitarOferta').click(function () {
            jQuery('#dialogOferta').modal('hide'); // Ocultando Dialog Oferta

            if (agenda.deleteOfertas(ofertaSelected[0])) {
                limpiarListaFavoritoOfertas(); listaFavOfertas.splice(indexFavOfertas[indexSelected],1);
                listaFavOfertasFiltro = listaFavOfertas; indexFavOfertas = [];

                for (var index = 0; index < listaFavOfertas.length; index++) {
                    indexFavOfertas.push(index);
                } // Cargando index de la Lista Completa

                cargarFavoritoOfertas(listaFavOfertasFiltro);
                jQuery('#btnCompletaFavOferta').hide(); // Ocultando Boton
                discApp.showMessage('La oferta fue removida de la lista de favoritos');
            }

            else {
                discApp.showMessage('La oferta no pudo ser removida de la lista de favoritos');
            }
        });

        jQuery('#btnCompartirFavOferta').click(function () {
            window.plugins.socialsharing.share(getFavCompartir(ofertaSelected),'Oferta enviada desde DiscApp');
        });
    }

    jQuery("#btnFiltroFavOferta").click(function () {
        aplicarFiltroFavoritoOfertas(jQuery("#txtFiltroFavOferta").val().trim()); 
    });

    jQuery("#btnCompletaFavOferta").click(function () {
        limpiarListaFavoritoOfertas(); cargarFavoritoOfertas(listaFavOfertas);
        listaFavOfertasFiltro = listaFavOfertas; jQuery('#btnCompletaFavOferta').hide();
    });
    
    listaFavOfertas = agenda.getFavoritosOfertas();
    listaFavOfertasFiltro = listaFavOfertas; 
    
    for (var index = 0; index < listaFavOfertas.length; index++) {
        indexFavOfertas.push(index);
    } // Cargando index de la Lista Completa
    
    cargarFavoritoOfertas(listaFavOfertas); // Cargando Ofertas
});

// Nos permite aplicar el Filtro al DataSet en el Formulario 
function aplicarFiltroFavoritoOfertas(patronFiltro) {
    indexFavOfertas = []; // Index de Listado General de Favoritos
    
    if (patronFiltro.length !== 0) {
        limpiarListaFavoritoOfertas(); // Limpiamos la Lista

        patronFiltro = patronFiltro.toUpperCase();

        for (var index = 0; index < listaFavOfertas.length; index++) {
            if (isFiltrableFavoritoOferta(listaFavOfertas[index],patronFiltro)) {
                listaFavOfertasFiltro.push(listaFavOfertas[index]);
                indexFavOfertas.push(index);
            } // Determinando si la Oferta entra en el Filtro
        }

        if (listaFavOfertasFiltro.length === 0) {
            jQuery("#etiDataFavFiltro").html(message.datosCargados(0,listaFavOfertas.length));
            discApp.showMessage(message.sinOfertasPorFiltro());
        } // No se encontraron Ofertas con patrón Digitado

        else {
            cargarFavoritoOfertas(listaFavOfertasFiltro);
        }
        
        jQuery('#btnCompletaFavOferta').show();
    } // Se ha digitado Datos para realizar Filtro
    
    else {
        discApp.showMessage(message.sinDatosFiltro());
    } // No se ha digitado Datos para realizar Filtro
};

// Permite Limpiar la Lista del Formulario
function limpiarListaFavoritoOfertas() {
    jQuery(".liRemove").remove(); listaFavOfertasFiltro = [];
};

// Cargando datos del DataSet en la Lista del Formulario
function cargarFavoritoOfertas(listaDatos) {
    for (var index = 0; index < listaDatos.length; index++) {
        var item = listaDatos[index]; // Cargando elemento de la Lista
        jQuery("#listaFavOfertas").append(crearComponentFavoritoOfertas(item,index));
    } // Insertando componentes en la Lista
    
    jQuery("#etiDataFavFiltro").html(message.datosCargados(listaDatos.length,listaFavOfertas.length)); 
    discApp.adjustFontSizeClass('.compFiltro');
};

function getFavoritoRequisitos(item) {
    if (item[9] === 'NA') {
        return 'La oferta no tiene requisitos definidos';
    }
    
    return item.requisitos;
};

function getFavoritoDireccion(item) {
    if (item[7] === '') {
        return 'La oferta no tiene una dirección establecida';
    }
    
    return item[7];
};

function getFavoritoContacto(item) {
    var contacto = ''; // Variable a contener datos de Contacto
    
    if (item[13] === '') {
        contacto = 'Nombre del contacto desconocido';
    }
    
    else {
        contacto = 'Nombre: ' + item[13];
    }
    
    if (item[15] === '') {
        contacto += '<br>Telefono del contacto desconocido';
    }
    
    else {
        contacto += 'Telefono: ' + item[15];
    }
    
    return contacto;
};

function getFavoritoAddressMap(item) {
    return item[7] + " - " + item[4] + " (" + item[3] + ")";
};

function getFavoritoUbicacion(item) {
    return item[4] + ", " + item[3];
}

function getFavoritoVigencia(item) {
    if (item[11] === 'NA') {
        return 'Indefinida';
    }
    
    return item[11] + ", " + item[12];
}

function getFavoritoNoAplicaDiscapacidad(item) {
    var dataSplit = item[10].split(',');
    var discapacidad = '', arrayDiscp = [];
    
    if (dataSplit[0] === 'N') {
        arrayDiscp.push('discapacidad fisica');
    }
    
    if (dataSplit[1] === 'N') {
        arrayDiscp.push('discapacidad auditiva');
    }
    
    if (dataSplit[2] === 'N') {
        arrayDiscp.push('discapacidad visual');
    }
    
    if (dataSplit[3] === 'N') {
        arrayDiscp.push('discapacidad mental');
    }
    
    if (dataSplit[4] === 'N') {
        arrayDiscp.push('discapacidad cognitiva');
    }
    
    if (dataSplit[5] === 'N') {
        arrayDiscp.push('discapacidad multiple');
    }
    
    if (arrayDiscp.length === 0) {
        discapacidad = 'Aplica para todas las categorias de discapacidad';
    }
    
    else {
        discapacidad = 'No aplica para ';
        for (var index = 0; index < arrayDiscp.length; index++) {
            discapacidad += arrayDiscp[index];
            
            if ((index + 1) < arrayDiscp.length) {
                discapacidad += ', ';
            }
        }
    }
    
    return discapacidad;
}

function crearComponentFavoritoOfertas(item, index) {
    var nuevaFila = "<li class='list-group-item liRemove compSmall compFiltro'>";
    nuevaFila += "<b>Identificador de Oferta de " + item[1] + ": " + (index + 1);
    nuevaFila += "</b><br><b>Entidad:</b> " + item[2] + "</li>";
    nuevaFila += "<li value='" + index + "' class='list-group-item liRemove'>";
    nuevaFila += "<p class='compSmall compFiltro' align='justify'><b>Nombre de oferta: </b>";
    nuevaFila += item[5] + "</p><p class='compSmall compFiltro' align='justify'><b>Descripción:";
    nuevaFila += " </b>" + item[6] + "</p><p class='compSmall compFiltro' align='justify'>";
    nuevaFila += "<b>Ubicación de Oferta:</b> " + getFavoritoUbicacion(item) +"</p>";
    nuevaFila += "<p class='compSmall compFiltro' align='justify'><b>La Oferta:</b> ";
    nuevaFila += getFavoritoNoAplicaDiscapacidad(item) + "</p><button class='btn";
    nuevaFila += " btn-primary btn-fav-oferta compSmall compFiltro'>Ver detalles</button></li>";
    
    return nuevaFila; // Retornando componente para la Lista
};

function isFiltrableFavoritoOferta(item, datoFiltro) {
    var arrayFiltro = datoFiltro.split(" "), index = 0, filtrable = false;
    while (!filtrable && (index < arrayFiltro.length )) {
        
        filtrable = applyFilterFavoritoOferta(item,arrayFiltro[index]);
        if (!filtrable) {index++;} // El dato no se filtra por lo Digitado
    }
    
    return filtrable; // Retornando el valor si es Filtrable
};

function applyFilterFavoritoOferta(item, patronFiltro) {
    if ((item[1].toUpperCase()).indexOf(patronFiltro) !== -1) {
        return true; 
    } // Filtro por Sector de Oferta
    
    if ((item[5].toUpperCase()).indexOf(patronFiltro) !== -1) {
        return true; 
    } // Filtro por Nombre de Oferta
    
    if ((item[2].toUpperCase()).indexOf(patronFiltro) !== -1) {
        return true; 
    } // Filtro por Entidad de Oferta
    
    if ((item[3].toUpperCase()).indexOf(patronFiltro) !== -1) {
        return true; 
    } // Filtro por Departamento de Oferta
    
    if ((item[4].toUpperCase()).indexOf(patronFiltro) !== -1) {
        return true; 
    } // Filtro por Municipio de Oferta
    
    if ((item[6].toUpperCase()).indexOf(patronFiltro) !== -1) {
        return true; 
    } // Filtro por Descripción de Oferta
    
    return false; // No hay como Filtrar
};

function getFavCompartir(ofertaSelected) {
    var compartir = "Información compartida desde app móvil DiscApp\nOferta de " + typeOferta;
    compartir += "\nNombre de la Oferta: " + ofertaSelected[5] + "\n";
    compartir += "Descripcion de la Oferta: " + ofertaSelected[6] + "\n";
    compartir += "Dirección de la Oferta: " + getFavoritoDireccion(ofertaSelected[7]) + "\n";
    compartir += "Ubicación de la Oferta: " + ofertaSelected[4] + ", " + ofertaSelected[3];
    
    return compartir; // Retornar el Parrafo Compartir
};