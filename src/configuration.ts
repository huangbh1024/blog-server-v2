import { Configuration, App } from '@midwayjs/core';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import { join } from 'path';
import { AllErrorFilter } from './filter/base.exception.filter';
import { ReportMiddleware } from './middleware/report.middleware';
import { FormatMiddleware } from './middleware/format.middleware';
import * as swagger from '@midwayjs/swagger'; // 引入 swagger 组件
import * as axios from '@midwayjs/axios'; // 引入 axios 组件
import * as orm from '@midwayjs/typeorm'; // 引入 orm 组件
import * as socketio from '@midwayjs/socketio'; // 引入 socketio 组件

@Configuration({
  imports: [
    koa,
    validate,
    swagger,
    axios,
    orm,
    socketio,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
  ],
  importConfigs: [join(__dirname, './config')],
})
export class MainConfiguration {
  @App('koa')
  app: koa.Application;

  async onReady() {
    // add middleware
    this.app.useMiddleware([ReportMiddleware, FormatMiddleware]);
    // add filter
    this.app.useFilter([AllErrorFilter]);
  }
}
