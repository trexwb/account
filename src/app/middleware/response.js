/*** 
 * @Author: trexwb
 * @Date: 2024-01-17 16:49:29
 * @LastEditors: trexwb
 * @LastEditTime: 2024-08-23 17:32:49
 * @FilePath: /drive/Users/wbtrex/website/localServer/node/damei/laboratory/microservice/account/src/app/middleware/response.js
 * @Description: 
 * @一花一世界，一叶一如来
 * @Copyright (c) 2024 by 杭州大美, All Rights Reserved. 
 */
'use strict';

// require('dotenv').config();
// console.log(process.env.NODE_ENV, process.env);
// const status = require('@utils/status');

// const cacheInterface = require('@interface/cache');
// const dbInterface = require('@interface/database');

// const errorCode = (code) => {
// 	const statusMap = status.statusMap;
// 	return {
// 		error: {
// 			code: code,
// 			msg: statusMap[code] || ''
// 		}
// 	}
// }

module.exports = {
  factory: async (name, args, context, next) => {
    const utils = require('@utils/index');
    const cryptTool = require('@utils/cryptTool');
    let result = await next(name, args, context);
    // result.then(function (result) {
    // 	console.log("after invoke:", name, args, result);
    // });
    // const statusMap = status.statusMap;
    // if((typeof result === 'number' || Number(result) !== NaN) && statusMap[result]){
    // 	result =  errorCode(result);
    // }
    if (result && process.env.RETURN_ENCRYPT === 'true') {// && name !== 'rpc_getFunctions'
      if (!context.secretRow) {
        const headers = context.request.headers;
        const secretsHelper = require('@helper/secrets');
        const appId = headers['app-id'] || false;
        context.secretRow = await secretsHelper.getAppId(appId);
      }
      // 加密后响应
      const key = context.secretRow?.app_secret || '';
      const iv = utils.generateRandomString(16);
      const encryptedText = cryptTool.encrypt(result, key, iv);
      result = {
        iv: iv,
        encryptedData: encryptedText
      }
      // 解密数据
      // const decryptedData = cryptTool.decrypt(encryptedText, key, iv); // cryptTool.decrypt(encryptedText, key, Buffer.from(iv.toString('hex'), 'hex'));
      // console.log('解密后的数据:', decryptedData);
    }
    // try {
    // 	// 输出前关闭数据库
    // 	const cacheInterface = require('@interface/cache');
    // 	cacheInterface.destroy();
    // } catch (e) { }
    // try {
    // 	// 输出前关闭数据库
    // 	const dbInterface = require('@interface/database');
    // 	dbInterface.destroy();
    // } catch (e) { }
    return result;
  }
}