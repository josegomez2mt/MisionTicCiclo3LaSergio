function comboFinca() {
    let urlA = urlApi() + "/Farm/all";
    $.ajax({
        url: urlA,
        type: "GET",
        dataType: "json",
        success: function(respuesta) {
            console.log(respuesta);
            $("#farm").html("");
            let myselect = '<select class="form-select" id="combofinca" required>';
            myselect +='<option></<option>';
            for (i = 0; i < respuesta.length; i++) {
                myselect += "<option value=" + respuesta[i].id + ">" + respuesta[i].name + "</option>";
            }
            myselect += "</select >";
            myselect += '<label for="combofinca">Finca</label>';
            $("#farm").html(myselect);
        },
        error: function() {
            console.log('error');
        }

    })
}

function listarFincas() {
    let urlA = urlApi() + "/Farm/all";
    $.ajax({
        url: urlA,
        type: "GET",
        dataType: "json",
        success: function(respuesta) {
            console.log(respuesta);
            $("#listado").html("");
            pintarFincas(respuesta);
        },
        error: function() {
            console.log('error');
        }

    })
}

function pintarFincas(items) {
    let myTable = '<table class="table table-bordered">';
    myTable += '<thead class="table-dark">';
    myTable += "<tr>";
    myTable += "<th>Nombre</th>";
    myTable += "<th>Dirección</th>";
    myTable += "<th>Exensión</th>";
    myTable += "<th>Categoria</th>";
    myTable += "<th>Descripcion</th>";
    myTable += "<th>Acciones</th>";
    myTable += "</tr>";
    myTable += "</thead><tbody>"

    for (i = 0; i < items.length; i++) {
        nameCategory = items[i]?.category?.name == null ? "" : items[i].category?.name;
        myTable += "<tr>";
        myTable += "<td>" + items[i].name + "</td>";
        myTable += "<td>" + items[i].address + "</td>";
        myTable += "<td>" + items[i].extension + "</td>";
        myTable += "<td>" + nameCategory + "</td>";
        myTable += "<td>" + items[i].description + "</td>";
        myTable += '<td>';
        myTable += '<button class="btn btn-danger btn-sm" onclick="EliminarFinca(' + items[i].id + ')">Eliminar</button>';
        myTable += '<button class="btn btn btn-secondary btn-sm" onclick="ActualizarFinca(' + items[i].id + ')">Actualizar</button> </td>';
        myTable += "</tr>";
    }
    myTable += "</tbody>";
    myTable += "</table>";
    $("#listado").html(myTable);
}

function guardarFinca() {
    var e = document.getElementById("combocategory");
    var category = e.options[e.selectedIndex].value;
    let myCate = { id: category };

    let myData = {
        name: $("#name").val(),
        address: $("#address").val(),
        extension: $("#extension").val(),
        category: myCate,
        description: $("#description").val()

    };
    let dataToSend = JSON.stringify(myData);

    let urlA = urlApi() + "/Farm/save";
    $.ajax({
        url: urlA,
        type: "POST",
        dataType: "json",
        data: dataToSend,
        contentType: 'application/json',
        complete: function(respuesta) {
            $("#ListadoFinca").empty();
            $("#name").val(""),
                $("#address").val(""),
                $("#extension").val(""),
                $("#combocategory").val(""),
                $("#description").val("")
            listarFincas();
            console.log("Guardado!");

        },
        error: function(textStatus) {
            console.log(textStatus)
        }
    })
}


function EliminarFincas(id) {
    let myData = {
        id: id
    };
    let dataToSend = JSON.stringify(myData);
    let urlA = urlApi() + "/Farm/delete";
    $.ajax({
        url: urlA,
        type: "DELETE",
        dataType: "json",
        contentType: 'application/json',
        data: dataToSend,
    }).done(function() {
        $("#ListadoFinca").empty();
        $("#idFinca").val(""),
            $("#nameFinca").val(""),
            $("#addressFinca").val(""),
            $("#extensionFinca").val(""),
            $("#categoriaFinca").val("")
        listarFincas();
        console.log("Eliminado!");
        console.log('SUCCESS');
    }).fail(function(msg) {
        console.log('FAIL');
    }).always(function(msg) {
        console.log('ALWAYS');
    });
}