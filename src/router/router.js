/*
 * @Author: xiongsheng
 * @Date:   2016-11-09 16:15:08
 * @Last Modified by:   xiongsheng
 * @Last Modified time: 2016-11-17 11:54:10
 */

'use strict';

import React from 'react';
import {
    Route,
    IndexRedirect
} from 'react-router';

import App from '../component/App';
import Todo from '../component/Todo';
import Done from '../component/Done';

export default (
    <Route path="/" component={App}  >
        <IndexRedirect  to="/todo" />
        <Route path="/todo" component={Todo} />
        <Route path="/done" component={Done} />
    </Route>
);
