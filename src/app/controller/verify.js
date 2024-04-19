/*** 
 * @Author: trexwb
 * @Date: 2024-01-18 17:18:38
 * @LastEditors: trexwb
 * @LastEditTime: 2024-03-21 11:59:31
 * @FilePath: /laboratory/microservice/account/src/app/controller/verify.js
 * @Description: 
 * @一花一世界，一叶一如来
 * @Copyright (c) 2024 by 杭州大美, All Rights Reserved. 
 */
// require('dotenv').config();
// console.log(process.env.NODE_ENV, process.env);
const status = require('@utils/status');

async function verifyToken(token) {
  const usersHelper = require('@helper/users');
  const userRow = await usersHelper.getRow({
    remember_token: token
  });
  if (!userRow?.id) {
    return status.error('Token Not User');
  }
  if (!userRow.status) {
    return status.error('Token User Status Error');
  }
  // 拥有的所有角色
  const rolesRows = await usersHelper.getUserRoles(userRow.id);
  if (rolesRows) {
    userRow.roles = rolesRows.roles || [];
    userRow.permissions = rolesRows.permissions || [];
  }
  return userRow;
}

async function hasPermission(token, role, permission) {
  const usersHelper = require('@helper/users');
  const userRow = await usersHelper.getRow({
    remember_token: token
  });
  if (!userRow?.id) {
    return status.error('Token Not User');
  }
  if (!userRow.status) {
    return status.error('Token User Status Error');
  }
  const rolesRows = await usersHelper.getUserRoles(userRow.id);
  if (rolesRows) {
    if (!(rolesRows.roles || []).includes(role)) {
      return status.error('Role Not User');
    }
    if (!(rolesRows.permissions || []).includes(permission)) {
      return status.error('Permission Not User');
    }
    return true;
  } else {
    return status.error('Roles Error');
  }
}

module.exports = {
  verifyToken,
  hasPermission
};