/*** 
 * @Author: trexwb
 * @Date: 2024-08-23 14:43:35
 * @LastEditors: trexwb
 * @LastEditTime: 2024-08-23 16:47:01
 * @FilePath: /drive/src/app/cast/datetime.js
 * @Description: 
 * @一花一世界，一叶一如来
 * @Copyright (c) 2024 by 杭州大美, All Rights Reserved. 
 */
class CastDatetime {
  constructor(rules) {
    this.rules = rules;
  }
  get(value) {
    // 尝试将字符串转换为 Date 对象
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      return new Date(); // 返回当前时间作为默认值
    }
    return date;
  }

  set(value) {
    // 检查是否为 Date 对象，如果不是，则返回当前时间的 ISO 格式字符串
    if (!(value instanceof Date)) {
      return new Date().toISOString(); // 返回当前时间的 ISO 格式字符串
    }
    return value.toISOString(); // 返回 ISO 格式字符串
  }
}

module.exports = CastDatetime;