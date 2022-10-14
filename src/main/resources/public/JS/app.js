//Funciones para la tabla Bike
function consultarBike(){
    $.ajax({
        url:"http://localhost:8080/api/Bike/all",
        type:"GET",
        datatype:"json",
        success: function (response) {
            $("#contenidoTablaBike").empty();
            //console.log(response);
            response.forEach(element => {
                var row = $("<tr>");
                row.append($("<td>").text(element.id));
                row.append($("<td>").text(element.name));
                row.append($("<td>").text(element.brand));
                row.append($("<td>").text(element.year));
                row.append($("<td>").text(element.description));

                //console.log(element.category);

                if(element.category == null) {
                    row.append($("<td>").text("Ninguna"));
                }else{
                    row.append($("<td>").text(element.category.name));
                }

                row.append($("<td>").append('<button type="button" class="btn btn-outline-light" onclick="seleccionarCloud('+element.id+')" >Seleccionar</button>'));
                row.append($("<td>").append('<button type="button" class="btn btn-outline-light" onclick="eliminarCloud('+element.id+')" >Eliminar</button>'));
                $("#contenidoTablaBike").append(row);
            });
        }/*,
        error: function(xhr,status) {
            alert("Ocurrio un error en el consumo.");
        }*/
    });
}

function crearBike() {
    $("#id").attr("readonly", true);
    var name = $("#name").val();
    var brand = $("#brand").val();
    var year = $("#year").val();
    var description = $("#description").val();

    var category_id;

    if($("#categoryAdd").val() == 0) {
        alert("Por favor seleccione una categoria");
    }else{
        category_id = $("#categoryAdd").val();

        if($("#name").val() == "" || $("#brand").val() == "" || $("#year").val() == "" || $("#description") == ""){
            alert("Faltan campos por llenar");
        }else{
            var data = {
                name:name, 
                brand:brand, 
                year:year, 
                description:description,
                category:{
                    id:category_id
                }
            };
        
            $.ajax({
                url: "http://localhost:8080/api/Bike/save",
                type: "POST",
                datatype: "json",
                data:JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                },
                statusCode: {
                    201: function(){
                        consultarCloud();
                        $("#id").val("");
                        $("#name").val("");
                        $("#brand").val("");
                        $("#year").val("");
                        $("#description").val("") ;
                        $("#category").val(0);
                    }
                }
            });
        }
    }
}

function seleccionarBike(idBike){
    //console.log(idCloud);
    $.ajax({
        url:"http://localhost:8080/api/Bike/"+idBike,
        type:"GET",
        datatype:"json",
        success: function (response) {
            $("#id").val(response.id);
            $("#id").attr("readonly", true);
            $("#name").val(response.name);
            $("#brand").val(response.brand);
            $("#year").val(response.year);
            $("#description").val(response.description);
            $("#category").val(response.category.id);
        },
        error: function(xhr, status){
            alert("Ocurrió un error en el consumo.");
        }
    });
}

function actualizarBike(){
    var id = $("#id").val();
    $("#id").attr("readonly", true);
    
    if(id.length == 0) {
        alert("No se ha seleccionado un registro.");
    }else{
        var id = $("#id").val();
        var name = $("#name").val();
        var brand = $("#brand").val();
        var year = $("#year").val();
        var description = $("#description").val();
        var category_id = $("#category").val();

        var data={
            id:id, 
            name:name, 
            brand:brand, 
            year:year, 
            description:description,
            category:{
                id:category_id
            }
        };

        $.ajax({
            url:"http://localhost:8080/api/Bike/update",
            type:"PUT",
            datatype:"json",
            data:JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            },
            statusCode: {
                201: function(){
                    consultarBike();
                    $("#id").val("");
                    $("#name").val("");
                    $("#brand").val("");
                    $("#year").val("");
                    $("#description").val("") ;
                    $("#categoryAdd").val(0);
                },
                505: function(){
                    alert("Ocurrio un error en el consumo");
                }
            }
        });
    }
}

function eliminarBike(idBike){
    let myData={
        id:idBike
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://localhost:8080/api/Bike/"+idBike,
        type:"DELETE",
        data:dataToSend,
        datatype:"json",
        contentType:"application/json",
        success:function(respuesta){
            consultarBike();
        }
    });
}

