/*
 * @Author: xiongsheng
 * @Date:   2016-11-17 12:20:29
 * @Last Modified by:   xiongsheng
 * @Last Modified time: 2016-11-17 12:21:13
 */

'use strict';
const makeCancelable = (promise) => {
    let hasCanceled_ = false;

    const wrappedPromise = new Promise((resolve, reject) => {
        promise.then((val) =>
            hasCanceled_ ? reject({
                isCanceled: true
            }) : resolve(val)
        );
        promise.catch((error) =>
            hasCanceled_ ? reject({
                isCanceled: true
            }) : reject(error)
        );
    });

    return {
        promise: wrappedPromise,
        cancel() {
            hasCanceled_ = true;
        },
    };
};

export default makeCancelable;
