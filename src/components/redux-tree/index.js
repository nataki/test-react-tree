import React, {Component} from 'react';
import { createStore, applyMiddleware } from 'redux'

import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import reducer from './reducers'
// import generateTree from './generateTree'
import api from './api/'
// const tree0 = generateTree()
// const tree = require('../../data/data-flat.json');
const tree = require('../../data/data-flat-full.json');
const logger = createLogger();
const store = createStore(
    reducer,
    {nodes: tree},
    applyMiddleware(thunk.withExtraArgument(api), logger)
);
import {updateNode} from './actions';

import Tree from './containers/Tree';

export default class TreeExample4 extends Component{
    onUpdate(){
        store.dispatch(updateNode('id_parent1', {
            "status": "running",
            "progress": 24,
            "hasChildren": true
        }));
    }

    render(){
        return (
            <div>
                <h2>Redux Tree</h2>
                <button onClick={this.onUpdate}>Update</button>
                <Tree store={store} />
            </div>
        );
    }
}