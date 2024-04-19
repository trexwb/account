/*** 
 * @Author: trexwb
 * @Date: 2024-03-21 11:27:59
 * @LastEditors: trexwb
 * @LastEditTime: 2024-04-16 17:51:22
 * @FilePath: /laboratory/microservice/account/src/app/model/usersSites.js
 * @Description: 
 * @一花一世界，一叶一如来
 * @Copyright (c) 2024 by 杭州大美, All Rights Reserved. 
 */

const databaseCast = require('@cast/database');
const utils = require('@utils/index');
const logCast = require('@cast/log');

const usersRolesModel = {
	$table: `${databaseCast.prefix}users_sites`,// 为模型指定表名
	$primaryKey: 'id', // 默认情况下指定'id'作为表主键，也可以指定主键名
	$fillable: [
		'user_id',
		'created_at',
		'updated_at'
	],// 定义允许添加、更新的字段白名单，不设置则无法添加数据
	$guarded: ['id'],// 定义不允许更新的字段黑名单
	$casts: {
		site_id: 'string',
		user_id: 'integer'
	},
	$hidden: [
		'site_id',
	],
	filterKeys: function (obj) {
		return Object.keys(obj).filter(key => !this.$hidden.includes(key)).reduce((acc, key) => {
			acc[key] = obj[key];
			return acc;
		}, {});
	},
	getRow: async function (where) {
		const dbRead = databaseCast.dbRead();
		try {
			return await dbRead.select([...new Set([...this.$guarded, ...this.$fillable, ...this.$hidden])])
				.from(this.$table)
				.where(where)
				.first()
				.then((row) => {
					return JSON.parse(JSON.stringify(row));
				})
				.catch((error) => {
					logCast.writeError(__filename + ':' + error.toString());
					return false;
				});
		} catch (error) {
			logCast.writeError(__filename + ':' + error.toString());
			return false;
		}
	},
	getAll: async function (where) {
		const dbRead = databaseCast.dbRead();
		try {
			return await dbRead.select([...new Set([...this.$guarded, ...this.$fillable])])
				.from(this.$table)
				.where(where)
				.then((rows) => {
					return rows;
				})
				.catch((error) => {
					logCast.writeError(__filename + ':' + error.toString());
					return false;
				});
		} catch (error) {
			logCast.writeError(__filename + ':' + error.toString());
			return false;
		}
	},
	save: async function (data) {
		if (!data) return;
		const dbWrite = databaseCast.dbWrite();
		const keysArray = [...this.$fillable, ...this.$guarded, ...this.$hidden]; // 过滤不存在的字段
		const dataRow = keysArray.reduce((result, key) => {
			// 确保data[key]存在且为可转换类型
			if (data.hasOwnProperty(key) && data[key] !== null && data[key] !== undefined) {
				const castType = this.$casts[key];
				if (castType === 'json') {
					result[key] = utils.safeJSONStringify(data[key]);
				} else if (castType === 'integer') {
					result[key] = utils.safeCastToInteger(data[key]);
				} else if (castType === 'datetime') {
					result[key] = data[key] ? utils.dateFormatter(data[key], 'Y-m-d H:i:s', 1, false) : null;
				} else if (data[key] !== null && data[key] !== undefined) { // 添加对 data[key] 的非空检查
					result[key] = data[key].toString();
				} else {
					delete result[key];
				}
			}
			return result;
		}, {});

		try {
			return await dbWrite(this.$table).select('id').where(function () {
				this.where('site_id', dataRow.site_id);
				this.where('user_id', dataRow.user_id);
			}).then(async (result) => {
				if (result.length > 0) {
					return await dbWrite(this.$table).update({ ...dataRow, updated_at: dbWrite.fn.now() }).where(function () {
						this.where('site_id', dataRow.site_id);
						this.where('user_id', dataRow.user_id);
					});
				} else {
					return await dbWrite(this.$table).insert({ ...dataRow, created_at: dbWrite.fn.now(), updated_at: dbWrite.fn.now() });
				}
			});
		} catch (error) {
			logCast.writeError(__filename + ':' + error.toString());
			return false;
		}
	},
	restore: async function (where) {
		if (!where) return;
		const dbWrite = databaseCast.dbWrite();
		try {
			return await dbWrite(this.$table)
				.where(where)
				.update({
					deleted_at: null
				});
		} catch (error) {
			logCast.writeError(__filename + ':' + error.toString());
			return false;
		}
	},
	softDelete: async function (where) {
		if (!where) return;
		const dbWrite = databaseCast.dbWrite();
		try {
			return await dbWrite(this.$table)
				.where(where)
				.update({
					deleted_at: dbWrite.fn.now()
				});
		} catch (error) {
			logCast.writeError(__filename + ':' + error.toString());
			return false;
		}
	}
}

module.exports = usersRolesModel;