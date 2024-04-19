/*** 
 * @Author: trexwb
 * @Date: 2024-01-04 14:29:21
 * @LastEditors: trexwb
 * @LastEditTime: 2024-04-16 10:38:56
 * @FilePath: /laboratory/microservice/account/seeds/seed_secrets.js
 * @Description: 
 * @一花一世界，一叶一如来
 * @Copyright (c) 2024 by 杭州大美, All Rights Reserved. 
 */
// require('dotenv').config();
// console.log(process.env);
const utils = require('@utils/index');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  const total = await knex.from(`${process.env.DB_PREFIX}secrets`)
    .count('id', { as: 'total' })
    .first()
    .then((row) => {
      return row.total || 0
    }).catch(() => {
      return 0
    });
  if (total === 0) {
    // Deletes ALL existing entries
    // await knex(`${process.env.DB_PREFIX}secrets`).del()
    await knex(`${process.env.DB_PREFIX}secrets`).insert([
      {
        channel: '超管',
        app_id: utils.unique(16).toString(),
        app_secret: utils.generateRandomString(32),
        permissions: JSON.stringify({
          "roles": [
            "accountSecrets",
            "accountRoles",
            "accountPermissions",
            "accountUsers",
            "accountTrash"
          ],
          "permissions": [
            "accountSecrets:read",
            "accountSecrets:write",
            "accountSecrets:delete",
            "accountRoles:read",
            "accountRoles:write",
            "accountRoles:delete",
            "accountPermissions:read",
            "accountPermissions:write",
            "accountPermissions:delete",
            "accountUsers:read",
            "accountUsers:write",
            "accountUsers:delete",
            "accountTrash:read",
            "accountTrash:write",
            "accountTrash:delete"
          ]
        }),
        extension: JSON.stringify({
          "analysis": {
            "accountSecrets": {
              "name": "密钥管理",
              "permissions": {
                "read": "只读",
                "write": "可写",
                "delete": "删除"
              }
            },
            "accountRoles": {
              "name": "角色管理",
              "permissions": {
                "read": "只读",
                "write": "可写",
                "delete": "删除"
              }
            },
            "accountPermissions": {
              "name": "权限管理",
              "permissions": {
                "read": "只读",
                "write": "可写",
                "delete": "删除"
              }
            },
            "accountUsers": {
              "name": "用户管理",
              "permissions": {
                "read": "只读",
                "write": "可写",
                "delete": "删除"
              }
            },
            "accountTrash": {
              "name": "用户回收站",
              "permissions": {
                "read": "只读",
                "write": "可写",
                "delete": "删除"
              }
            }
          }
        }),
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  }
};