/*** 
 * @Author: trexwb
 * @Date: 2024-01-18 11:37:21
 * @LastEditors: trexwb
 * @LastEditTime: 2024-03-08 09:51:10
 * @FilePath: /laboratory/microservice/account/src/app/controller/sign.js
 * @Description: 
 * @一花一世界，一叶一如来
 * @Copyright (c) 2024 by 杭州大美, All Rights Reserved. 
 */
// require('dotenv').config();
// console.log(process.env.NODE_ENV, process.env);
const status = require('@utils/status');

async function signIn(account, password) {
  const cryptTool = require('@utils/cryptTool');
  const usersHelper = require('@helper/users');
  function isValidEmail(email) {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
  }
  function isValidPhoneNumber(phoneNumber) {
    const pattern = /^1[3456789]\d{9}$/;
    return pattern.test(phoneNumber);
  }
  let where = {};
  if (account) {
    if (isValidEmail(account)) {
      where.email = account;
    } else if (isValidPhoneNumber(account)) {
      where.mobile = account;
    } else {
      where.account = account;
    }
  } else {
    return status.error('Account NOT Empty');
  }
  const userRow = await usersHelper.getRow(where);
  if (!userRow?.id) {
    return status.error('Account Error');
  }
  if (userRow.password != cryptTool.md5(password.toString() + userRow.salt)) {
    return status.error('Account Password Error');
  }
  if (!userRow.status) {
    return status.error('Account Status Error');
  }
  return {
    uuid: userRow.uuid,
    remember_token: userRow.remember_token,
  };
}

async function signSecret(uuid, secret) {
  const cryptTool = require('@utils/cryptTool');
  const usersHelper = require('@helper/users');
  const userRow = await usersHelper.getUuid(uuid);
  if (!userRow?.id) {
    return status.error('Account Error');
  }
  const userSecret = cryptTool.md5(userRow.uuid.toString() + userRow.secret.toString());
  if (secret != userSecret) {
    return status.error('Account Password Error');
  }
  if (!userRow.status) {
    return status.error('Account Status Error');
  }
  return {
    uuid: userRow.uuid,
    remember_token: userRow.remember_token,
  };
}

async function signInfo(id) {
  if (!id) {
    return status.error('Id NOT Empty');
  }
  const usersHelper = require('@helper/users');
  const userRow = await usersHelper.getId(id);

  // 拥有的所有角色
  if (userRow?.id) {
    const rolesRows = await usersHelper.getUserRoles(userRow.id);
    if (rolesRows) {
      userRow.roles = rolesRows.roles || [];
      userRow.permissions = rolesRows.permissions || [];
    }
  }

  return {
    uuid: userRow.uuid,
    nickname: userRow.nickname,
    avatar: userRow.avatar,
    roles: userRow.roles || [],
    permissions: userRow.permissions || [],
  };
}

async function signOut(id) {
  const usersHelper = require('@helper/users');
  return await usersHelper.setToken(id);
}

module.exports = {
  signIn,
  signSecret,
  signInfo,
  signOut
};