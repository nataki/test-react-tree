import React, {Component} from 'react';
import { Provider } from 'react-redux';

import Node from './Node';
import '../css/main.css';

export default class Tree extends Component{
    render(){
        return (
            <div className="av-rtree">
                <Provider store={this.props.store}>
                    <Node id={'id_parent0'} />
                </Provider>
            </div>
        );
    }
}