/*
 * @Author: xiongsheng
 * @Date:   2016-11-09 14:54:59
 * @Last Modified by:   xiongsheng
 * @Last Modified time: 2016-11-10 17:15:18
 */

'use strict';
const isAndroid = window.navigator.appVersion.match(/android/gi),
    isIPhone = window.navigator.appVersion.match(/iphone/gi);


import React from 'react';
import {
    render
} from 'react-dom';

import routes from './src/router/router';
import {
    Router,
    useRouterHistory,
    hashHistory
} from 'react-router';

import {
    createHashHistory
} from 'history';


import '@bizfe/biz-mobile-ui/src/styles/app.less';
import './asset/css/main.css';


const history = useRouterHistory(createHashHistory)({
    queryKey: false
});

render(
    <Router history={history} routes={routes}/>,
    document.getElementById('app')
);
