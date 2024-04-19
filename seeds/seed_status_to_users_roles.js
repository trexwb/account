/*** 
 * @Author: trexwb
 * @Date: 2024-02-28 11:53:00
 * @LastEditors: trexwb
 * @LastEditTime: 2024-03-21 10:53:02
 * @FilePath: /laboratory/microservice/account/seeds/seed_status_to_users_roles.js
 * @Description: 
 * @一花一世界，一叶一如来
 * @Copyright (c) 2024 by 杭州大美, All Rights Reserved. 
 */
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  await knex(`${process.env.DB_PREFIX}users_roles`).update({
    status: 1
  });
};