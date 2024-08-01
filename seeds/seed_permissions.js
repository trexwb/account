/*** 
 * @Author: trexwb
 * @Date: 2024-04-16 10:38:29
 * @LastEditors: trexwb
 * @LastEditTime: 2024-06-17 14:00:47
 * @FilePath: /drive/Users/wbtrex/website/localServer/node/damei/laboratory/microservice/account/seeds/seed_permissions.js
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
  const total = await knex.from(`${process.env.DB_PREFIX}permissions`)
    .count('id', { as: 'total' })
    .first()
    .then((row) => {
      return row.total || 0
    }).catch(() => {
      return 0
    });
  if (total === 0) {
    const permissions = [
      "accountSecrets", "accountRoles", "accountPermissions", "accountUsers", "accountTrash",
      "attachmentSecrets", "attachmentConfigs", "attachmentFiles", "attachmentTrash",
      "emailSecrets", "emailConfigs", "emailSend",
      "paymentSecrets", "paymentPlatforms", "paymentConfigs", "paymentOrders", "paymentRefunds", "paymentTrash",
      "simpleCMSSecrets", "simpleCMSLanguages", "simpleCMSCustoms", "simpleCMSColumns", "simpleCMSCategories", "simpleCMSArticles", "simpleCMSTrash",
      "caajwcPrintSecrets", "caajwcPrintUsers", "caajwcPrintGoods", "caajwcPrintTemplates", "caajwcPrintStores", "caajwcPrintOrders", "caajwcPrintRefunds", "caajwcPrintBatches", "caajwcPrintSettlements",
    ];
    const permissionObjects = [];
    permissions.forEach(permission => {
      // 为每个权限生成读、写、和删除的操作对象
      ['read', 'write', 'delete'].forEach(action => {
        permissionObjects.push({
          id: null,
          key: permission,
          value: `${permission}:${action}`,
          extension: null,
          status: 1,
          created_at: new Date(),
          updated_at: new Date(),
          deleted_at: null
        });
      });
    });
    // Deletes ALL existing entries
    // await knex(`${process.env.DB_PREFIX}secrets`).del()
    await knex(`${process.env.DB_PREFIX}permissions`).insert(permissionObjects);
  }
};