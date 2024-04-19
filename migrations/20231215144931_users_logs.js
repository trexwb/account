/*** 
 * @Author: trexwb
 * @Date: 2024-01-04 14:29:21
 * @LastEditors: trexwb
 * @LastEditTime: 2024-02-21 15:01:51
 * @FilePath: /laboratory/microservice/account/migrations/20231215144931_users_logs.js
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
    return knex.schema.createTable(`${process.env.DB_PREFIX}users_logs`, (table) => {
        table.increments('id');
        table.integer('user_id').unsigned(true);
        table.foreign('user_id').references('id').inTable(`${process.env.DB_PREFIX}users`);
        table.json('source').nullable();
        table.text('handle').notNullable();
        table.timestamps();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable(`${process.env.DB_PREFIX}users_logs`);
};
