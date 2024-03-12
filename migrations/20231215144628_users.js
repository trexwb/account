/*** 
 * @Author: trexwb
 * @Date: 2024-01-04 14:29:21
 * @LastEditors: trexwb
 * @LastEditTime: 2024-02-21 15:01:30
 * @FilePath: /laboratory/microservice/account/migrations/20231215144628_users.js
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
exports.up = function (knex) {
    return knex.schema.createTable(`${process.env.DB_PREFIX}users`, (table) => {
        table.increments('id');
        table.string('nickname', 40).nullable(false).comment('昵称');
        table.string('email').nullable(false).comment('账号邮箱');
        table.string('mobile').nullable(false).comment('账号手机等');
        table.string('avatar').nullable().comment('头像');
        table.string('password', 40).nullable(false).comment('密码');
        table.string('salt', 6).nullable(false).comment('加密码');
        table.string('remember_token').nullable(false).comment('令牌');
        table.uuid('uuid').nullable(false).unique().comment('uuid');
        table.string('secret', 80).nullable(false).comment('密钥');
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
exports.down = function (knex) {
    return knex.schema.dropTable(`${process.env.DB_PREFIX}users`);
};
