function comboReserva() {
    let urlA = urlApi() + "/Farm/all";
    $.ajax({
        url: urlA,
        type: "GET",
        dataType: "json",
        success: function(respuesta) {
            console.log(respuesta);
            $("#farm").html("");
            let myselect = '<select class="form-select" id="comboReserva" required>';
            myselect +='<option></<option>';
            for (i = 0; i < respuesta.length; i++) {
                myselect += "<option value=" + respuesta[i].idReservation + ">" + respuesta[i].name + "</option>";
            }
            myselect += "</select >";
            myselect += '<label for="comboReserva">Reserva</label>';
            $("#farm").html(myselect);
        },
        error: function() {
            console.log('error');
        }

    })
}

function listarReservas(){
    let urlA= urlApi() +"/Reservation/all";
    $.ajax({
        url: urlA,
        type: "GET",
        dataType:  "json",
        success: function(respuesta){
            console.log(respuesta);
            $("#listado").html("");
            pintarReservas(respuesta);
        },
        error:function(){
            console.log('error');
        }

    })
}

function pintarReservas(items){
    let myTable = '<table class="table table-bordered">';
    myTable += '<thead class="table-dark">';
    myTable += "<tr>";
    myTable += "<th>Id</th>";
    myTable += "<th>Finca</th>";
    myTable += "<th>Inicio</th>";
    myTable += "<th>Final</th>";
    myTable += "<th>Id Cliente</th>";
    myTable += "<th>Nombre Cliente</th>";
    myTable += "<th>eMail Cliente</th>";
    myTable += "<th>Calificación</th>";
    myTable += "<th>Acciones</th>";
    myTable += "</tr>";
    myTable += "</thead><tbody>"
    for(i=0;i<items.length ;i++){
        var score = (items[i]?.score)==null?"":items[i]?.score;
        var eMail = (items[i]?.client?.email)==null?"":items[i]?.client?.email;        
        myTable += "<tr>";
        myTable += "<td>"+items[i].idReservation+"</td>";
        myTable += "<td>"+items[i]?.farm?.name+"</td>";
        myTable += "<td>"+formatDate(items[i].startDate)+"</td>";
        myTable += "<td>"+formatDate(items[i].devolutionDate)+"</td>";
        myTable += "<td>"+items[i]?.client?.idClient+"</td>";        
        myTable += "<td>"+items[i]?.client?.name+"</td>";
        myTable += "<td>"+eMail+"</td>";
        myTable += "<td>"+score+"</td>";
        myTable += '<td>';
        myTable += '<button class="btn btn-danger btn-sm" onclick="EliminarFinca(' + items[i].idReservation + ')">Eliminar</button>';
        myTable += '<button class="btn btn btn-secondary btn-sm" onclick="ActualizarFinca(' + items[i].idReservation + ')">Actualizar</button> </td>';
        myTable += "</tr>";

    }
    myTable += "</tbody>";
    myTable += "</table>";
    $("#listado").html(myTable);
}

function guardarReserva(){    
    var e = document.getElementById("combocliente");
    var client = e.options[e.selectedIndex].value;
    let myCli={idClient: client};

    var f = document.getElementById("combofinca");
    var farm   = f.options[f.selectedIndex].value;
    let myFarm = {id: farm};

    let myData={
        client:myCli,
        farm:myFarm,
        startDate: $("#startDate").val(),
        devolutionDate: $("#devolutionDate").val()        
    };
    let dataToSend = JSON.stringify(myData);
    let urlA= urlApi() +"/Reservation/save";
    $.ajax({
        url: urlA,
        type: "POST",
        dataType:  "json",
        data : dataToSend,
        contentType: 'application/json',
        complete: function(respuesta){
            $("#combofinca").val(""),
            $("#combocliente").val(""),
            $("#startDate").empty();
            $("#devolutionDate").val("")
            listarReservas();
            console.log("Guardado!");
            
        }   , error: function(textStatus){
            console.log(textStatus)
        }
    })
}

function actualizarReserva(){
    let myData={
        id: $("#idReserva").val(),
        Reservationtext: $("#textoReserva").val()        
    };
    let dataToSend = JSON.stringify(myData);
    let urlA= urlApi() +"/Reservation/save";
    $.ajax({
        url: urlA,
        type: "PUT",
        contentType: 'application/json',
        data : dataToSend,
    }).done(function () {
        $("#combofinca").val(""),
        $("#combocliente").val(""),
        $("#startDate").empty();
        $("#devolutionDate").val("")
        listarReservas();
        console.log("Actualizado!");
        console.log('SUCCESS');
    }).fail(function (msg) {
        console.log('FAIL');
    }).always(function (msg) {
        console.log('ALWAYS');
    });    
}


function EliminarReservas(id){
    let myData={
        id: id
    };
    let dataToSend = JSON.stringify(myData);
    let urlA= urlApi() +"/Reservation/delete";
    $.ajax({
        url: urlA,
        type: "DELETE",
        dataType:  "json",
        contentType: 'application/json',
        data : dataToSend,
    }).done(function () {
        $("#combofinca").val(""),
        $("#combocliente").val(""),
        $("#startDate").empty();
        $("#devolutionDate").val("")
        listarReservas();
        console.log("Eliminado!");
        console.log('SUCCESS');
    }).fail(function (msg) {
        console.log('FAIL');
    }).always(function (msg) {
        console.log('ALWAYS');
    });    
}
