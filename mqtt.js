const host = "test.mosquitto.org";

//try 8080,8081,1883,1884
const port = 8080;
const topic = "guest.com/cdfe45dgbhf9/user/all";
let client;


function connect(){
	try{
		// create a client instance
		client = new Paho.MQTT.Client(host, port, "");

		// set callback handlers
		client.onConnectionLost = function(){console.log('Connection lost')};
		client.onMessageArrived = onMessage;

		// connect the client
		client.connect({
			onSuccess : () => {
			    console.log("connected");
			    
				// subscribe to the topic
				client.subscribe(topic);
			},
			onFailure : () => {
				console.log("failed to connect");
			}
		});
	}
	catch(err){
		console.log(err);
	}
}


// calls when message arrives
function onMessage(mgs){
  	mgs = JSON.parse(mgs.payloadString);
  	let html = document.getElementById('window').innerHTML + `<div>${mgs.m}</div>`;
  	document.getElementById('window').innerHTML = html;
}



// publish a message
function publish(){
	let m = document.getElementById('message').value;

	let data = JSON.stringify({m});
	let mgs = new Paho.MQTT.Message(data);
	mgs.destinationName = topic;
	client.send(mgs);

	document.getElementById('message').value = '';
}