function recargarBike(){
    consultarBike();
    $("#id").val("");
    $("#name").val("");
    $("#brand").val("");
    $("#year").val("");
    $("#description").val("") ;
    $("#category").val(0);
}

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Funciones para la tabla client
function consultarClient(){
    $.ajax({
        url:"http://localhost:8080/api/Client/all",
        type:"GET",
        datatype:"json",
        success: function (response) {
            $("#contenidoTablaClient").empty();
            response.forEach(element => {
                var row = $("<tr>");
                row.append($("<td>").text(element.idClient));
                row.append($("<td>").text(element.email));
                row.append($("<td>").text(element.password));
                row.append($("<td>").text(element.name));
                row.append($("<td>").text(element.age));
                row.append($("<td>").append('<button type="button" class="btn btn-outline-light" onclick="seleccionarClient('+element.idClient+')" >Seleccionar</button>'));
                row.append($("<td>").append('<button type="button" class="btn btn-outline-light" onclick="eliminarClient('+element.idClient+')" >Eliminar</button>'));
                $("#contenidoTablaClient").append(row);
            });
        },
        error: function(xhr,status) {
            alert("Ocurrio un error en el consumo.");
        }
    });
}

function crearClient() {
    var email = $("#email").val();
    var password = $("#password").val();
    var name = $("#nameClient").val();
    var age = $("#age").val();

    if($("#email").val() == "" || $("#password").val() == "" || $("#nameClient").val() == "" || $("#age").val() == "") {
        alert("Faltan campos por llenar");
    }else{
        var data = {
            name:name, 
            email:email, 
            password:password,
            age:age
        };
    
        $.ajax({
            url: "http://localhost:8080/api/Client/save",
            type: "POST",
            datatype: "json",
            data:JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            },
            statusCode: {
                201: function(){
                    consultarClient();
                    $("#idClient").val("");
                    $("#email").val("");
                    $("#password").val("") ;
                    $("#nameClient").val("");
                    $("#age").val("");
                    $("#message").val(0);
                    $("#reservations").val(0);
                }
            }
        });
    }
}

function seleccionarClient(id){
    //console.log(idCloud);
    $.ajax({
        url:"http://localhost:8080/api/Client/"+id,
        type:"GET",
        datatype:"json",
        success: function (response) {
            //console.log(response.items[0].id);
            //console.log(response.items[0]);
            $("#idClient").val(response.idClient);
            $("#idClient").attr("readonly", true);
            $("#email").val(response.email);
            $("#password").val(response.password);
            $("#nameClient").val(response.name);
            $("#age").val(response.age);
        },
        error: function(xhr, status){
            alert("Ocurrió un error en el consumo.");
        }
    });
}

function actualizarClient(){
    var idClient = $("#idClient").val();
    $("#idClient").attr("readonly", true);
    
    if(idClient.length == 0) {
        alert("No se ha seleccionado un registro.");
    }else{
        var idClient = $("#idClient").val();
        var email = $("#email").val();
        var password = $("#password").val();
        var name = $("#nameClient").val();
        var age = $("#age").val();

        var data={
            idClient:idClient,
            email:email, 
            password:password,
            name:name, 
            age:age
        };

        $.ajax({
            url:"http://localhost:8080/api/Client/update",
            type:"PUT",
            datatype:"json",
            data:JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            },
            statusCode: {
                201: function(){
                    consultarClient();
                    $("#idClient").val("");
                    $("#email").val("");
                    $("#password").val("") ;
                    $("#nameClient").val("");
                    $("#age").val("");
                    $("#message").val(0);
                    $("#reservations").val();
                },
                505: function(){
                    alert("Ocurrio un error en el consumo");
                }
            }
        });
    }
}

function eliminarClient(idClient){
    let myData={
        id:idClient
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://localhost:8080/api/Client/"+idClient,
        type:"DELETE",
        data:dataToSend,
        datatype:"json",
        contentType:"application/json",
        success:function(respuesta){
            consultarClient();
        }
    });
}

function recargarClient(){
    consultarClient();
    $("#idClient").val("");
    $("#email").val("");
    $("#password").val("") ;
    $("#nameClient").val("");
    $("#age").val("");
    $("#message").val(0);
    $("#reservations").val(0);
}

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Funciones para la tabla Reservation

function consultarReservation(){
    $.ajax({
        url:"http://localhost:8080/api/Reservation/all",
        type:"GET",
        datatype:"json",
        success: function (response) {
            $("#contenidoTablaReservation").empty();
            response.forEach(element => {
                var row = $("<tr>");
                row.append($("<td>").text(element.idReservation));
                row.append($("<td>").text(element.startDate));
                row.append($("<td>").text(element.devolutionDate));
                row.append($("<td>").text(element.status));
                row.append($("<td>").text(element.cloud.name));
                row.append($("<td>").text(element.client.name));
                row.append($("<td>").append('<button type="button" class="btn btn-outline-light" onclick="seleccionarReservation('+element.idReservation+')" >Seleccionar</button>'));
                row.append($("<td>").append('<button type="button" class="btn btn-outline-light" onclick="eliminarReservation('+element.idReservation+')" >Eliminar</button>'));
                $("#contenidoTablaReservation").append(row);
            });
        },
        error: function(xhr,status) {
            alert("Ocurrio un error en el consumo.");
        }
    });
}

