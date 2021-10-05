function listarClientes(){
    $.ajax({
        url:'https://g9758d990ec8bbf-db202109232115.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client',
        type: "GET",
        dataType:  "json",
        success: function(respuesta){
            console.log(respuesta);
            $("#ListadoCliente").html("");
            pintarClientes(respuesta.items);
        },
        error:function(){
            console.log('error');
        }

    })
}

function pintarClientes(items){
    let myTable ="<table>";
    myTable += "<tr>";
    myTable += "<th>Id</th>";
    myTable += "<th>Nombre</th>";
    myTable += "<th>eMail</th>";
    myTable += "<th>Edad</th>";    
    myTable += '<th>Acción</th>';
    myTable += "</tr>";
    for(i=0;i<items.length ;i++){
        myTable += "<tr>";
        myTable += "<td>"+items[i].id+"</td>";
        myTable += "<td>"+items[i].name+"</td>";
        myTable += "<td>"+items[i].email+"</td>";
        myTable += "<td>"+items[i].age+"</td>";        
        myTable += '<td><button class="botonA" onclick="EliminarClientes('+items[i].id+')">Eliminar</button> </td>';
        myTable += "</tr>";
    }
    myTable += "</tr>";

    myTable += "</table>";
    $("#ListadoCliente").html(myTable);
}

function guardarCliente(){    
    let myData={
        id: $("#idCliente").val(),
        name: $("#nameCliente").val(),
        email : $("#emailCliente").val(),
        age : $("#ageCliente").val()
    };
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url:'https://g9758d990ec8bbf-db202109232115.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client',
        type: "POST",
        dataType:  "json",
        data : dataToSend,
        contentType: 'application/json',
        complete: function(respuesta){
            $("#ListadoCliente").empty();
            $("#idCliente").val(""),
            $("#nameCliente").val(""),
            $("#emailCliente").val(""),
            $("#ageCliente").val("")
            listarClientes();
            console.log("Guardado!");
            
        }   , error: function(textStatus){
            console.log(textStatus)
        }
    })
}

function actualizarCliente(){
    let myData={
        id: $("#idCliente").val(),
        name: $("#nameCliente").val(),
        email : $("#emailCliente").val(),
        age : $("#ageCliente").val()
    };
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url:'https://g9758d990ec8bbf-db202109232115.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client',
        type: "PUT",
        contentType: 'application/json',
        data : dataToSend,
    }).done(function () {
        $("#ListadoCliente").empty();
        $("#idCliente").val(""),
        $("#nameCliente").val(""),
        $("#emailCliente").val(""),
        $("#ageCliente").val("")
        listarClientes();
        console.log("Actualizado!");
        console.log('SUCCESS');
    }).fail(function (msg) {
        console.log('FAIL');
    }).always(function (msg) {
        console.log('ALWAYS');
    });    
}


function EliminarClientes(id){
    let myData={
        id: id
    };
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url:'https://g9758d990ec8bbf-db202109232115.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client',
        type: "DELETE",
        dataType:  "json",
        contentType: 'application/json',
        data : dataToSend,
    }).done(function () {
        $("#ListadoCliente").empty();
        $("#idCliente").val(""),
        $("#nameCliente").val(""),
        $("#emailCliente").val(""),
        $("#ageCliente").val("")
        listarClientes();
        console.log("Eliminado!");
        console.log('SUCCESS');
    }).fail(function (msg) {
        console.log('FAIL');
    }).always(function (msg) {
        console.log('ALWAYS');
    });    
}
