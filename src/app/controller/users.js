/*** 
 * @Author: trexwb
 * @Date: 2024-01-12 16:38:52
 * @LastEditors: trexwb
 * @LastEditTime: 2024-04-02 10:15:17
 * @FilePath: /laboratory/microservice/account/src/app/controller/users.js
 * @Description: 
 * @一花一世界，一叶一如来
 * Copyright (c) 2024 by 杭州大美, All Rights Reserved. 
 */
// require('dotenv').config();
// console.log(process.env.NODE_ENV, process.env);
const status = require('@utils/status');
const logCast = require('@cast/log');

async function usersList(filter, sort, page, pageSize) {
  try {
    let order = null;
    const regex = /^([+-])(.*?)$/si;
    const match = (sort || '').match(regex);
    if (match) {
      order = [{ column: match[2], order: match[1] === '-' ? 'DESC' : 'ASC' }];
    }
    const usersHelper = require('@helper/users');
    return await usersHelper.getList(filter, order, page || 1, pageSize || 10);
  } catch (error) {
    logCast.writeError(__filename + ':' + error.toString());
    return false;
  }
}

async function usersDetail(id) {
  try {
    const usersHelper = require('@helper/users');
    if (typeof id === 'number' || Number(id) !== NaN) {
      return await usersHelper.getId(Number(id || 0));
    }
    return await usersHelper.getRow(id);
  } catch (error) {
    logCast.writeError(__filename + ':' + error.toString());
    return false;
  }
}

async function usersSave(data) {
  try {
    if (!data.nickname) {
      return status.error('Nickname Not Empty');
    }
    if (!data.email && !data.mobile) {
      return status.error('email/mobile Not Empty');
    }
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
    return lastId;
  } catch (error) {
    logCast.writeError(__filename + ':' + error.toString());
    return false;
  }
}

// 排序
async function usersSort(id, sort) {
  try {
    const usersHelper = require('@helper/users');
    return await usersHelper.save({
      id: id || 0,
      sort: sort || 0
    });
  } catch (error) {
    logCast.writeError(__filename + ':' + error.toString());
    return false;
  }
}

// 启用
async function usersEnable(id) {
  try {
    const usersHelper = require('@helper/users');
    return await usersHelper.save({
      id: id || 0,
      status: 1
    });
  } catch (error) {
    logCast.writeError(__filename + ':' + error.toString());
    return false;
  }
}

// 禁用
async function usersDisable(id) {
  try {
    const usersHelper = require('@helper/users');
    return await usersHelper.save({
      id: id || 0,
      status: 0
    });
  } catch (error) {
    logCast.writeError(__filename + ':' + error.toString());
    return false;
  }
}

async function usersRestore(id) {
  try {
    const usersHelper = require('@helper/users');
    return await usersHelper.restore(id);
  } catch (error) {
    logCast.writeError(__filename + ':' + error.toString());
    return false;
  }
}

async function usersDelete(id) {
  try {
    const usersHelper = require('@helper/users');
    return await usersHelper.delete(id);
  } catch (error) {
    logCast.writeError(__filename + ':' + error.toString());
    return false;
  }
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