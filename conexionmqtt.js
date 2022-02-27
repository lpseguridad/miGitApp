/////////////////////////////////////////
/////////////// Autenticacion////////////
/////////////////////////////////////////


url = "https://realtime.ably.io/event-stream?";
version = "1.2"
username = "zALUDA.HqY5zQ";  //cambia esto por las credenciales que vas hacer en Ably.com
password = "IK8YYCcIFx8lEYJIUn7tWAdHyZoXeCTEGcuhJcvlPJ8"; // cambia esto por las credenciales que vas hacer en Ably.com
topic_raiz = "ok";   // este lo puedes cambiar despues, pero si lo cambias lo modificas tambien el el programa de arduino
topic_conexion = "/conexion";
topic_datos_lamparas = "/datos_lamparas";  // este lo puedes cambiar despues, pero si lo cambias lo modificas tambien el el programa de arduino

    // // Mensajes
    mensaje_inicial = "Desconectado"
    clientId=  " WEB LP_Seguridad--->> " + Math.floor((Math.random() * 1000000) + 1);

var ably = new Ably.Realtime(username+':'+password);

   var channel = ably.channels.get(topic_raiz+topic_conexion);
   channel.publish(clientId, mensaje_inicial);                    // publicar siempre que inice el servidor web con mensaje de inicio

  //recibir mensajes de los topicos suscritos de conexion y desconexion

  var conexion = url+'channels='+topic_raiz+'&v='+version+'&key='+username+':'+password;
  var eventSource = new EventSource(conexion);

  eventSource.onmessage = function(event) {
    var message = JSON.parse(event.data);
  
    var topic = message.channel;
  // Decodificar mensaje
  var decodedString = atob(message.data);
  console.log('Topic: ' + message.channel + '  Mensaje: ' + decodedString ); 
  
  if (topic == topic_raiz){
    var splitted = decodedString.toString().split(",");
    var conex = splitted[0];

    if(conex == "Conectado" || conex == "Desconectado"){
      document.getElementById("displayconexion").innerHTML = conex;
    }
  }
  };
  //////////////////////////////////////////////

  var conexion_2 = url+'channels='+topic_raiz+topic_datos_lamparas+'&v='+version+'&key='+username+':'+password;
  var eventSource = new EventSource(conexion_2);

  eventSource.onmessage = function(event) {
    var message = JSON.parse(event.data);
  
    var topic = message.channel;
  // Decodificar mensaje
  var decodedString = atob(message.data);
  console.log('Topic: ' + message.channel + '  Mensaje: ' + decodedString ); 
  
  if (topic == topic_raiz+topic_datos_lamparas){
    var splitted = decodedString.toString().split(",");
    var switch1 = splitted[0];
    var inputChecked_L1;

    if(switch1 == "1"){
      inputChecked_L1 = true;

      document.getElementById("display_sw1").checked = inputChecked_L1;    
    }else{
      inputChecked_L1 = false;
      document.getElementById("display_sw1").checked = inputChecked_L1;
    }
  }
  };

  ////////////////////////////////////////////////////////

  function sw1_change(){

    var channel = ably.channels.get(topic_raiz+"/actions/sw1");
    var inputChecked_sw1;

    inputChecked_sw1 = document.getElementById("display_sw1").checked;
     
    if (inputChecked_sw1 == true){
      channel.publish(clientId, "1"); 
      console.log('Mensaje sw1 on');
    }else{
      channel.publish(clientId, "0"); 
      console.log('Mensaje sw1 off');
    }
  }


  // este codigo es gran parte de mi autoria, espero te funcione y avances en tus proyectos.
  //Dios te bendiga.
