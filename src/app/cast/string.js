/*** 
 * @Author: trexwb
 * @Date: 2024-08-23 16:37:37
 * @LastEditors: trexwb
 * @LastEditTime: 2024-08-23 16:46:02
 * @FilePath: /drive/src/app/cast/string.js
 * @Description: 
 * @一花一世界，一叶一如来
 * @Copyright (c) 2024 by 杭州大美, All Rights Reserved. 
 */
class CastString {
  constructor(rules) {
    this.rules = rules;
  }
  get(value) {
    return value.toString();
  }

  set(value) {
    return value.toString();
  }
}

module.exports = CastString;