function crearReservation(){
    $("#idReservation").attr("readonly", true);
    var startDate = $("#startDate").val();
    var devolutionDate = $("#devolutionDate").val();
    var status;

    if($("#status").val() == 1){
        status = "completed";
    }else if($("#status").val() == 2){
        status = "cancelled";
    }else{
        status = $("#status").val();
    }

    var bike = $("#bike2").val();
    var client = $("#client2").val();

    if($("#startDate").val() == "" || $("#devolutionDate").val() == "" || $("#status").val() == 0 || $("#bike2").val() == 0|| $("#client2").val() == 0) {
        alert("Faltan campos por llenar");
    }else{
        var data = {
            startDate:startDate, 
            devolutionDate:devolutionDate, 
            status:status, 
            bike:{
                id:bike
            },
            client:{
                idClient:client
            }
        };
    
        $.ajax({
            url: "http://localhost:8080/api/Reservation/save",
            type: "POST",
            datatype: "json",
            data:JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            },
            statusCode: {
                201: function(){
                    consultarReservation();
                    $("#idReservation").val("");
                    $("#startDate").val("");
                    $("#devolutionDate").val("");
                    $("#status").val("");
                    $("#cloud2").val(0);
                    $("#client2").val(0);
                },
                505: function(){
                    alert("Ocurrio un error en el consumo");
                }
            }
        });
    }
}

function seleccionarReservation(idReservation){
    //console.log(idCloud);
    $.ajax({
        url:"http://localhost:8080/api/Reservation/"+idReservation,
        type:"GET",
        datatype:"json",
        success: function (response) {
            $("#idReservation").val(response.idReservation);
            $("#idReservation").attr("readonly", true);
            $("#startDate").val(response.startDate);
            $("#devolutionDate").val(response.devolutionDate);
            $("#status").val(response.status);
            $("#cloud2").val(response.cloud.id);
            $("#client2").val(response.client.idClient);
        },
        error: function(xhr, status){
            alert("Ocurrió un error en el consumo.");
        }
    });
}

function actualizarReservation(){
    var idReservation = $("#idReservation").val();
    $("#idReservation").attr("readonly", true);
    
    if(idReservation.length == 0) {
        alert("No se ha seleccionado un registro.");
    }else{
        var idReservation = $("#idReservation").val();
        var startDate = $("#startDate").val();
        var devolutionDate = $("#devolutionDate").val();
        var status = $("#status").val();
        var bike = $("#bike2").val();
        var client = $("#client2").val();

        var data={
            idReservation:idReservation, 
            startDate:startDate, 
            devolutionDate:devolutionDate, 
            status:status,
            bike:{
                id:bike
            },
            client:{
                idClient:client
            }
        };

        $.ajax({
            url:"http://localhost:8080/api/Reservation/update",
            type:"PUT",
            datatype:"json",
            data:JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            },
            statusCode: {
                201: function(){
                    consultarReservation();
                    $("#idReservation").val("");
                    $("#startDate").val("");
                    $("#devolutionDate").val("");
                    $("#status").val("");
                    $("#bike2").val(0);
                    $("#client2").val(0);
                },
                505: function(){
                    alert("Ocurrio un error en el consumo");
                }
            }
        });
    }
}

function eliminarReservation(idReservation){
    let myData={
        idReservation:idReservation
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://localhost:8080/api/Reservation/"+idReservation,
        type:"DELETE",
        data:dataToSend,
        datatype:"json",
        contentType:"application/json",
        success:function(respuesta){
            consultarReservation();
        }
    });
}

