/*** 
 * @Author: trexwb
 * @Date: 2024-01-12 16:38:52
 * @LastEditors: trexwb
 * @LastEditTime: 2024-08-23 17:29:12
 * @FilePath: /drive/Users/wbtrex/website/localServer/node/damei/laboratory/microservice/account/src/app/controller/users.js
 * @Description: 
 * @一花一世界，一叶一如来
 * Copyright (c) 2024 by 杭州大美, All Rights Reserved. 
 */
'use strict';

// require('dotenv').config();
// console.log(process.env.NODE_ENV, process.env);
const status = require('@utils/status');
const logInterface = require('@interface/log');

async function usersList(filter = {}, sort = null, page = 1, pageSize = 10, context) { // usersList(...args) {
  // // 获取上下文
  // const statusSrgs = status.getContext(args);
  // const context = statusSrgs.context;
  // const [filter = {}, sort = null, page = 1, pageSize = 10] = statusSrgs.params;
  if (!status.havePermissions('accountUsers', 'read', context?.secretRow?.permissions)) {
    return status.error('No relevant operation authority.');
  }
  try {
    let order = null;
    const regex = /^([+-])(.*?)$/si;
    const match = (sort || '').match(regex);
    if (match) {
      order = [{ column: match[2], order: match[1] === '-' ? 'DESC' : 'ASC' }];
    }
    if (!filter) filter = {};
    const usersHelper = require('@helper/users');
    return await usersHelper.getList(filter, order, page || 1, pageSize || 10);
  } catch (error) {
    logInterface.writeError(__filename + ':' + error.toString());
    return false;
  }
}

async function usersDetail(id = null, context) { // usersDetail(...args) {
  // // 获取上下文
  // const statusSrgs = status.getContext(args);
  // const context = statusSrgs.context;
  // const [id = null] = statusSrgs.params;
  if (!status.havePermissions('accountUsers', 'read', context?.secretRow?.permissions)) {
    return status.error('No relevant operation authority.');
  }
  if (!id) {
    return status.error('ID Not Empty');
  }
  try {
    const usersHelper = require('@helper/users');
    if (typeof id === 'number' || !isNaN(id)) {
      return await usersHelper.getId(Number(id));
    }
    return await usersHelper.getRow(id);
  } catch (error) {
    logInterface.writeError(__filename + ':' + error.toString());
    return false;
  }
}

async function usersSave(data = null, context) { // usersSave(...args) {
  // // 获取上下文
  // const statusSrgs = status.getContext(args);
  // const context = statusSrgs.context;
  // const [data = null] = statusSrgs.params;
  if (!status.havePermissions('accountUsers', 'write', context?.secretRow?.permissions)) {
    return status.error('No relevant operation authority.');
  }
  if (!data) {
    return status.error('Data Not Empty');
  }
  if (!data.nickname) {
    return status.error('Nickname Not Empty');
  }
  if (!data.email && !data.mobile) {
    return status.error('email/mobile Not Empty');
  }
  try {
    const usersHelper = require('@helper/users');
    const userRow = await usersHelper.getList({
      account: true,
      email: data.email || false,
      mobile: data.mobile || false
    });
    if (userRow.total) {
      return status.error('Account Error');
    }
    const lastId = await usersHelper.save(data); // 返回的是数组
    return {
      user_id: lastId[0] || lastId
    };
  } catch (error) {
    logInterface.writeError(__filename + ':' + error.toString());
    return false;
  }
}

// 启用
async function usersEnable(id = null, context) { // usersEnable(...args) {
  // // 获取上下文
  // const statusSrgs = status.getContext(args);
  // const context = statusSrgs.context;
  // const [id = null] = statusSrgs.params;
  if (!status.havePermissions('accountUsers', 'write', context?.secretRow?.permissions)) {
    return status.error('No relevant operation authority.');
  }
  if (!id) {
    return status.error('ID Not Empty');
  }
  try {
    const usersHelper = require('@helper/users');
    return await usersHelper.update({
      id: id
    }, {
      status: 1
    });
  } catch (error) {
    logInterface.writeError(__filename + ':' + error.toString());
    return false;
  }
}

// 禁用
async function usersDisable(id = null, context) { // usersDisable(...args) {
  // // 获取上下文
  // const statusSrgs = status.getContext(args);
  // const context = statusSrgs.context;
  // const [id = null] = statusSrgs.params;
  if (!status.havePermissions('accountUsers', 'write', context?.secretRow?.permissions)) {
    return status.error('No relevant operation authority.');
  }
  if (!id) {
    return status.error('ID Not Empty');
  }
  try {
    const usersHelper = require('@helper/users');
    return await usersHelper.update({
      id: id
    }, {
      status: 0
    });
  } catch (error) {
    logInterface.writeError(__filename + ':' + error.toString());
    return false;
  }
}

async function usersRestore(id = null, context) { // usersRestore(...args) {
  // // 获取上下文
  // const statusSrgs = status.getContext(args);
  // const context = statusSrgs.context;
  // const [id = null] = statusSrgs.params;
  if (!status.havePermissions('accountUsers', 'delete', context?.secretRow?.permissions)) {
    return status.error('No relevant operation authority.');
  }
  if (!id) {
    return status.error('ID Not Empty');
  }
  try {
    const usersHelper = require('@helper/users');
    return await usersHelper.restore({ id });
  } catch (error) {
    logInterface.writeError(__filename + ':' + error.toString());
    return false;
  }
}

async function usersDelete(id = null, context) { // usersDelete(...args) {
  // // 获取上下文
  // const statusSrgs = status.getContext(args);
  // const context = statusSrgs.context;
  // const [id = null] = statusSrgs.params;
  if (!status.havePermissions('accountUsers', 'delete', context?.secretRow?.permissions)) {
    return status.error('No relevant operation authority.');
  }
  if (!id) {
    return status.error('ID Not Empty');
  }
  try {
    const usersHelper = require('@helper/users');
    return await usersHelper.delete({ id });
  } catch (error) {
    logInterface.writeError(__filename + ':' + error.toString());
    return false;
  }
}

module.exports = {
  usersList,
  usersDetail,
  usersSave,
  usersEnable,
  usersDisable,
  usersRestore,
  usersDelete,
};