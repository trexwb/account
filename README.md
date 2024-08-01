# 开发日志
## 20240801 v1.0.3 【已发布】
- 增加事件能力
- 增加队列能力
- 增加计划任务
- 调整FC响应方法

## 20240418 v1.0.2 【已发布】
遇到权限问题可通过清空account_roles_permissions表重新修复
```sql
TRUNCATE TABLE `account_roles_permissions`;
INSERT INTO `account_roles_permissions` 
  SELECT r.`site_id`,r.`id`,p.`id`
  FROM `account_permissions` p
  LEFT JOIN `account_roles` r ON JSON_CONTAINS(r.`permissions`, CONCAT('"', p.`key`, '"')) = 1
  WHERE 1;
```

## 20240321 v1.0.1 【已发布】
### 功能说明
- 增加中后台用户状态
- 增加用户访问过的站点记录

### 数据库调整
```
npx knex migrate:make users_sites
npx knex migrate:make add_status_to_users_roles
npx knex seed:make seed_status_to_users_roles
npx knex seed:make seed_roles_to_roles_permissions
```
> `npm i`

> `npx knex migrate:latest`

> `npx knex seed:run --specific=seed_status_to_users_roles.js` 导入默认数据，请正式服务慎重操作

- `add_status_to_users_roles` `users_roles`表添加`status`字段
- `seed_status_to_users_roles` 生成默认状态

## 20240223 v1.0 初创【已发布】
### 基础数据
```
npx knex migrate:make secrets
npx knex migrate:make secrets_logs
npx knex migrate:make users
npx knex migrate:make users_logs
npx knex migrate:make roles
npx knex migrate:make permissions
npx knex migrate:make roles_permissions
npx knex migrate:make users_roles
npx knex migrate:make users_alipay
npx knex migrate:make users_ding
npx knex migrate:make users_wechat
```

- `secrets` API访问密钥
- `secrets_logs` 密钥变更记录
- `users` 用户表
- `users_logs` 用户修改记录
- `roles` 角色表
- `permissions` 权限表
- `roles_permissions` 角色权限关系表
- `users_roles` 用户角色关系表
- `users_alipay` 支付宝关联
- `users_ding` 钉钉关联
- `users_wechat` 微信关联

# 执行
## 安装
### 本地执行
> `npm i`

> `npx cross-env NODE_ENV=production knex migrate:latest` 首次执行，需要迁移数据库

> `npx cross-env NODE_ENV=production knex seed:run` 导入默认数据，请正式服务慎重操作

首次安装需要执行上面代码

本地执行
> `npm run dev` 或 `yarn run dev`

正式环境执行
> `npm run start` 或 `yarn run start`

### 创建库
有新的开发内容时通过命令创建数据库，请不要直接改动数据库
> `npx cross-env NODE_ENV=production knex migrate:make 表名`

> `npx knex seed:make seed_表名`

### 修改表结构
>  `npx cross-env NODE_ENV=production knex migrate:make add_fields_to_secrets`
```
exports.up = function(knex) {
    return knex.schema.alterTable('secrets', (table) => {
        table.json('source').nullable().comment('操作前').alter();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.table('secrets_logs', (table) => {
        table.dropColumn('name');
    });
};
```

### 数据备份
`npx cross-env NODE_ENV=production node backup.js`
备份的文件会存储到`/src/resouces/database/`目录下，需要时可以复制到`/seeds/`目录中作为数据种子导入，实现数据恢复

# 技术路径
## 服务
### 提供服务
```
yarn run start
```

### 调用方式
其他应用调用账号管理服务的方式
```
// 统一采用hprose库提供的RPC方式，可以支持多种语言
const hprose = require("hprose");
// 统一使用加密方式
const cryptTool = require('@utils/cryptTool');

// hprose 调用服务地址
const client = hprose.Client.create(当前服务的地址);

// 时间戳
const timeStamp = Math.floor(Date.now() / 1000).toString();
// app_id 和 app_secret 由应用生成在account_secrets表里，调用方可以跟管理员获取
const newSecret = cryptTool.md5(cryptTool.md5(app_id + timeStamp) + app_secret) + timeStamp

await client.setHeader("App-Id", app_id);
await client.setHeader("App-Secret", newSecret);
// siteId 表示要操作的站点
await client.setHeader("Site-Id", siteId);

if (process.env.mode === 'strict') { // 如果采用严格模式
    // 需要先从rpc_getFunctions
    const proxy = await client.useService(['rpc_getFunctions']);
    let fns = await proxy.rpc_getFunctions();
    // 获得可以使用的全部方法
    if (fns && fns.iv) { // 有加密返回时解密
        fns = await decryptData(fns);
    }
    if (!fns || fns.error) {
        return fns.error || fns || false;
    }
    proxy = await client.useService([...new Set([...serverRow.extension?.fn, ...fns])]);
} else {
    proxy = await client.useService();
}
// 登录
let result = proxy.signIn(账号, 密码)
// 退出
let result = proxy.signOut(令牌)
// 通过令牌获取用户信息
let result = proxy.authToken(令牌)
// 对用户进行鉴权
let result = proxy.authentication(令牌/uuid，[需要验证的权限数组])
// 用户列表
let result = proxy.usersList()
// 返回数据如果有加密处理，需要把方法获取到的数据进行解密，`result.iv`存在时表示有加密
// 解密防范
const decryptData = async (data) => {
    if (!accountService.serverRow.id) return false;
    if (data.encryptedData, data.iv) {
        return cryptTool.decrypt(data.encryptedData, accountService.serverRow?.app_secret, data.iv);
    }
    return data;
}
if (result && result.iv) { // 有加密返回时解密
    result = await decryptData(result);
}
...
```
其他方法查看
> 权限类： ['signIn', 'signOut', 'authToken', 'authentication'];

> 用户操作类: ['usersList', 'usersGet', 'usersSave', 'usersSort', 'usersEnable', 'usersDisable', 'usersRestore', 'usersDelete'];

> 用户角色类： ['rolesList', 'rolesGet', 'rolesSave', 'rolesSort', 'rolesEnable', 'rolesDisable', 'rolesRestore', 'rolesDelete'];

> 角色权限类： ['permissionsList', 'permissionsGet', 'permissionsSave', 'permissionsSort', 'permissionsEnable', 'permissionsDisable', 'permissionsRestore', 'permissionsDelete'];
