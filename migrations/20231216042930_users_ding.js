/*** 
 * @Author: trexwb
 * @Date: 2024-01-12 17:51:38
 * @LastEditors: trexwb
 * @LastEditTime: 2024-02-21 15:02:11
 * @FilePath: /laboratory/microservice/account/migrations/20231216042930_users_ding.js
 * @Description: 
 * @一花一世界，一叶一如来
 * Copyright (c) 2024 by 杭州大美, All Rights Reserved. 
 */
// require('dotenv').config();
// console.log(process.env);
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable(`${process.env.DB_PREFIX}users_ding`, (table) => {
        table.increments('id');
        table.string('site_id', 40).notNullable().comment('来自站点');
        table.string('nickname', 40).nullable(false).comment('昵称');
        table.string('avatar').nullable(false).comment('头像');
        table.string('unionid').nullable(false).comment('unionid');
        table.string('openid').nullable(false).comment('openid');
        table.uuid('uuid').nullable(false).comment('uuid');
        table.json('extension').nullable().comment('扩展');
        table.specificType('status', 'TINYINT UNSIGNED').defaultTo(0).comment('状态');
        table.timestamps();
        table.timestamp('deleted_at').nullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable(`${process.env.DB_PREFIX}users_ding`);
};
