/*
 * @Author: xiongsheng
 * @Date:   2016-11-21 16:40:06
 * @Last Modified by:   xiongsheng
 * @Last Modified time: 2016-11-21 16:46:48
 */

'use strict';
const data = {
    baseUrl: `${window.location.protocol}//${window.location.host}`
}

export function get(key) {
    return data[key];
}

export function set(key, value) {
    data[key] = value;
    return this;
};
