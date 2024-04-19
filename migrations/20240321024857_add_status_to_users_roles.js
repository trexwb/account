/*** 
 * @Author: trexwb
 * @Date: 2024-02-28 11:52:54
 * @LastEditors: trexwb
 * @LastEditTime: 2024-03-21 10:50:35
 * @FilePath: /laboratory/microservice/account/migrations/20240321024857_add_status_to_users_roles.js
 * @Description: 
 * @一花一世界,一叶一如来
 * @Copyright (c) 2024 by 杭州大美, All Rights Reserved. 
 */
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.table(`${process.env.DB_PREFIX}users_roles`, (table) => {
        table.specificType('status', 'TINYINT UNSIGNED').defaultTo(0).comment('状态:0未启用,1启用,2禁用');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.table(`${process.env.DB_PREFIX}users_roles`, (table) => {
        table.dropColumn('status');
    })
};
