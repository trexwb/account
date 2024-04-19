/*** 
 * @Author: trexwb
 * @Date: 2024-04-16 10:38:29
 * @LastEditors: trexwb
 * @LastEditTime: 2024-04-18 10:00:22
 * @FilePath: /laboratory/microservice/account/seeds/seed_permissions.js
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
    // Deletes ALL existing entries
    // await knex(`${process.env.DB_PREFIX}secrets`).del()
    await knex(`${process.env.DB_PREFIX}permissions`).insert(
      [
        {
          "id": 1,
          "key": "accountSecrets",
          "value": "accountSecrets:read",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 2,
          "key": "accountSecrets",
          "value": "accountSecrets:write",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 3,
          "key": "accountSecrets",
          "value": "accountSecrets:delete",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 4,
          "key": "accountRoles",
          "value": "accountRoles:read",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 5,
          "key": "accountRoles",
          "value": "accountRoles:write",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 6,
          "key": "accountRoles",
          "value": "accountRoles:delete",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 7,
          "key": "accountPermissions",
          "value": "accountPermissions:read",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 8,
          "key": "accountPermissions",
          "value": "accountPermissions:write",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 9,
          "key": "accountPermissions",
          "value": "accountPermissions:delete",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 10,
          "key": "accountUsers",
          "value": "accountUsers:read",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 11,
          "key": "accountUsers",
          "value": "accountUsers:write",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 12,
          "key": "accountUsers",
          "value": "accountUsers:delete",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 13,
          "key": "accountTrash",
          "value": "accountTrash:read",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 14,
          "key": "accountTrash",
          "value": "accountTrash:write",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 15,
          "key": "accountTrash",
          "value": "accountTrash:delete",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 16,
          "key": "attachmentSecrets",
          "value": "attachmentSecrets:read",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 17,
          "key": "attachmentSecrets",
          "value": "attachmentSecrets:write",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 18,
          "key": "attachmentSecrets",
          "value": "attachmentSecrets:delete",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 19,
          "key": "attachmentConfigs",
          "value": "attachmentConfigs:read",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 20,
          "key": "attachmentConfigs",
          "value": "attachmentConfigs:write",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 21,
          "key": "attachmentConfigs",
          "value": "attachmentConfigs:delete",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 22,
          "key": "attachmentFiles",
          "value": "attachmentFiles:read",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 23,
          "key": "attachmentFiles",
          "value": "attachmentFiles:write",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 24,
          "key": "attachmentFiles",
          "value": "attachmentFiles:delete",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 25,
          "key": "attachmentTrash",
          "value": "attachmentTrash:read",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 26,
          "key": "attachmentTrash",
          "value": "attachmentTrash:write",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 27,
          "key": "attachmentTrash",
          "value": "attachmentTrash:delete",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 28,
          "key": "paymentSecrets",
          "value": "paymentSecrets:read",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 29,
          "key": "paymentSecrets",
          "value": "paymentSecrets:write",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 30,
          "key": "paymentSecrets",
          "value": "paymentSecrets:delete",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 31,
          "key": "paymentPlatforms",
          "value": "paymentPlatforms:read",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 32,
          "key": "paymentPlatforms",
          "value": "paymentPlatforms:write",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 33,
          "key": "paymentPlatforms",
          "value": "paymentPlatforms:delete",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 34,
          "key": "paymentConfigs",
          "value": "paymentConfigs:read",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 35,
          "key": "paymentConfigs",
          "value": "paymentConfigs:write",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 36,
          "key": "paymentConfigs",
          "value": "paymentConfigs:delete",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 37,
          "key": "paymentOrders",
          "value": "paymentOrders:read",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 38,
          "key": "paymentOrders",
          "value": "paymentOrders:write",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 39,
          "key": "paymentOrders",
          "value": "paymentOrders:delete",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 40,
          "key": "paymentRefunds",
          "value": "paymentRefunds:read",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 41,
          "key": "paymentRefunds",
          "value": "paymentRefunds:write",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 42,
          "key": "paymentRefunds",
          "value": "paymentRefunds:delete",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 43,
          "key": "paymentTrash",
          "value": "paymentTrash:read",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 44,
          "key": "paymentTrash",
          "value": "paymentTrash:write",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 45,
          "key": "paymentTrash",
          "value": "paymentTrash:delete",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 46,
          "key": "simpleCMSSecrets",
          "value": "simpleCMSSecrets:read",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 47,
          "key": "simpleCMSSecrets",
          "value": "simpleCMSSecrets:write",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 48,
          "key": "simpleCMSSecrets",
          "value": "simpleCMSSecrets:delete",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 49,
          "key": "simpleCMSLanguages",
          "value": "simpleCMSLanguages:read",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 50,
          "key": "simpleCMSLanguages",
          "value": "simpleCMSLanguages:write",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 51,
          "key": "simpleCMSLanguages",
          "value": "simpleCMSLanguages:delete",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 52,
          "key": "simpleCMSCustoms",
          "value": "simpleCMSCustoms:read",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 53,
          "key": "simpleCMSCustoms",
          "value": "simpleCMSCustoms:write",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 54,
          "key": "simpleCMSCustoms",
          "value": "simpleCMSCustoms:delete",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 55,
          "key": "simpleCMSColumns",
          "value": "simpleCMSColumns:read",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 56,
          "key": "simpleCMSColumns",
          "value": "simpleCMSColumns:write",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 57,
          "key": "simpleCMSColumns",
          "value": "simpleCMSColumns:delete",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 58,
          "key": "simpleCMSCategories",
          "value": "simpleCMSCategories:read",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 59,
          "key": "simpleCMSCategories",
          "value": "simpleCMSCategories:write",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 60,
          "key": "simpleCMSCategories",
          "value": "simpleCMSCategories:delete",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 61,
          "key": "simpleCMSArticles",
          "value": "simpleCMSArticles:read",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 62,
          "key": "simpleCMSArticles",
          "value": "simpleCMSArticles:write",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 63,
          "key": "simpleCMSArticles",
          "value": "simpleCMSArticles:delete",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 64,
          "key": "simpleCMSTrash",
          "value": "simpleCMSTrash:read",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 65,
          "key": "simpleCMSTrash",
          "value": "simpleCMSTrash:write",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 66,
          "key": "simpleCMSTrash",
          "value": "simpleCMSTrash:delete",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 67,
          "key": "caajwcPrintSecrets",
          "value": "caajwcPrintSecrets:read",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 68,
          "key": "caajwcPrintSecrets",
          "value": "caajwcPrintSecrets:write",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 69,
          "key": "caajwcPrintSecrets",
          "value": "caajwcPrintSecrets:delete",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 70,
          "key": "caajwcPrintUsers",
          "value": "caajwcPrintUsers:read",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 71,
          "key": "caajwcPrintUsers",
          "value": "caajwcPrintUsers:write",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 72,
          "key": "caajwcPrintUsers",
          "value": "caajwcPrintUsers:delete",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 73,
          "key": "caajwcPrintGoods",
          "value": "caajwcPrintGoods:read",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 74,
          "key": "caajwcPrintGoods",
          "value": "caajwcPrintGoods:write",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 75,
          "key": "caajwcPrintGoods",
          "value": "caajwcPrintGoods:delete",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 76,
          "key": "caajwcPrintTemplates",
          "value": "caajwcPrintTemplates:read",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 77,
          "key": "caajwcPrintTemplates",
          "value": "caajwcPrintTemplates:write",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 78,
          "key": "caajwcPrintTemplates",
          "value": "caajwcPrintTemplates:delete",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 79,
          "key": "caajwcPrintStores",
          "value": "caajwcPrintStores:read",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 80,
          "key": "caajwcPrintStores",
          "value": "caajwcPrintStores:write",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 81,
          "key": "caajwcPrintStores",
          "value": "caajwcPrintStores:delete",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 82,
          "key": "caajwcPrintOrders",
          "value": "caajwcPrintOrders:read",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 83,
          "key": "caajwcPrintOrders",
          "value": "caajwcPrintOrders:write",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 84,
          "key": "caajwcPrintOrders",
          "value": "caajwcPrintOrders:delete",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 85,
          "key": "caajwcPrintRefunds",
          "value": "caajwcPrintRefunds:read",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 86,
          "key": "caajwcPrintRefunds",
          "value": "caajwcPrintRefunds:write",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 87,
          "key": "caajwcPrintRefunds",
          "value": "caajwcPrintRefunds:delete",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 88,
          "key": "caajwcPrintBatches",
          "value": "caajwcPrintBatches:read",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 89,
          "key": "caajwcPrintBatches",
          "value": "caajwcPrintBatches:write",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 90,
          "key": "caajwcPrintBatches",
          "value": "caajwcPrintBatches:delete",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 91,
          "key": "caajwcPrintSettlements",
          "value": "caajwcPrintSettlements:read",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 92,
          "key": "caajwcPrintSettlements",
          "value": "caajwcPrintSettlements:write",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        },
        {
          "id": 93,
          "key": "caajwcPrintSettlements",
          "value": "caajwcPrintSettlements:delete",
          "extension": null,
          "status": 1,
          "created_at": new Date(),
          "updated_at": new Date(),
          "deleted_at": null
        }
      ]
    );
    await knex(`${process.env.DB_PREFIX}roles`).insert({
      site_id: 1,
      name: '管理员',
      permissions: JSON.stringify([
        "accountSecrets",
        "accountRoles",
        "accountPermissions",
        "accountUsers",
        "accountTrash",
        "attachmentSecrets",
        "attachmentConfigs",
        "attachmentFiles",
        "attachmentTrash",
        "paymentSecrets",
        "paymentPlatforms",
        "paymentConfigs",
        "paymentOrders",
        "paymentRefunds",
        "paymentTrash",
        "simpleCMSSecrets",
        "simpleCMSLanguages",
        "simpleCMSCustoms",
        "simpleCMSColumns",
        "simpleCMSCategories",
        "simpleCMSArticles",
        "simpleCMSTrash",
        "caajwcPrintSecrets",
        "caajwcPrintUsers",
        "caajwcPrintGoods",
        "caajwcPrintTemplates",
        "caajwcPrintStores",
        "caajwcPrintOrders",
        "caajwcPrintRefunds",
        "caajwcPrintBatches",
        "caajwcPrintSettlements"
      ]),
      status: 1,
      created_at: new Date(),
      updated_at: new Date()
    });
    const result = await knex(`${process.env.DB_PREFIX}permissions`).select('id');
    const data = result.map(item => ({
      site_id: 1,
      role_id: 1,
      permission_id: item.id,
    }));
    await knex(`${process.env.DB_PREFIX}roles_permissions`).insert(data);
  }
};