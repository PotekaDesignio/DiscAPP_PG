
// Atributos dinamicos de la Página
var listaOfertas = [], listaOfertasFiltro = [], typeOferta, ofertaSelected;

jQuery(document).ready(function () {
    
    jQuery('#btnQuitarOferta').hide(); jQuery('#btnCompletaOferta').hide();
    jQuery('#btnCompartirFavOferta').hide(); jQuery('#btnCompartirOferta').show();
    jQuery('#btnAgendaOferta').show(); jQuery('#etiOferta').focus();
    
    if (!formControl.isOpenListaOfertas()) {
        formControl.openListaOfertas(); // 
        
        jQuery(document).on('click','.btn-oferta', function () {
            discApp.showCargando();
            
            // Determinando el Contenedor del Boton
            var obj0 = jQuery(this).parents().get(0); 
            var index = obj0.value; // Obteniendo su Index
            ofertaSelected =  listaOfertasFiltro[index];

            // Cargando los datos en el Dialog
            jQuery("#titleDetail").html("<b>" + ofertaSelected.nombreoferta + "</b>");
            jQuery("#txtInstitucionOferta").html(ofertaSelected.entidadoferta);
            jQuery("#areaDescripcionOferta").html(ofertaSelected.descripcionoferta);
            jQuery("#txtUbicacionOferta").html(getUbicacion(ofertaSelected));
            jQuery("#txtDireccionOferta").html(getDireccion(ofertaSelected));
            jQuery("#txtAplicaDiscp").html(getNoAplicaDiscapacidad(ofertaSelected));
            jQuery("#txtHorarioOferta").html(ofertaSelected.horarioatencion);
            jQuery("#txtVigenciaOferta").html(getVigencia(ofertaSelected));
            jQuery("#txtRequisitosOferta").html(getRequisitos(ofertaSelected));
            jQuery("#txtContactoOferta").html(getContacto(ofertaSelected));

            mapa.insertar(getAddressMap(ofertaSelected));

            jQuery('#dialogOferta').modal('show'); // Visualizamos Dialog
            discApp.hideCargando();
        });

        jQuery('#btnAgendaOferta').click(function () {        
            var result = agenda.insertOfertas(ofertaSelected);
            jQuery('#dialogOferta').modal('hide');
            if (result) {
                discApp.showMessage('La oferta fue agregada a la lista de favoritos');
            }

            else {
                discApp.showMessage('La oferta no pudo ser agregada a la lista de favoritos');
            }
        });

        jQuery('#btnCompartirOferta').click(function () {
            window.plugins.socialsharing.share(getCompartir(ofertaSelected),'Oferta enviada desde DiscApp');
        });
    }

    jQuery("#btnFiltroOferta").click(function () {
        aplicarFiltroOfertas(jQuery("#txtFiltroOferta").val().trim()); 
    });

    jQuery("#btnCompletaOferta").click(function () {
        limpiarListaDeOfertas(); cargarOfertas(listaOfertas);
        listaOfertasFiltro = listaOfertas; jQuery('#btnCompletaOferta').hide();
    });
    
    typeOferta = discApp.getTypeOferta();        
    jQuery("#etiOferta").html("<b>Listado de ofertas en " + typeOferta + "</b>");
    listaOfertas = discApp.getListaDeOfertas();
    listaOfertasFiltro = listaOfertas; cargarOfertas(listaOfertas);
});

// Nos permite aplicar el Filtro al DataSet en el Formulario 
function aplicarFiltroOfertas(patronFiltro) {
    if (patronFiltro.length !== 0) {
        limpiarListaDeOfertas(); // Limpiamos la Lista

        patronFiltro = patronFiltro.toUpperCase();

        for (var index = 0; index < listaOfertas.length; index++) {
            if (isFiltrableOferta(listaOfertas[index],patronFiltro)) {
                listaOfertasFiltro.push(listaOfertas[index]);
            } // Determinando si la Oferta entra en el Filtro
        }

        if (listaOfertasFiltro.length === 0) {
            jQuery("#etiDataFiltro").html(message.datosCargados(0,listaOfertas.length));
            discApp.showMessage(message.sinOfertasPorFiltro());
        } // No se encontraron Ofertas con patrón Digitado

        else {
            cargarOfertas(listaOfertasFiltro); 
        }
        
        jQuery('#btnCompletaOferta').show();
    } // Se ha digitado Datos para realizar Filtro
    
    else {
        discApp.showMessage(message.sinDatosFiltro());
    } // No se ha digitado Datos para realizar Filtro
};

// Permite Limpiar la Lista del Formulario
function limpiarListaDeOfertas() {
    jQuery(".liRemove").remove(); listaOfertasFiltro = [];
};

// Cargando datos del DataSet en la Lista del Formulario
function cargarOfertas(listaDatos) {
    for (var index = 0; index < listaDatos.length; index++) {
        var item = listaDatos[index]; // Cargando elemento de la Lista
        jQuery("#listaInformacion").append(crearComponentListaOfertas(item,index));
    } // Insertando componentes en la Lista
    
    jQuery("#etiDataFiltro").html(message.datosCargados(listaDatos.length,listaOfertas.length)); 
    discApp.adjustFontSizeClass('.compFiltro');
};

