/*** 
 * @Author: trexwb
 * @Date: 2024-01-18 12:10:48
 * @LastEditors: trexwb
 * @LastEditTime: 2024-02-21 15:02:17
 * @FilePath: /laboratory/microservice/account/migrations/20240105063159_codes.js
 * @Description: 
 * @一花一世界，一叶一如来
 * @Copyright (c) 2024 by 杭州大美, All Rights Reserved. 
 */
// require('dotenv').config();
// console.log(process.env);
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable(`${process.env.DB_PREFIX}codes`, (table) => {
        table.increments('id');
        table.integer('user_id').unsigned(true);
        table.foreign('user_id').references('id').inTable(`${process.env.DB_PREFIX}users`);
        table.string('secret', 40).notNullable().comment('密钥');
        table.integer('valid_time').unsigned(true).comment('有效时间');
        table.timestamps();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable(`${process.env.DB_PREFIX}codes`);
};
