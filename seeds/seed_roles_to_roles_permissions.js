/*** 
 * @Author: trexwb
 * @Date: 2024-06-17 14:03:11
 * @LastEditors: trexwb
 * @LastEditTime: 2024-06-17 14:11:03
 * @FilePath: /drive/Users/wbtrex/website/localServer/node/damei/laboratory/microservice/account/seeds/seed_roles_to_roles_permissions.js
 * @Description: 
 * @一花一世界，一叶一如来
 * @Copyright (c) 2024 by 杭州大美, All Rights Reserved. 
 */
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  const total = await knex.from(`${process.env.DB_PREFIX}roles`)
    .count('id', { as: 'total' })
    .first()
    .then((row) => {
      return row.total || 0
    }).catch(() => {
      return 0
    });
  if (total === 0) {
    await knex(`${process.env.DB_PREFIX}roles`).insert({
      site_id: 1,
      name: '管理员',
      permissions: JSON.stringify(permissions),
      status: 1,
      created_at: new Date(),
      updated_at: new Date()
    });
  }
  await knex(`${process.env.DB_PREFIX}roles_permissions`).del();
  const rows = await knex.from(`${process.env.DB_PREFIX}roles`).then((rows) => {
    return rows
  }).catch(() => {
    return 0
  });
  rows.map(async (row) => {
    const result = await knex(`${process.env.DB_PREFIX}permissions`).select('id').whereIn('key', row.permissions || ['']);
    const data = result.map(item => ({
      site_id: row.site_id,
      role_id: row.id,
      permission_id: item.id,
    }));
    await knex(`${process.env.DB_PREFIX}roles_permissions`).insert(data);
  });
};
