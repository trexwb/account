/*** 
 * @Author: trexwb
 * @Date: 2024-01-29 08:30:55
 * @LastEditors: trexwb
 * @LastEditTime: 2024-07-08 16:27:16
 * @FilePath: /drive/Users/wbtrex/website/localServer/node/damei/laboratory/microservice/account/src/app/model/secrets.js
 * @Description: 
 * @一花一世界，一叶一如来
 * @Copyright (c) 2024 by 杭州大美, All Rights Reserved. 
 */
'use strict';

const databaseCast = require('@cast/database');
const baseModel = require('./base');

const secretsModel = {
  $table: `${databaseCast.prefix}secrets`,// 为模型指定表名
  $primaryKey: 'id', // 默认情况下指定'id'作为表主键，也可以指定主键名
  $fillable: [
    'channel',
    'app_id',
    'permissions',
    'extension',
    'status',
    'created_at',
    'updated_at'
  ],// 定义允许添加、更新的字段白名单，不设置则无法添加数据
  $guarded: ['id'],// 定义不允许更新的字段黑名单
  $casts: {
    channel: 'string',
    app_id: 'string',
    app_secret: 'string',
    status: 'integer',
    extension: 'json'
  },
  $hidden: [
    'app_secret',
    'deleted_at'
  ],
  ...baseModel
}

module.exports = secretsModel;