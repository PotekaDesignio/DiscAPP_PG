
function Agenda() {
    
    var dataBase, result; favoritosPlan = []; favoritosOfertas = [];
    
    function processSuccess() {
        result = true;
    };
    
    function processError() {
        result = false;
    };
    
    Agenda.prototype.openDB = function() {
        dataBase = window.openDatabase("DiscappDB", "1.0", "Base de datos Discaap", 5*1024*1024);
        
        if (dataBase) {
            return dataBase;
        }
        
        else {
            return null;
        }
    };
    
    Agenda.prototype.createTable = function() {
        var sentenceOferta = 'CREATE TABLE IF NOT EXISTS FAV_OFERTAS(' +
                'RowKey PRIMARY KEY,' + // 0
                'sector TEXT NOT NULL,' + // 1
                'entidadoferta TEXT NOT NULL,' + // 2
                'nombredepartamento TEXT NOT NULL,' + // 3
                'nombremunicipio TEXT NOT NULL,' + // 4
                'nombreoferta TEXT NOT NULL,' + // 5
                'descripcionoferta TEXT NOT NULL,' + // 6
                'direccion TEXT NOT NULL,' + // 7
                'horarioatencion TEXT NOT NULL,' + // 8
                'requisitos TEXT NOT NULL,' + // 9
                'discapacidad TEXT NOT NULL,' + // 10
                'vigenciadese TEXT NOT NULL,' + // 11
                'vigenciahasta TEXT NOT NULL,' + // 12
                'nombrecontacto TEXT NOT NULL,' + // 13
                'cargocontacto TEXT NOT NULL,' + // 14
                'celularcontacto TEXT NOT NULL,' + // 15
                'correoelectronico TEXT NOT NULL,' + // 16
                'estado TEXT NOT NULL);';
        
        var sentencePlan = 'CREATE TABLE IF NOT EXISTS FAV_PLAN(' +
                'RowKey PRIMARY KEY,' +
                'sector TEXT NOT NULL,' +
                'incluidopos TEXT NOT NULL,' + 
                'gruposervicios TEXT NOT NULL,' +
                'servicio TEXT NOT NULL,' + 
                'descripcion TEXT NOT NULL,' + 
                'estado TEXT NOT NULL)';
        
        if (this.openDB()) {
            dataBase.transaction(
                function(tx) {
                    tx.executeSql(sentenceOferta,[],processSuccess,processError);
                }
            );
    
            dataBase.transaction(
                function(tx) {
                    tx.executeSql(sentencePlan,[],processSuccess,processError);
                }
            );
        }
        
        else {
            processError();
        }
        
        return result; // Resultado de Crear La Tabla
    };
    
    function createName(oferta) {
        return oferta.nombrecontacto + oferta.apellidoscontacto;
    }
    
    function createDiscapacidad(oferta) {
        var discapacidad = oferta.discfisica;
        discapacidad += ',' + oferta.discauditiva;
        discapacidad += ',' + oferta.discvisual;
        discapacidad += ',' + oferta.discmental;
        discapacidad += ',' + oferta.disccognitiva;
        discapacidad += ',' + oferta.discmultiple;
        
        return discapacidad;
    }
    
    Agenda.prototype.insertOfertas = function (oferta) {
        var parametros = [oferta.RowKey, oferta.sector, oferta.entidadoferta,
            oferta.nombredepartamento, oferta.nombremunicipio, oferta.nombreoferta,
            oferta.descripcionoferta, oferta.direccion, oferta.horarioatencion, 
            oferta.requisitos, createDiscapacidad(oferta), oferta.vigenciadese,
            oferta.vigenciahasta, createName(oferta), oferta.cargocontacto, 
            oferta.celularcontacto, oferta.correoelectronico, 'PENDIENTE'];
        
        if (this.openDB()) {
            var sentence = "INSERT INTO FAV_OFERTAS VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);";
            dataBase.transaction(
                function(tx) {
                    tx.executeSql(sentence,parametros,processSuccess,processError);
                }
            );    
        }
        
        else {
            processError();
        }
        
        return result; // Resultado de Insertar los Datos
    };
    
   function crearListaFavoritosOfertas(result) {
        var output = []; 
        for (var index = 0; index < result.rows.length; index++) {
            output.push([
                result.rows.item(index).RowKey, 
                result.rows.item(index).sector, 
                result.rows.item(index).entidadoferta,
                result.rows.item(index).nombredepartamento, 
                result.rows.item(index).nombremunicipio, 
                result.rows.item(index).nombreoferta,
                result.rows.item(index).descripcionoferta, 
                result.rows.item(index).direccion, 
                result.rows.item(index).horarioatencion, 
                result.rows.item(index).requisitos, 
                result.rows.item(index).discapacidad, 
                result.rows.item(index).vigenciadese,
                result.rows.item(index).vigenciahasta, 
                result.rows.item(index).nombrecontacto, 
                result.rows.item(index).cargocontacto, 
                result.rows.item(index).celularcontacto, 
                result.rows.item(index).correoelectronico, 
                result.rows.item(index).estado]);
        }
        
        favoritosOfertas = output; processSuccess();
    };
    
    Agenda.prototype.cargarFavoritosOfertas = function () {        
        if (this.openDB()) {
            var SQL = 'SELECT * FROM FAV_OFERTAS;';
            dataBase.transaction(
                function(tx) {
                    tx.executeSql(SQL,[],function (tx, result) {crearListaFavoritosOfertas(result);},processError);
                }
            );
        }
        
        else {
            processError();
        }
    };
    
    Agenda.prototype.getFavoritosOfertas = function () {
        return favoritosOfertas;
    };
    
    Agenda.prototype.deleteOfertas = function (RowKey) {
        if (this.openDB()) {
            var SQL = "DELETE FROM FAV_OFERTAS WHERE RowKey = ?;";
            dataBase.transaction(
                function (tx) {
                    tx.executeSql(
                        SQL,[RowKey],function (result) { 
                            if (result.rowsAffected !== 0) {
                                processSuccess();
                            }
                            
                            else {
                                processError();
                            }
                        },processError);
                }
            );    
        }
        
        else {
            processError();
        }
        
        return result; // Resultado de Eliminar los Datos
    };
    
    Agenda.prototype.insertPlan = function (plan) {
        var parametros = [plan.RowKey, plan.sector, plan.incluidopos,
            plan.gruposervicios, plan.servicio, plan.descripcion, 'PENDIENTE'];
        
        if (this.openDB()) {
            var sentence = "INSERT INTO FAV_PLAN VALUES (?,?,?,?,?,?,?);";
            dataBase.transaction(
                function(tx) {
                    tx.executeSql(sentence,parametros,processSuccess,processError);
                }
            );    
        }
        
        else {
            processError();
        }
        
        return result; // Resultado de Insertar los Datos
    };
    
   function crearListaFavoritosPlan(result) {
        var output = []; 
        for (var index = 0; index < result.rows.length; index++) {
            output.push([
                result.rows.item(index).RowKey,
                result.rows.item(index).sector,
                result.rows.item(index).incluidopos,
                result.rows.item(index).gruposervicios,
                result.rows.item(index).servicio,
                result.rows.item(index).descripcion,
                result.rows.item(index).estado
            ]);
        }
        
        favoritosPlan = output; processSuccess();
    };
    
    Agenda.prototype.cargarFavoritosPlan = function () {        
        if (this.openDB()) {
            var SQL = 'SELECT * FROM FAV_PLAN;';
            dataBase.transaction(
                function(tx) {
                    tx.executeSql(SQL,[],function (tx, result) {crearListaFavoritosPlan(result);},processError);
                }
            );
        }
        
        else {
            processError();
        }
    };
    
    Agenda.prototype.getFavoritosPlan = function () {
        return favoritosPlan;
    };
    
    Agenda.prototype.update = function(id, op){
        var r;
        if (this.openDB()){
            var SQL="update agenda set estado=? where id=?";
            dataBase.transaction(
                function(tx){
                    tx.executeSql(
                        SQL,
                        [op,id],
                        function(result){
                            if (result.rowsAffected !== 0){
                                r=true;
                            }else{
                                r=false;
                            }
                        },
                        function(){
                            r=false;
                        }
                    );
                }
            );    
        }else{
            r= false;
        }
        return r;
    };
    
    Agenda.prototype.deletePlan = function (RowKey) {
        if (this.openDB()) {
            var SQL = "DELETE FROM FAV_PLAN WHERE RowKey = ?;";
            dataBase.transaction(
                function (tx) {
                    tx.executeSql(
                        SQL,[RowKey],function (result) { 
                            if (result.rowsAffected !== 0) {
                                processSuccess();
                            }
                            
                            else {
                                processError();
                            }
                        },processError);
                }
            );    
        }
        
        else {
            processError();
        }
        
        return result; // Resultado de Eliminar los Datos
    };
}