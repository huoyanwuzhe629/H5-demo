/*
 * @Author: xiongsheng
 * @Date:   2016-11-18 14:55:23
 * @Last Modified by:   xiongsheng
 * @Last Modified time: 2016-11-18 15:53:21
 */

'use strict';

import React, {
    Component
} from 'react';

import {
    Button,
    Alert
} from '@bizfe/biz-mobile-ui';


class List extends Component {
    render() {
        const {
            children,
            data,
            listType
        } = this.props;
        const cardList = data.map((cardIndex) => {
                return (
                    <Item key = {cardIndex} cardIndex = {cardIndex} listType= {listType}/>
                );
            });
        return (
            <div className="card-list">
                {cardList}
            </div>

        );
    }
}

class Item extends Component {
    render() {
        const {
            cardIndex,
            listType
        } = this.props;
        return (
            <div className="card">
                <p className="label grey">{listType}消耗值{cardIndex}</p>
                <p className="value black">7,238,360,950.28</p>
                <p className="percentage">
                    <span className="label grey">任务进度: <i className="black">89.12%</i></span>
                    <span className="label grey">时间进度差：<i className="orange">-12.1%</i></span>
                </p>
                <div className="card-label">
                    <span className="arrow"></span>
                    <span className="title">实时消耗&nbsp;&nbsp;</span>
                </div>
            </div>);
    }
}
export default List
