/*** 
 * @Author: trexwb
 * @Date: 2024-01-12 16:38:52
 * @LastEditors: trexwb
 * @LastEditTime: 2024-02-21 15:02:58
 * @FilePath: /laboratory/microservice/account/src/app/controller/users.js
 * @Description: 
 * @一花一世界，一叶一如来
 * Copyright (c) 2024 by 杭州大美, All Rights Reserved. 
 */
// require('dotenv').config();
// console.log(process.env.NODE_ENV, process.env);
const status = require('@utils/status');

async function usersList(filter, sort, page, pageSize) {
  let order = null;
  const regex = /^([+-])(.*?)$/si;
  const match = (sort || '').match(regex);
  if (match) {
    order = [{ column: match[2], order: match[1] === '-' ? 'DESC' : 'ASC' }];
  }
  const usersHelper = require('@helper/users');
  const userRows = await usersHelper.getList(filter, order, page || 1, pageSize || 10);
  return userRows;
}

async function usersDetail(id) {
  const usersHelper = require('@helper/users');
  if (typeof id === 'number' || Number(id) !== NaN) {
    return await usersHelper.getId(Number(id || 0));
  }
  return await usersHelper.getRow(id);
}

async function usersSave(_data) {
  if (!_data.nickname) {
    return status.error('Nickname Not Empty');
  }
  if (!_data.email && !_data.mobile) {
    return status.error('email/mobile Not Empty');
  }
  const usersHelper = require('@helper/users');
  const userRow = await usersHelper.getList({
    account: true,
    email: _data.email || false,
    mobile: _data.mobile || false
  });
  if (userRow.total) {
    return status.error('Account Error');
  }
  const lastId = await usersHelper.save(_data); // 返回的是数组
  return lastId;
}

// 排序
async function usersSort(_id, _sort) {
  const usersHelper = require('@helper/users');
  return await usersHelper.save({
    id: _id || 0,
    sort: _sort || 0
  });
}

// 启用
async function usersEnable(_id) {
  const usersHelper = require('@helper/users');
  return await usersHelper.save({
    id: _id || 0,
    status: 1
  });
}

// 禁用
async function usersDisable(_id) {
  const usersHelper = require('@helper/users');
  return await usersHelper.save({
    id: _id || 0,
    status: 0
  });
}

async function usersRestore(_id) {
  const usersHelper = require('@helper/users');
  return await usersHelper.restore(_id);
}

async function usersDelete(_id) {
  const usersHelper = require('@helper/users');
  return await usersHelper.delete(_id);
}

module.exports = {
  usersList,
  usersDetail,
  usersSave,
  usersSort,
  usersEnable,
  usersDisable,
  usersRestore,
  usersDelete,
};