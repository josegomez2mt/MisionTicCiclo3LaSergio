function listarMensajes(){
    let urlA= urlApi() +"/Message/all";
    $.ajax({
        url: urlA,
        type: "GET",
        dataType:  "json",
        success: function(respuesta){
            console.log(respuesta);
            $("#listado").html("");
            pintarMensajes(respuesta);
        },
        error:function(){
            console.log('error');
        }

    })
}

function pintarMensajes(items){
    let myTable = '<table class="table table-bordered">';
    myTable += '<thead class="table-dark">';
    myTable += "<tr>";
    myTable += "<th>Finca</th>";
    myTable += "<th>Cliente</th>";
    myTable += "<th>Texto del Mensaje</th>";
    myTable += "<th>Acciones</th>";
    myTable += "</tr>";
    myTable += "</thead><tbody>"
    for(i=0;i<items.length ;i++){
        myTable += "<tr>";
        myTable += "<td>"+items[i]?.farm?.name+"</td>";
        myTable += "<td>"+items[i]?.client?.name+"</td>";
        myTable += "<td>"+items[i].messageText+"</td>";       
        myTable += '<td>';
        myTable += '<button class="btn btn-danger btn-sm" onclick="EliminarMensaje(' + items[i].idClient + ')">Eliminar</button>';
        myTable += '<button class="btn btn btn-secondary btn-sm" onclick="ActualizarMensaje(' + items[i].id + ')">Actualizar</button> </td>';
        myTable += "</tr>";
        
    }
    myTable += "</tbody>";
    myTable += "</table>";
    $("#listado").html(myTable);
}

function guardarMensaje(){    
    var e = document.getElementById("combocliente");
    var client = e.options[e.selectedIndex].value;
    let myCli={idClient: client};

    var f = document.getElementById("combofinca");
    var farm = f.options[f.selectedIndex].value;
    let myFarm={id: farm};

    let myData={
        client:myCli,
        farm:myFarm,
        messageText: $("#messageText").val()        
    };
    let dataToSend = JSON.stringify(myData);
    let urlA= urlApi() +"/Message/save";
    $.ajax({
        url: urlA,
        type: "POST",
        dataType:  "json",
        data : dataToSend,
        contentType: 'application/json',
        complete: function(respuesta){
            $("#listado").empty();
            $("#combofinca").val(""),
            $("#combocliente").val(""),
            $("#messageText").val("")
            listarMensajes();
            console.log("Guardado!");
            
        }   , error: function(textStatus){
            console.log(textStatus)
        }
    })
}

function actualizarMensaje(){
    let myData={
        id: $("#idMensaje").val(),
        messagetext: $("#textoMensaje").val()        
    };
    let dataToSend = JSON.stringify(myData);
    let urlA= urlApi() +"/Message/save";
    $.ajax({
        url: urlA,
        type: "PUT",
        contentType: 'application/json',
        data : dataToSend,
    }).done(function () {
        $("#listado").empty();
        $("#idMensaje").val(""),
        $("#textoMensaje").val("")
        listarMensajes();
        console.log("Actualizado!");
        console.log('SUCCESS');
    }).fail(function (msg) {
        console.log('FAIL');
    }).always(function (msg) {
        console.log('ALWAYS');
    });    
}


function EliminarMensajes(id){
    let myData={
        id: id
    };
    let dataToSend = JSON.stringify(myData);
    let urlA= urlApi() +"/Message/delete";
    $.ajax({
        url: urlA,
        type: "DELETE",
        dataType:  "json",
        contentType: 'application/json',
        data : dataToSend,
    }).done(function () {
        $("#listado").empty();
        $("#idMensaje").val(""),
        $("#textoMensaje").val("")
        listarMensajes();
        console.log("Eliminado!");
        console.log('SUCCESS');
    }).fail(function (msg) {
        console.log('FAIL');
    }).always(function (msg) {
        console.log('ALWAYS');
    });    
}
