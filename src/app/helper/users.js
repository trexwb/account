/*** 
 * @Author: trexwb
 * @Date: 2024-01-12 14:48:44
 * @LastEditors: trexwb
 * @LastEditTime: 2024-03-11 14:00:14
 * @FilePath: /laboratory/microservice/account/src/app/helper/users.js
 * @Description: 
 * @一花一世界，一叶一如来
 * Copyright (c) 2024 by 杭州大美, All Rights Reserved. 
 */

const cacheCast = require('@cast/cache');
const usersModel = require('@model/users');
const rolesModel = require('@model/roles');
const usersRolesModel = require('@model/usersRoles');
const permissionsModel = require('@model/permissions');
const rolesPermissionsModel = require('@model/rolesPermissions');

if('undefined' === typeof siteId){
	global.siteId = process.env.SITE_ID || 0;
}

function buildWhere(that, where) {
	function applyWhereCondition(field, value) {
        if (Array.isArray(value)) {
            if (value.length > 0) that.whereIn(field, value);
        } else {
            that.where(field, value);
        }
    }
	that.where('id', '>', 0);
	if (where.id) {
		applyWhereCondition('id', where.id);
	}
	if (where.uuid) {
		applyWhereCondition('uuid', where.uuid);
	}
	if (where.keywords) {
		that.where(function () {
			//whereJsonPath
			this.orWhere('nickname', 'like', `%${where.keywords}%`);
			this.orWhere('email', 'like', `%${where.keywords}%`);
			this.orWhere('mobile', 'like', `%${where.keywords}%`);
			this.orWhere('uuid', 'like', `%${where.keywords}%`);
			this.orWhere('extension', 'like', `%${where.keywords}%`);
		});
	}
	if (where.account) {
		that.where(function () {
			this.orWhere('email', where.account);
			this.orWhere('mobile', where.account);
		});
	} else {
		if (where.email) {
			that.where('email', where.email);
		}
		if (where.mobile) {
			that.where('mobile', where.mobile);
		}
	}
	if (where.nickname) {
		that.where('nickname', where.nickname);
	}
	if (where.remember_token) {
		that.where('remember_token', where.remember_token);
	}
}

module.exports = {
	getList: async (where, order, _page, _pageSize) => { // await usersHelper.getList({keywords: '1',status: '0'});
		let rows = {};
		try {
			const page = Number(_page ?? 1);
			const pageSize = Number(_pageSize ?? 10);
			const offset = Number(!page ? 0 : pageSize * (page - 1));
			const cacheKey = `users[list:${JSON.stringify(where)},${JSON.stringify(order)},${page},${pageSize}]`;
			rows = await cacheCast.get(cacheKey);
			if (!rows?.total) {
				rows = await usersModel.getList(function () {
					buildWhere(this, where)
				}, order, pageSize, offset);
				if (rows?.total) {
					cacheCast.setCacheWithTags('users', cacheKey, rows);
				}
			}
		} catch (err) { }
		return rows;
	},
	getId: async (id) => {
		if (!id) return {};
		let row = {};
		try {
			const cacheKey = `users[id:${siteId},${id}]`;
			row = await cacheCast.get(cacheKey);
			if (!row?.id) {
				row = await usersModel.getRow(function () {
					buildWhere(this, {
						"id": id
					})
				});
				if (row?.id) {
					cacheCast.setCacheWithTags('users', cacheKey, row);
				}
			}
		} catch (err) { }
		return row;
	},
	getUuid: async (uuid) => {
		if (!uuid) return {};
		let row = {};
		try {
			const cacheKey = `users[uuid:${siteId},${uuid}]`;
			row = await cacheCast.get(cacheKey);
			if (!row?.id) {
				row = await usersModel.getRow(function () {
					buildWhere(this, {
						"uuid": uuid
					})
				});
				if (row?.id) {
					cacheCast.setCacheWithTags('users', cacheKey, row);
				}
			}
		} catch (err) { }
		return row;
	},
	getRow: async (where) => {
		if (!where) return {};
		let row = {};
		try {
			const cacheKey = `users[row:${siteId},${JSON.stringify(where)}]`;
			row = await cacheCast.get(cacheKey);
			if (!row?.id) {
				row = await usersModel.getRow(function () {
					buildWhere(this, where)
				});
				if (row?.id) {
					cacheCast.setCacheWithTags('users', cacheKey, row);
				}
			}
		} catch (err) { }
		return row;
	},
	getUserRoles: async (_id) => {
		if (!_id) return {};
		let row = {};
		try {
			const cacheKey = `users[roles:${siteId},${_id}]`;
			row = await cacheCast.get(cacheKey);
			if (!row?.id) {
				// 拥有的所有角色
				const rolesRows = await rolesModel.getAll(function () {
					this.where('site_id', siteId);
					this.where('status', 1);
					this.whereIn('id', function () {
						this.select('id').from(usersRolesModel.$table)
							.where('site_id', siteId)
							.where('user_id', _id);
					});
				});
				let rolesIds = [];
				row = {
					id: _id,
					roles: [],
					permissions: []
				}
				rolesRows.forEach((item, index) => {
					rolesIds.push(item.id);
					row.roles = [...new Set([...row.roles, ...item.extension])];
				});
				// 用户的所有权限
				if (rolesIds.length > 0) {
					const permissionsRows = await permissionsModel.getAll(function () {
						this.where('site_id', siteId);
						this.where('status', 1);
						this.whereIn('id', function () {
							this.select('id').from(rolesPermissionsModel.$table)
								.where('site_id', siteId)
								.whereIn('role_id', rolesIds);
						});
					});
					permissionsRows.forEach((item, index) => {
						row.permissions = [...new Set([...row.permissions, ...item.extension])];
					});
				}
				cacheCast.setCacheWithTags('users', cacheKey, row);
			}
		} catch (err) { }
		return row;
	},
	setToken: async (_id) => {
		if (!_id) return {};
		let row = {};
		try {
			const remember_token = utils.generateRandomString(64);
			usersModel.save({
				id: _id,
				remember_token: remember_token
			});
			await cacheCast.clearCacheByTag('users');
		} catch (err) { }
		return row;
	},
	save: async (_data) => {
		if (!_data) return;
		let affects = {};
		try {
			affects = await usersModel.save(_data);
			await cacheCast.clearCacheByTag('users');
		} catch (err) { }
		return affects;
	},
	restore: async (id) => {
		if (!id) return;
		let affects = {};
		try {
			affects = await usersModel.restore(function () {
				buildWhere(this, {
					"id": id
				})
			});
			await cacheCast.clearCacheByTag('users');
		} catch (err) { }
		return affects;
	},
	delete: async (id) => {
		if (!id) return;
		let affects = {};
		try {
			affects = await usersModel.softDelete(function () {
				buildWhere(this, {
					"id": id
				})
			});
			await cacheCast.clearCacheByTag('users');
		} catch (err) { }
		return affects;
	},
}
