/*
 * @Author: xiongsheng
 * @Date:   2016-11-09 16:21:09
 * @Last Modified by:   xiongsheng
 * @Last Modified time: 2016-11-11 14:29:48
 */

'use strict';

import React, {
    Component
} from 'react';

import {
    Button,
    Alert
} from '@bizfe/biz-mobile-ui';


class App extends Component {
    render() {
        const {
            children
        } = this.props;
        //app由layout（布局）和content（内容）组成，
        //layout中有头部导航栏和底部栏组成，不受路由变化影响
        //content中的内容由路由控制显示内容，比如访问根路由'/'，则会加载Home组件
        return (
            <div>
                <div className="test">
                    <span >test</span>
                    {children}
                </div>
                <Button className="btn" size="small" onTouchTap={()=>{
                    Alert.alert({
                        title: 'biz',
                        message: 'test',
                        buttons: [
                            {text: '取消', color: 'grey'},
                            {text: '确定'}
                        ]
                    });
                }}>aaa</Button>
            </div>

        );
    }
}

export default App
