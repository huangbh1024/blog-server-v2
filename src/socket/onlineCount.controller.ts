import {
  App,
  Inject,
  OnWSConnection,
  OnWSDisConnection,
  WSController,
} from '@midwayjs/core';
import { Application as SocketApplication, Context } from '@midwayjs/socketio';

@WSController('/onlineCount')
export class onlineCountSocketController {
  @App('socketIO')
  socketApp: SocketApplication;

  @Inject()
  ctx: Context;

  @OnWSConnection()
  async onConnectionMethod() {
    this.ctx.nsp.emit('onlineCount', this.socketApp.engine.clientsCount);
  }

  @OnWSDisConnection()
  async onDisConnectionMethod() {
    this.ctx.nsp.emit('onlineCount', this.socketApp.engine.clientsCount);
  }
}
