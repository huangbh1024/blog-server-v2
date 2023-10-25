import {
  WSController,
  OnWSConnection,
  WSBroadCast,
  OnWSDisConnection,
  App,
} from '@midwayjs/core';
import { Application } from '@midwayjs/ws';
@WSController()
export class onlineCountSocketController {
  @App('webSocket')
  wsApp: Application;

  @WSBroadCast()
  @OnWSConnection()
  async onConnectionMethod() {
    this.wsApp.clients.forEach(client => {
      if (client.readyState === 1)
        client.send(JSON.stringify({ onlineCount: this.wsApp.clients.size }));
    });
  }

  @OnWSDisConnection()
  async onDisConnectionMethod() {
    this.wsApp.clients.forEach(client => {
      if (client.readyState === 1)
        client.send(JSON.stringify({ onlineCount: this.wsApp.clients.size }));
    });
  }
}