function recargarReservation(){
    consultarReservation();
    $("#idReservation").val("");
    $("#startDate").val();
    $("#devolutionDate").val();
    $("#status").val("");
    $("#cloud2").val(0);
    $("#client2").val(0);
}

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Funciones para la tabla message
function consultarMessage(){
    $.ajax({
        url: "http://localhost:8080/api/Message/all",
        type:"GET",
        datatype:"json",
        success: function (response) {
            $("#contenidoTablaMessage").empty();
            response.forEach(element => {
                var row = $("<tr>");
                row.append($("<td>").text(element.idMessage));
                row.append($("<td>").text(element.messageText));
                row.append($("<td>").text(element.cloud.name));
                row.append($("<td>").text(element.client.name));
                row.append($("<td>").append('<button type="button" class="btn btn-outline-light" onclick="seleccionarMessage('+element.idMessage+')" >Seleccionar</button>'));
                row.append($("<td>").append('<button type="button" class="btn btn-outline-light" onclick="eliminarMessage('+element.idMessage+')" >Eliminar</button>'));
                $("#contenidoTablaMessage").append(row);
            });
        },
        error: function(xhr,status) {
            alert("Ocurrio un error en el consumo.");
        }
    });
}

function crearMessage(){
    $("#idMessage").attr("readonly", true);
    var messageText = $("#messagetext").val();
    var bike = $("#bike").val();
    var client = $("#client").val();

    if($("#messagetext").val() == "" || $("#bike").val() == 0 || $("#client").val() == 0){
        alert("Faltan campos por llenar");
    }else{
        var data = {
            messageText:messageText, 
            bike:{
                id:bike
            },
            client:{
                idClient:client
            }
        };
    
        $.ajax({
            url: "http://localhost:8080/api/Message/save",
            type: "POST",
            datatype: "json",
            data:JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            },
            statusCode: {
                201: function(){
                    consultarMessage();
                    $("#idMessage").val("");
                    $("#messagetext").val("");
                    $("#cloud").val(0);
                    $("#client").val(0);
                },
                505: function(){
                    alert("Ocurrio un error en el consumo");
                }
            }
        });
    }
}

function seleccionarMessage(idMessage) {
    //console.log(idCloud);
    $.ajax({
        url: "http://localhost:8080/api/Message/"+idMessage,
        type:"GET",
        datatype:"json",
        success: function (response) {
            //console.log(response.items[0].id);
            //console.log(response.items[0]);
            $("#idMessage").val(response.idMessage);
            $("#idMessage").attr("readonly", true);
            $("#messagetext").val(response.messageText);
            $("#cloud").val(response.cloud.id);
            $("#client").val(response.client.idClient);
        },
        error: function(xhr, status){
            alert("Ocurrió un error en el consumo.");
        }
    });
}

function actualizarMessage(){
    var idMessage = $("#idMessage").val();
    $("#idMessage").attr("readonly", true);
    
    if(idMessage.length == 0) {
        alert("No se ha seleccionado un registro.");
    }else{
        var idMessage = $("#idMessage").val();
        var messageText = $("#messagetext").val();
        var bike = $("#bike").val();
        var client = $("#client").val();

        var data={
            idMessage:idMessage, 
            messageText:messageText, 
            bike:{
                id:bike
            },
            client:{
                idClient:client
            }
        };

        $.ajax({
            url:"http://localhost:8080/api/Message/update ",
            type:"PUT",
            datatype:"json",
            data:JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            },
            statusCode: {
                201: function(){
                    consultarMessage();
                    $("#idMessage").val("");
                    $("#messagetext").val("");
                    $("#bike").val(0);
                    $("#client").val(0);
                },
                505: function(){
                    alert("Ocurrio un error en el consumo");
                }
            }
        });
    }
}

function eliminarMessage(idMessage){
    let myData={
        idMessage:idMessage
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://localhost:8080/api/Message/"+idMessage,
        type:"DELETE",
        data:dataToSend,
        datatype:"json",
        contentType:"application/json",
        success:function(respuesta){
            consultarMessage();
        }
    });
}

function recargarMessage(){
    $("#idMessage").val("");
    $("#messagetext").val("");
}

//------------------------------------------------------------------------------------------------------------
//Modales

//Modal para crear la categoria
function crearCategoria(){
    var name = $("#nameCategory").val();
    var description = $("#desc").val();

    var data = {
        name:name, 
        description:description
    };

    $.ajax({
        url: "http://localhost:8080/api/Category/save",
        type: "POST",
        datatype: "json",
        data:JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        },
        statusCode: {
            201: function(){
                $("#nameCategory").val("");
                $("#desc").val("");
                cargarCategorias();
            },
            505: function(){
                alert("Ocurrio un error en el consumo");
            }
        }
    });
}

//------------------------------------------------------------------------------------------------------------
//cargar

