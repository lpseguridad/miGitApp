function updateDateTime() {
  var currentdate = new Date(); 
  var datetime =  currentdate.getDate() + "/"
  + (currentdate.getMonth()+1)  + "/" 
  + currentdate.getFullYear() + " Hora: "  
  + currentdate.getHours() + ":"  
  + currentdate.getMinutes() + ":" 
  + currentdate.getSeconds();
  document.getElementById("update-time").innerHTML = datetime;
  console.log(datetime);
}

var gateway = `ws://${window.location.hostname}/ws`;
var websocket;
window.addEventListener('load', onload);

function onload(event) {
    initWebSocket();
}

function inicio_conexion(){
    websocket.send("Bienvenido");
	updateDateTime();
}

function initWebSocket() {
    console.log('Intentando abrir una conexion WebSoket');
    websocket = new WebSocket(gateway);
    websocket.onopen = onOpen;
    websocket.onclose = onClose;
    websocket.onmessage = onMessage;
}

function onOpen(event) {
    console.log('Abriendo Conexion...');
    inicio_conexion();
}

function onClose(event) {
    console.log('Conexion Cerrada');
    setTimeout(initWebSocket, 2000);
}

////////////Recibir mensajes///////////
function onMessage(event) {
    console.log(event.data);
	
	var splitted = event.data.toString().split(",");
	var lampara1 = splitted[0];
	
	var inputChecked_L1;
	
	if(lampara1 == "1"){
		inputChecked_L1 = true;
		document.getElementById("led").checked = inputChecked_L1;
    }else{
		inputChecked_L1 = false;
		document.getElementById("led").checked = inputChecked_L1;
	}
	
}

////botones
function sw1_change(){
	var inputChecked_sw1;
   inputChecked_sw1 = document.getElementById("led").checked;
   if(inputChecked_sw1 == true){
    console.log("Mensaje sw1 1")
	websocket.send("sw1_1");
  }else{
    console.log("Mensaje sw1 0")
	websocket.send("sw1_0");
    }
}

// Create an Event Source to listen for events
if (!!window.EventSource) {
    var source = new EventSource('/events');
  
    source.addEventListener('open', function(e) {
      console.log("Evento Conectado");
    }, false);
  
    source.addEventListener('error', function(e) {
      if (e.target.readyState != EventSource.OPEN) {
        console.log("Evento Desconectado");
      }
    }, false);
  
  
    source.addEventListener('Fecha_Reloj', function(e) {
      console.log("Fecha_Reloj", e.data);
  
      var splitted = e.data.toString().split(",");
  
      var tiempo = splitted[0];
      var display_temperatura = splitted[1];
      //console.log(display_temperatura);


      //document.getElementById("displayTemperatura").innerHTML = display_temperatura;
        
       if(tiempo == "reloj"){
        updateDateTime();
      }
    }, false);
	
  
  }
