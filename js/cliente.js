function comboCliente(){
    let urlA= urlApi() +"/Client/all";
    $.ajax({
        url: urlA,
        type: "GET",
        dataType:  "json",
        success: function(respuesta){
            console.log(respuesta);
            $("#client").html("");            
            let myselect = '<select class="form-select" id="combocliente" required>';
            myselect +='<option></<option>';
            for (i = 0; i < respuesta.length; i++) {
                myselect += "<option value=" + respuesta[i].idClient + ">" + respuesta[i].name + "</option>";
            }
            myselect += "</select >";
            myselect += '<label for="combocliente">Cliente</label>';

            $("#client").html(myselect );
        },
        error:function(){
            console.log('error');
        }

    })
}

function listarClientes(){
    let urlA= urlApi() +"/Client/all";
    $.ajax({
        url: urlA,
        type: "GET",
        dataType:  "json",
        success: function(respuesta){
            console.log(respuesta);
            $("#listado").html("");
            pintarClientes(respuesta);
        },
        error:function(){
            console.log('error');
        }

    })
}

function pintarClientes(items){
    let myTable = '<table class="table table-bordered">';
    myTable += '<thead class="table-dark">';
    myTable += "<tr>";
    
    myTable += "<th>Nombre</th>";
    myTable += "<th>eMail</th>";
    myTable += "<th>Edad</th>";
    myTable += "<th>Acciones</th>";
    myTable += "</tr>";
    myTable += "</thead><tbody>"
    
    for(i=0;i<items.length ;i++){
        myTable += "<tr>";
        myTable += "<td>"+items[i].name+"</td>";
        myTable += "<td>"+items[i].email+"</td>";
        myTable += "<td>"+items[i].age+"</td>";        
        myTable += '<td>';
        myTable += '<button class="btn btn-danger btn-sm" onclick="EliminarFinca(' + items[i].idClient + ')">Eliminar</button>';
        myTable += '<button class="btn btn btn-secondary btn-sm" onclick="ActualizarFinca(' + items[i].idClient + ')">Actualizar</button> </td>';
        myTable += "</tr>";

    }
    myTable += "</tbody>";
    myTable += "</table>";
    $("#listado").html(myTable);
}

function guardarCliente(){    
    let myData={
        name: $("#name").val(),
        email : $("#email").val(),
        age : $("#age").val(),
        password : $("#password").val()
    };
    let dataToSend = JSON.stringify(myData);
    let urlA= urlApi() +"/Client/save";
    $.ajax({
        url: urlA,
        type: "POST",
        dataType:  "json",
        data : dataToSend,
        contentType: 'application/json',
        complete: function(respuesta){
            $("#listado").empty();
            $("#idCliente").val(""),
            $("#name").val(""),
            $("#email").val(""),
            $("#age").val(""),
            $("#password").val("")
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
        name: $("#name").val(),
        email : $("#email").val(),
        age : $("#age").val(),
        password: $("#password").val("")
    };
    let dataToSend = JSON.stringify(myData);
    let urlA= urlApi() +"/Client/save";
    $.ajax({
        url: urlA,
        type: "PUT",
        contentType: 'application/json',
        data : dataToSend,
    }).done(function () {
        $("#listado").empty();
        $("#idCliente").val(""),
        $("#name").val(""),
        $("#email").val(""),
        $("#age").val("")
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
    let urlA= urlApi() +"/Client/delete";
    $.ajax({
        url: urlA,
        type: "DELETE",
        dataType:  "json",
        contentType: 'application/json',
        data : dataToSend,
    }).done(function () {
        $("#listado").empty();
        $("#idCliente").val(""),
        $("#name").val(""),
        $("#email").val(""),
        $("#age").val("")
        listarClientes();
        console.log("Eliminado!");
        console.log('SUCCESS');
    }).fail(function (msg) {
        console.log('FAIL');
    }).always(function (msg) {
        console.log('ALWAYS');
    });    
}
