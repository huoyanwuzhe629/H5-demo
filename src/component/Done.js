/*
 * @Author: xiongsheng
 * @Date:   2016-11-17 11:46:05
 * @Last Modified by:   xiongsheng
 * @Last Modified time: 2016-11-18 15:53:45
 */

'use strict';
import React, {
    Component
} from 'react';

import {
    Button,
    Alert
} from '@bizfe/biz-mobile-ui';
import List from './List';

class Done extends Component {
    render() {
        const list = [11,12, 13, 14, 15, 16, 17, 18, 19];
        return (
            <div className="main-container">
                <List data={list} listType={'done'} />
            </div>
        );
    }
}

export default Done
