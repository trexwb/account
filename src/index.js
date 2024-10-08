/*** 
 * @Author: trexwb
 * @Date: 2024-02-01 14:48:18
 * @LastEditors: trexwb
 * @LastEditTime: 2024-08-23 17:32:03
 * @FilePath: /drive/Users/wbtrex/website/localServer/node/damei/laboratory/microservice/account/src/index.js
 * @Description: 
 * @一花一世界，一叶一如来
 * @Copyright (c) 2024 by 杭州大美, All Rights Reserved.
 */
'use strict';

require('dotenv').config();
require('module-alias/register');
function initApp() {
  const hprose = require("hprose");
  // 建议使用 http://0.0.0.0 可以兼容到任意服务的转发
  const server = hprose.Server.create(`${process.env.APP_URL || 'http://0.0.0.0'}:${process.env.PORT || 8000}`);

  // 事件
  const eventEmitter = require('@event/index');
  server.use(async (name, args, context, next) => {
    context.eventEmitter = eventEmitter;
    return await next(name, args, context);
  });

  // 安全校验
  const middlewareVerify = require('@middleware/verify');
  if (process.env.XSS === 'true') { server.use(middlewareVerify.sanitizeInput); } // xss过滤
  server.use(middlewareVerify.token); // app校验
  if (process.env.REQUEST_ENCRYPT === 'true') { server.use(middlewareVerify.sign); } // 数据加密传输

  // 统一返回
  const middlewareResponse = require('@middleware/response');
  server.use(middlewareResponse.factory);

  const middlewareRoute = require('@middleware/route');
  middlewareRoute.controller(server);

  console.log(`Server running at ${process.env.APP_URL || 'http://0.0.0.0'}:${process.env.PORT || 8000}/`);
  server.start();
}

if (process.env.MULTIPLE_PROCESSES === "true") {
  const cluster = require('cluster');
  if (cluster.isMaster) {
    // 主进程
    const os = require('os');
    const cpuCount = os.cpus().length;

    for (let i = 0; i < cpuCount; i++) {
      cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
      console.log(`工作进程 ${worker.process.pid} 已退出`);
      cluster.fork();
    });
  } else {
    initApp();
  }
} else {
  initApp();
}

// 计划任务
const schedule = require('@schedule/index');
schedule.handler();

// 消息消费
const job = require('@job/index');
job.queue.handler();

// FC/serverless 相关方法
exports.handler = async function (event, context) {
  // console.log("event: \n" + event);
  return "Success";
};
exports.initialize = function (context, callback) {
  // console.log('initializer');
  callback(null, "");
};
module.exports.preFreeze = function (context, callback) {
  try {
    // 销毁服务前关闭数据库
    const cacheInterface = require('@interface/cache');
    cacheInterface.destroy();
  } catch (e) { }
  try {
    // 销毁服务前关闭数据库
    const dbInterface = require('@interface/database');
    dbInterface.destroy();
  } catch (e) { }
  try {
    // 销毁服务前关闭数据库
    const job = require('@job/index');
    job.queue.destroy();
  } catch (e) { }
  callback(null, "");
};
module.exports.preStop = function (context, callback) {
  try {
    // 销毁服务前关闭数据库
    const cacheInterface = require('@interface/cache');
    cacheInterface.destroy();
  } catch (e) { }
  try {
    // 销毁服务前关闭数据库
    const dbInterface = require('@interface/database');
    dbInterface.destroy();
  } catch (e) { }
  try {
    // 销毁服务前关闭数据库
    const job = require('@job/index');
    job.queue.destroy();
  } catch (e) { }
  callback(null, '');
}