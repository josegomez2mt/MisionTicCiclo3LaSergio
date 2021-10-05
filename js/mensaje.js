function listarMensajes(){
    $.ajax({
        url:'https://g9758d990ec8bbf-db202109232115.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message//message',
        type: "GET",
        dataType:  "json",
        success: function(respuesta){
            console.log(respuesta);
            $("#ListadoMensaje").html("");
            pintarMensajes(respuesta.items);
        },
        error:function(){
            console.log('error');
        }

    })
}

function pintarMensajes(items){
    let myTable ="<table>";
    myTable += "<tr>";
    myTable += "<th>Id</th>";
    myTable += "<th>Texto del Mensaje</th>";
    myTable += '<th>Acción</th>';
    myTable += "</tr>";
    for(i=0;i<items.length ;i++){
        myTable += "<tr>";
        myTable += "<td>"+items[i].id+"</td>";
        myTable += "<td>"+items[i].messagetext+"</td>";
        myTable += '<td><button class="botonA" onclick="EliminarMensajes('+items[i].id+')">Eliminar</button> </td>';
        myTable += "</tr>";
    }
    myTable += "</tr>";

    myTable += "</table>";
    $("#ListadoMensaje").html(myTable);
}

function guardarMensaje(){    
    let myData={
        id: $("#idMensaje").val(),
        messagetext: $("#textoMensaje").val()        
    };
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url:'https://g9758d990ec8bbf-db202109232115.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message//message',
        type: "POST",
        dataType:  "json",
        data : dataToSend,
        contentType: 'application/json',
        complete: function(respuesta){
            $("#ListadoMensaje").empty();
            $("#idMensaje").val(""),
            $("#textoMensaje").val("")
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
    $.ajax({
        url:'https://g9758d990ec8bbf-db202109232115.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message//message',
        type: "PUT",
        contentType: 'application/json',
        data : dataToSend,
    }).done(function () {
        $("#ListadoMensaje").empty();
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
    $.ajax({
        url:'https://g9758d990ec8bbf-db202109232115.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message//message',
        type: "DELETE",
        dataType:  "json",
        contentType: 'application/json',
        data : dataToSend,
    }).done(function () {
        $("#ListadoMensaje").empty();
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
