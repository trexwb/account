/*** 
 * @Author: trexwb
 * @Date: 2024-01-04 14:29:21
 * @LastEditors: trexwb
 * @LastEditTime: 2024-02-21 15:02:05
 * @FilePath: /laboratory/microservice/account/migrations/20231216042930_roles_permissions.js
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
    return knex.schema.createTable(`${process.env.DB_PREFIX}roles_permissions`, (table) => {
        table.string('site_id', 40).notNullable().comment('站点编号');
        table.integer('role_id').unsigned().comment('角色编号');
        table.foreign('role_id').references('id').inTable(`${process.env.DB_PREFIX}roles`);
        table.integer('permission_id').unsigned().comment('权限编号');
        table.foreign('permission_id').references('id').inTable(`${process.env.DB_PREFIX}permissions`);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable(`${process.env.DB_PREFIX}roles_permissions`);
};
