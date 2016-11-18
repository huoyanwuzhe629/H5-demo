/*
 * @Author: xiongsheng
 * @Date:   2016-11-17 11:45:47
 * @Last Modified by:   xiongsheng
 * @Last Modified time: 2016-11-18 15:51:19
 */

'use strict';

'use strict';
import React, {
    Component
} from 'react';

import {
    Button,
    Alert
} from '@bizfe/biz-mobile-ui';
import List from './List';
import makeCancelable from '../common/makeCancelable';


class Todo extends Component {
    state = {
        title: 'To1do'
    };
    componentWillMount() {
        this.promises = [];
    }
    changeTitle() {
        const cancelablePromise = makeCancelable(
            fetch('/query/search.action')
            .then(setTimeout(() => {
                response => {
                    return response.json();
                }
            }, 3000))
        );
        cancelablePromise
            .promise
            .then((json) => {
                console.log('resolved');
                this.setState({
                    title: 'Todo'
                });
            })
            .catch((reason) => console.log('isCanceled', reason.isCanceled));
        this.promises.push(cancelablePromise);
        window.location.hash = '#/Done';
    }
    componentWillUnmount() {
        this.promises.map((promise, index) => {
            promise.cancel();
        });
    }

    render() {
        const list = [1, 2, 3, 4, 5, 6, 7, 8, 9];

        return (
            <div className="main-container">
                <List data={list} listType={'todo'} />
            </div>
        );
    }
}



export default Todo