function cargarCategorias(){
    $.ajax({
        url:"http://localhost:8080/api/Category/all",
        type:"GET",
        datatype:"json",
        success: function (response) {
            $("#categoryAdd").empty();
            $("#categoryAdd").append($("<option>").val(0).text("Seleccione una categoría"));
            response.forEach(element => {
                var option = $("<option>");
                option.attr("value", element.id);
                option.text(element.name);
                $("#categoryAdd").append(option);
            });
        },
        error: function(xhr,status) {
            alert("Ocurrio un error en el consumo.");
        }
    });
}

function cargarBike(){
    $.ajax({
        url:"http://localhost:8080/api/Bike/all",
        type:"GET",
        datatype:"json",
        success: function (response) {
            $("#bike").empty();
            $("#bike").append($("<option>").val(0).text("Seleccione una nube"));
            response.forEach(element => {
                var option = $("<option>");
                option.attr("value", element.id);
                option.text(element.name);
                $("#bike").append(option);
            });
        },
        error: function(xhr,status) {
            alert("Ocurrio un error en el consumo.");
        }
    });
}

function cargarClient(){
    $.ajax({
        url:"http://localhost:8080/api/Client/all",
        type:"GET",
        datatype:"json",
        success: function (response) {
            $("#client").empty();
            $("#client").append($("<option>").val(0).text("Seleccione un cliente"));
            response.forEach(element => {
                var option = $("<option>");
                option.attr("value", element.idClient);
                option.text(element.name);
                $("#client").append(option);
            });
        },
        error: function(xhr,status) {
            alert("Ocurrio un error en el consumo.");
        }
    });
}

function cargarBike2(){
    $.ajax({
        url:"http://localhost:8080/api/Cloud/all",
        type:"GET",
        datatype:"json",
        success: function (response) {
            $("#bike2").empty();
            $("#bike2").append("<option value=''>Seleccione una nube</option>");
            response.forEach(element => {
                var option = $("<option>");
                option.attr("value", element.id);
                option.text(element.name);
                $("#bike2").append(option);
            });
        },
        error: function(xhr,status) {
            alert("Ocurrio un error en el consumo.");
        }
    });
}

function cargarClient2(){
    $.ajax({
        url:"http://localhost:8080/api/Client/all",
        type:"GET",
        datatype:"json",
        success: function (response) {
            $("#client2").empty();
            $("#client2").append("<option value=''>Seleccione un cliente</option>");
            response.forEach(element => {
                var option = $("<option>");
                option.attr("value", element.idClient);
                option.text(element.name);
                $("#client2").append(option);
            });
        },
        error: function(xhr,status) {
            alert("Ocurrio un error en el consumo.");
        }
    });
}

//Informes

//Conteo reservas
function reporteReservasFecha(){
    $("#conteo").attr("readonly", true);
    var d1 = $("#d1").val();
    var d2 = $("#d2").val();

    //console.log(d1+"  "+d2);

    $.ajax({
        url:"http://localhost:8080/api/Reservation/report-dates/amount/"+d1+"/"+d2+"",
        type:"GET",
        datatype:"json",
        success: function (response) {
            //console.log(response);
            //$("#completed").val(response.completed);
            $("#conteo").val(response);
        },
        error: function(xhr,status) {
            alert("Ocurrio un error en el consumo.");
        }
    });
}

//Conteo reservas canceladas y completadas 
function reservasCancellCompleted(){
    $("#completed").attr("readonly", true);
    $("#cancelled").attr("readonly", true);
    $.ajax({
        url:"http://localhost:8080/api/Reservation/report-status",
        type:"GET",
        datatype:"json",
        success: function (response) {
            $("#completed").val(response.completed);
            $("#cancelled").val(response.cancelled);
        },
        error: function(xhr,status) {
            alert("Ocurrio un error en el consumo.");
        }
    });
}

//Top mejores clientes
function topClientes(){
    $.ajax({
        url:"http://localhost:8080/api/Reservation/report-clients",
        type:"GET",
        datatype:"json",
        success: function (response) {
            //console.log(response);
            $("#contenidoTop_client").empty();
            response.forEach(element => {
                var row = $("<tr>");
                row.append($("<td>").text(element.client.name));
                row.append($("<td>").text(element.total));
                $("#contenidoTop_client").append(row);
            });
        },
        error: function(xhr,status) {
            alert("Ocurrio un error en el consumo.");
        }
    });
}

//Cargar página y todas las tablas
$(document).ready(function(){
    cargarCategorias();

    consultarCloud();
    consultarClient();

    cargarCloud();
    cargarClient();
    consultarReservation();

    cargarCloud2();
    cargarClient2();
    consultarMessage();

    reservasCancellCompleted();
    topClientes();
    //consultarCategory();
})