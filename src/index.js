import CoCreateSocket from "@cocreate/socket"
import {getCommonParams, getCommonParamsExtend, generateSocketClient} from "@cocreate/crud/src/common-fun.js"

let socket = new CoCreateSocket('ws');

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
}

export default function Message(socket) {
  CoCreateMessage.setSocket(socket)
  return CoCreateMessage;
};

