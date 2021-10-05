function listarFincas(){
    $.ajax({
        url:'https://g9758d990ec8bbf-db202109232115.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/farm/farm',
        type: "GET",
        dataType:  "json",
        success: function(respuesta){
            console.log(respuesta);
            $("#ListadoFinca").html("");
            pintarFincas(respuesta.items);
        },
        error:function(){
            console.log('error');
        }

    })
}

function pintarFincas(items){
    let myTable ="<table>";
    myTable += "<tr>";
    myTable += "<th>Id</th>";
    myTable += "<th>Nombre</th>";
    myTable += "<th>Dirección</th>";
    myTable += "<th>Exensión</th>";
    myTable += "<th>Categoria</th>";
    myTable += '<th>Acción</th>';
    myTable += "</tr>";
    for(i=0;i<items.length ;i++){
        myTable += "<tr>";
        myTable += "<td>"+items[i].id+"</td>";
        myTable += "<td>"+items[i].name+"</td>";
        myTable += "<td>"+items[i].address+"</td>";
        myTable += "<td>"+items[i].exension+"</td>";
        myTable += "<td>"+items[i].category_id+"</td>";
        myTable += '<td><button class="botonA" onclick="EliminarFincas('+items[i].id+')">Eliminar</button> </td>';
        myTable += "</tr>";
    }
    myTable += "</tr>";

    myTable += "</table>";
    $("#ListadoFinca").html(myTable);
}

function guardarFinca(){    
    let myData={
        id: $("#idFinca").val(),
        name: $("#nameFinca").val(),
        address : $("#addressFinca").val(),
        exension : $("#exensionFinca").val(),
        category_id : $("#categoriaFinca").val()
    };
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url:'https://g9758d990ec8bbf-db202109232115.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/farm/farm',
        type: "POST",
        dataType:  "json",
        data : dataToSend,
        contentType: 'application/json',
        complete: function(respuesta){
            $("#ListadoFinca").empty();
            $("#idFinca").val(""),
            $("#nameFinca").val(""),
            $("#addressFinca").val(""),
            $("#exensionFinca").val(""),
            $("#categoriaFinca").val("")
            listarFincas();
            console.log("Guardado!");
            
        }   , error: function(textStatus){
            console.log(textStatus)
        }
    })
}

function actualizarFinca(){
    let myData={
        id: $("#idFinca").val(),
        name: $("#nameFinca").val(),
        address : $("#addressFinca").val(),
        exension : $("#exensionFinca").val(),
        category_id : $("#categoriaFinca").val()
    };
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url:'https://g9758d990ec8bbf-db202109232115.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/farm/farm',
        type: "PUT",
        contentType: 'application/json',
        data : dataToSend,
    }).done(function () {
        $("#ListadoFinca").empty();
        $("#idFinca").val(""),
        $("#nameFinca").val(""),
        $("#addressFinca").val(""),
        $("#exensionFinca").val(""),
        $("#categoriaFinca").val("")
        listarFincas();
        console.log("Actualizado!");
        console.log('SUCCESS');
    }).fail(function (msg) {
        console.log('FAIL');
    }).always(function (msg) {
        console.log('ALWAYS');
    });    
}


function EliminarFincas(id){
    let myData={
        id: id
    };
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url:'https://g9758d990ec8bbf-db202109232115.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/farm/farm',
        type: "DELETE",
        dataType:  "json",
        contentType: 'application/json',
        data : dataToSend,
    }).done(function () {
        $("#ListadoFinca").empty();
        $("#idFinca").val(""),
        $("#nameFinca").val(""),
        $("#addressFinca").val(""),
        $("#exensionFinca").val(""),
        $("#categoriaFinca").val("")
        listarFincas();
        console.log("Eliminado!");
        console.log('SUCCESS');
    }).fail(function (msg) {
        console.log('FAIL');
    }).always(function (msg) {
        console.log('ALWAYS');
    });    
}
