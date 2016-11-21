/*
 * @Author: xiongsheng
 * @Date:   2016-11-17 11:45:47
 * @Last Modified by:   xiongsheng
 * @Last Modified time: 2016-11-21 16:53:38
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
import * as Global from '../common/global';

const BASE_URL = Global.get('baseUrl');

class Todo extends Component {
    state = {
        title: 'To1do'
    };
    componentWillMount() {
        this.promises = [];
    }
    changeTitle() {
        // const cancelablePromise = makeCancelable(
        //     fetch('/query/search')
        //     .then(setTimeout(() => {
        //         response => {
        //             return response.json();
        //         }
        //     }, 3000))
        // );
        // cancelablePromise
        //     .promise
        //     .then((json) => {
        //         console.log('resolved');
        //         this.setState({
        //             title: 'Todo'
        //         });
        //     })
        //     .catch((reason) => console.log('isCanceled', reason.isCanceled));
        // this.promises.push(cancelablePromise);
        // window.location.hash = '#/Done';
        Alert.alert({
            title: 'biz',
            message: 'test',
            buttons: [
                // { text: '取消', color: 'grey' },
                { text: '确定' }
            ]
        });
        // alert('123');
    }

    candidateTask() {
        fetch(`${BASE_URL}/mobile/candidateTask`).then(response=>{
            return response.json();
        })
    }

    doneTask() {
        fetch(`${BASE_URL}/mobile/doneTask`).then(response=>{
            return response.json();
        })
    }

    performOrderBaseInfo() {
        fetch(`${BASE_URL}/mobile/performOrder/performOrderBaseInfo`).then(response=>{
            return response.json();
        })
    }

    performOrderAudit() {
        fetch(`${BASE_URL}/mobile/performOrder/performOrderAudit`).then(response=>{
            return response.json();
        })
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
                <Button onTouchTap={()=>this.changeTitle()}>TEST</Button>
                <Button onTouchTap={()=>this.candidateTask()}>candidateTask</Button>
                <Button onTouchTap={()=>this.doneTask()}>doneTask</Button>
                <Button onTouchTap={()=>this.performOrderBaseInfo()}>performOrderBaseInfo</Button>
                <Button onTouchTap={()=>this.performOrderAudit()}>performOrderAudit</Button>
                <List data={list} listType={'todo'} />
            </div>
        );
    }
}



export default Todo
