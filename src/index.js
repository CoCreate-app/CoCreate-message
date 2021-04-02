import CoCreateSocket from "@cocreate/socket-client"
import {getCommonParams, getCommonParamsExtend, generateSocketClient} from "@cocreate/socket-client/src/common-fun.js"

let message_socket = new CoCreateSocket('ws');

const CoCreateMessage = {
  socket: null,
  setSocket: function(socket) {
    this.socket = socket;
  },
 /*
 CoCreate.message.send({
    namespace: '',
    room: '',
    broadcast: true/false,
    broadcast_sender: true/false
    
    rooms: [r1, r2],
    emit: {
      message': 'nice game',
      data': 'let's play a game ....'
    }
  })
 */
  send: function(data) {
    let request_data = getCommonParams();
    
    if (!data || !data.emit) {
      return;     
    }
    request_data = {...request_data, ...data}
    
    /** socket parameters **/
    // if (data['broadcast'] === undefined) {
    //   request_data['broadcast'] = true;
    // }
    // if (data['broadcast_sender'] === undefined) {
    //   request_data['broadcast_sender'] = true;
    // }
    const room = generateSocketClient(data.namespace, data.room);
    
    this.socket.send('sendMessage', request_data, room)
  },
 
  receive: function(message, fun) {
    this.socket.listen(message, fun);
  },
 
 	createSocket: function(host, namespace) {
 	  if (!this.socket) return;
 	  
		if (namespace) {
			this.socket.create({
				namespace: namespace, 
				room: null,
				host: host
			});
			this.socket.setGlobalScope(namespace);
		} else {
			this.socket.create({
				namespace: null, 
				room: null,
				host: host
			});
		}
	},
	
	listen: function(message, fun) {
    this.socket.listen(message, fun);
  },
  
  listenAsync: function(eventname) {
    this.socket.listenAsync(eventname);
  },
}

CoCreateMessage.setSocket(message_socket);
CoCreateMessage.createSocket(window.config.host ? window.config.host : 'server.cocreate.app', window.config.organization_Id)

export default CoCreateMessage;

