/*** 
 * @Author: trexwb
 * @Date: 2024-01-09 09:04:23
 * @LastEditors: trexwb
 * @LastEditTime: 2024-08-23 17:33:28
 * @FilePath: /drive/Users/wbtrex/website/localServer/node/damei/laboratory/microservice/account/src/app/schedule/components/cacheTask.js
 * @Description: 
 * @一花一世界，一叶一如来
 * @Copyright (c) 2024 by 杭州大美, All Rights Reserved. 
 */
'use strict';

module.exports = async function () {
  const cacheInterface = require('@interface/cache');
  await cacheInterface.clearCacheByTag('permissions');
  await cacheInterface.clearCacheByTag('roles');
  await cacheInterface.clearCacheByTag('secrets');
  await cacheInterface.clearCacheByTag('users');
  // 这里写你的定时任务逻辑
  console.log('定时任务执行时间:', new Date());
}