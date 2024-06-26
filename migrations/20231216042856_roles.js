/*** 
 * @Author: trexwb
 * @Date: 2024-01-04 14:29:21
 * @LastEditors: trexwb
 * @LastEditTime: 2024-04-16 10:59:33
 * @FilePath: /laboratory/microservice/account/migrations/20231216042856_roles.js
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
    return knex.schema.createTable(`${process.env.DB_PREFIX}roles`, (table) => {
        table.increments('id');
        table.string('site_id', 40).notNullable().comment('站点编号');
        table.string('name', 40).nullable(false).comment('角色');
        table.json('permissions').nullable().comment('基础权限');
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
    return knex.schema.dropTable(`${process.env.DB_PREFIX}roles`);
};