function getRequisitos(item) {
    if (item.requisitos === 'NA') {
        return 'La oferta no tiene requisitos definidos';
    }
    
    return item.requisitos;
};

function getDireccion(item) {
    if (item.direccion === '') {
        return 'La oferta no tiene una dirección establecida';
    }
    
    return item.direccion;
};

function getContacto(item) {
    var contacto = ''; // Variable a contener datos de Contacto
    
    if (item.nombrecontacto === '') {
        contacto = 'Nombre del contacto desconocido';
    }
    
    else {
        contacto = 'Nombre: ' + item.nombrecontacto;
    }
    
    if (item.celularcontacto === '') {
        contacto += '<br>Telefono del contacto desconocido';
    }
    
    else {
        contacto += 'Telefono: ' + item.celularcontacto;
    }
    
    return contacto;
};

function getAddressMap(item) {
    return item.direccion + " - " + item.nombremunicipio + " (" + item.nombredepartamento + ")";
};

function getUbicacion(item) {
    return item.nombremunicipio + ", " + item.nombredepartamento;
}

function getVigencia(item) {
    if (item.vigenciadese === 'NA') {
        return 'Indefinida';
    }
    
    return item.vigenciadese + ", " + item.vigenciahasta;
}

function getNoAplicaDiscapacidad(item) {
    var discapacidad = '', arrayDiscp = [];
    
    if (item.discfisica === 'N') {
        arrayDiscp.push('discapacidad fisica');
    }
    
    if (item.discauditiva === 'N') {
        arrayDiscp.push('discapacidad auditiva');
    }
    
    if (item.discvisual === 'N') {
        arrayDiscp.push('discapacidad visual');
    }
    
    if (item.discmental === 'N') {
        arrayDiscp.push('discapacidad mental');
    }
    
    if (item.disccognitiva === 'N') {
        arrayDiscp.push('discapacidad cognitiva');
    }
    
    if (item.discmultiple === 'N') {
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

function crearComponentListaOfertas(item, index) {
    var nuevaFila = "<li class='list-group-item liRemove compSmall compFiltro'>";
    nuevaFila += "<b>Identificador de oferta de " + typeOferta + ": " + (index + 1);
    nuevaFila += "</b><br><b>Entidad:</b> " + item.entidadoferta + "</li>";
    nuevaFila += "<li value='" + index + "' class='list-group-item liRemove'>";
    nuevaFila += "<p class='compSmall compFiltro' align='justify'><b>Nombre de oferta: </b>";
    nuevaFila += item.nombreoferta + "</p><p class='compSmall compFiltro' align='justify'>";
    nuevaFila += "<b>Descripción: </b>"  + item.descripcionoferta + "</p><p class='compSmall";
    nuevaFila += " compFiltro' align='justify'><b>Ubicación de oferta: </b>" + getUbicacion(item);
    nuevaFila += "</p><p class='compSmall compFiltro' align='justify'><b>La oferta: </b>";
    nuevaFila += getNoAplicaDiscapacidad(item) + "</p><button class='btn btn-primary";
    nuevaFila += " btn-oferta compSmall compFiltro'>Ver detalles</button></li>";
    
    return nuevaFila; // Retornando componente para la Lista
};

function isFiltrableOferta(item, datoFiltro) {
    var arrayFiltro = datoFiltro.split(" "), index = 0, filtrable = false;
    
    while (!filtrable && (index < arrayFiltro.length )) {
        filtrable = applyFilterOferta(item,arrayFiltro[index]);
        if (!filtrable) {index++;} // El dato no se filtra por lo Digitado
    }
    
    return filtrable; // Retornando el valor si es Filtrable
};

function applyFilterOferta(item, patronFiltro) {
    if ((item.nombreoferta.toUpperCase()).indexOf(patronFiltro) !== -1) {
        return true; 
    } // Filtro por Nombre de Oferta
    
    if ((item.entidadoferta.toUpperCase()).indexOf(patronFiltro) !== -1) {
        return true; 
    } // Filtro por Entidad de Oferta
    
    if ((item.nombredepartamento.toUpperCase()).indexOf(patronFiltro) !== -1) {
        return true; 
    } // Filtro por Departamento de Oferta
    
    if ((item.nombremunicipio.toUpperCase()).indexOf(patronFiltro) !== -1) {
        return true; 
    } // Filtro por Municipio de Oferta
    
    if ((item.nombreoferta.toUpperCase()).indexOf(patronFiltro) !== -1) {
        return true; 
    } // Filtro por Descripción de Oferta
    
    return false; // No hay como Filtrar
};

function getCompartir(ofertaSelected) {
    var compartir = "Esta oferta fue compartida desde app móvil DiscApp\nOferta de " + typeOferta;
    compartir += "\nNombre de la Oferta: " + ofertaSelected.nombreoferta + "\n";
    compartir += "Descripcion de la Oferta: " + ofertaSelected.descripcionoferta + "\n";
    compartir += "Dirección de la Oferta: " + getDireccion(ofertaSelected) + "\n";
    compartir += "Ubicación de la Oferta: " + ofertaSelected.nombremunicipio+ ", " + ofertaSelected.nombredepartamento;
    
    return compartir; // Retornar el Parrafo Compartir
};