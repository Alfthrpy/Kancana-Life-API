import SSE from "express-sse";

const sse = new SSE();

class SSEInstance {
  static initSSE() {
    return sse.init;
  }

  static sendData(data){
    sse.send(data)
  }
}

export default SSEInstance