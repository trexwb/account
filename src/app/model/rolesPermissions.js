/*** 
 * @Author: trexwb
 * @Date: 2024-01-22 16:08:36
 * @LastEditors: trexwb
 * @LastEditTime: 2024-03-08 17:40:43
 * @FilePath: /laboratory/microservice/account/src/app/model/rolesPermissions.js
 * @Description: 
 * @一花一世界，一叶一如来
 * @Copyright (c) 2024 by 杭州大美, All Rights Reserved. 
 */
const databaseCast = require('@cast/database');
const utils = require('@utils/index');

module.exports = {
	$table: `${databaseCast.prefix}roles_permissions`,// 为模型指定表名
	$primaryKey: 'id', // 默认情况下指定'id'作为表主键，也可以指定主键名
	$fillable: [
		'role_id',
		'permission_id'
	],// 定义允许添加、更新的字段白名单，不设置则无法添加数据
	$guarded: ['id'],// 定义不允许更新的字段黑名单
	$casts: {
		role_id: 'integer',
		permission_id: 'integer'
	},
	$hidden: [
		'site_id',
	],
	filterKeys: function(obj) {
		return Object.keys(obj).filter(key => !this.$hidden.includes(key)).reduce((acc, key) => {
			acc[key] = obj[key];
			return acc;
		}, {});
	},
	getRow: async function(where) {
		const dbRead = databaseCast.dbRead();
		try {
			return await dbRead.select([...new Set([...this.$guarded, ...this.$fillable, ...this.$hidden])])
				.from(this.$table)
				.where(where)
				.first();
		} catch (err) {
			return false;
		}
	},
	getAll: async function(where) {
		const dbRead = databaseCast.dbRead();
		try {
			return await dbRead.select([...new Set([...this.$guarded, ...this.$fillable])])
				.from(this.$table)
				.where(where);
		} catch (err) {
			return false;
		}
	},
	save: async function(_data) {
		if (!_data) return;
		const dbWrite = databaseCast.dbWrite();
		const keysArray = [...this.$fillable, ...this.$guarded, ...this.$hidden]; // 过滤不存在的字段
		const dataRow = keysArray.reduce((result, key) => {
			if (_data.hasOwnProperty(key)) {
				if (this.$casts[key] === 'json') {
					result[key] = JSON.stringify(_data[key]);
				} else if (this.$casts[key] === 'integer') {
					result[key] = Number(_data[key]);
				} else if (this.$casts[key] === 'datetime') {
					result[key] = _data[key] ? utils.dateFormatter(_data[key], 'Y-m-d H:i:s', 1, false) : null;
				} else {
					result[key] = _data[key];
				}
			}
			return result;
		}, {});

		try {
			return await dbWrite(this.$table).insert({ ...dataRow });
		} catch (err) {
			return false;
		}
	},
	restore: async function(where) {
		if (!where) return;
		const dbWrite = databaseCast.dbWrite();
		try {
			return await dbWrite(this.$table)
				.where(where)
				.update({
					deleted_at: null
				});
		} catch (err) {
			return false;
		}
	},
	softDelete: async function(where) {
		if (!where) return;
		const dbWrite = databaseCast.dbWrite();
		try {
			return await dbWrite(this.$table)
				.where(where)
				.update({
					deleted_at: dbWrite.fn.now()
				});
		} catch (err) {
			return false;
		}
	}
}
