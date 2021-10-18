function comboCategoria() {
    let urlA = urlApi() + "/Category/all";
    $.ajax({
        url: urlA,
        type: "GET",
        dataType: "json",
        success: function(respuesta) {
            console.log(respuesta);
            $("#category").html("");
            let myselect = '<select class="form-select" id="combocategory" required>';
            myselect +='<option></<option>';
            for (i = 0; i < respuesta.length; i++) {
                myselect += "<option value=" + respuesta[i].id + ">" + respuesta[i].name + "</option>";
            }
            myselect += "</select >";
            myselect += '<label for="combocategory">Categoría</label>';
            $("#category").html(myselect);
        },
        error: function() {
            console.log('error');
        }

    })
}

function listarCategorias() {
    let urlA = urlApi() + "/Category/all";
    $.ajax({
        url: urlA,
        type: "GET",
        dataType: "json",
        success: function(respuesta) {
            console.log(respuesta);
            $("#listado").html("");
            pintarCategorias(respuesta);
        },
        error: function() {
            console.log('error');
        }

    })
}

function pintarCategorias(items) {
    /*
    let myTable = '<table  class="table caption-top table-bordered">';
    myTable += "<caption>Listado de Categorias</caption>"
    */
    let myTable = '<table class="table table-bordered">';
    myTable += '<thead class="table-dark">';
    myTable += "<tr>";
    myTable += "<th>Nombre</th>";
    myTable += "<th>Descripcion</th>";
    myTable += "<th>Acciones</th>";
    myTable += "</tr>";
    myTable += "</thead><tbody>"
    for (i = 0; i < items.length; i++) {
        myTable += "<tr>";
        myTable += "<td>" + items[i].name + "</td>";
        myTable += "<td>" + items[i].description + "</td>";
        myTable += '<td>';
        myTable += '<button class="btn btn-danger btn-sm" onclick="EliminarCategoria(' + items[i].id + ')">Eliminar</button>';
        myTable += '<button class="btn btn btn-secondary btn-sm" onclick="ActualizarCategoria(' + items[i].id + ')">Actualizar</button> </td>';
        myTable += "</tr>";
    }
    myTable += "</tbody>";

    myTable += "</table>";
    $("#listado").html(myTable);
}

function guardarCategoria() {
    let myData = {
        name: $("#name").val(),
        description: $("#description").val()

    };
    let dataToSend = JSON.stringify(myData);
    let urlA = urlApi() + "/Category/save";
    $.ajax({
        url: urlA,
        type: "POST",
        dataType: "json",
        data: dataToSend,
        contentType: 'application/json',
        complete: function(respuesta) {
            $("#listado").empty();
            $("#name").val(""),
                $("#description").val("")
            listarCategorias();
            console.log("Guardado!");

        },
        error: function(textStatus) {
            console.log(textStatus)
        }
    })
}