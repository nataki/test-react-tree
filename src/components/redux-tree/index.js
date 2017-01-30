import React, {Component} from 'react';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './reducers'
// import generateTree from './generateTree'
import Node from './containers/Node'
import api from './api/'

// const tree0 = generateTree()
const tree = require('../../data/data-flat.json');
const store = createStore(
    reducer,
    {nodes: tree},
    applyMiddleware(thunk.withExtraArgument(api))
);

import './css/main.css';

export default class TreeExample4 extends Component{
    render(){
        return (
            <div className="av-rtree">
                <h2>Redux Tree</h2>
                <Provider store={store}>
                    <Node id={'id_parent0'} />
                </Provider>
            </div>
        );
    }
}