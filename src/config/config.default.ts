import { MidwayConfig } from '@midwayjs/core';
import { getConfig } from '../utils';
const databaseConfig = getConfig('database');
export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1697533218331_4480',
  koa: {
    port: 7001,
  },
  typeorm: {
    dataSource: {
      default: {
        ...databaseConfig,
        type: 'mysql',
        synchronize: true,
        logging: false,
        entities: ['**/entity/*.entity{.ts,.js}'],
      },
    },
  },
  socketIO: {
    cors: {
      origin: '*',
    },
  },
} as MidwayConfig;
