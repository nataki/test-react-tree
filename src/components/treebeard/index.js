import React, { Component } from 'react';
import {findNode} from './filter';
import {Treebeard, decorators} from 'react-treebeard';
/**
 * TODO: investigate:
 * lazy-loading,
 * updates(by pushes) and reflecting changes in ui: expand-collapse, new items, removed items
 * collapse/expand with methods not only user interactions
 * display custom labels as process names
 *
 * Q: do we need to distinguish select and expand events?
 */

const data_ = {
    name: 'root',
    toggled: true,
    children: [
        {
            name: 'parent',
            children: [
                { name: 'child1' },
                { name: 'child2' }
            ]
        },
        {
            name: 'loading parent',
            loading: true,
            children: []
        },
        {
            name: 'parent',
            children: [
                {
                    name: 'nested parent',
                    children: [
                        { name: 'nested child 1' },
                        { name: 'nested child 2' }
                    ]
                }
            ]
        }
    ]
};

const data_source = require('../../data/data.json');
const data = {
    name: 'root',
    id: 'id_parent1',
    toggled: false,
    loading: true,
    hasChildren: true,
    data: {

    },
    children: []
};

const loadChildren = () => {
    return new Promise((resolve) => {
            setTimeout(() => {
                resolve([
                    {
                        name: 'child1',
                        id: 'id_child1'
                    },
                    {
                        name: 'child2',
                        id: 'id_child2'
                    }
                ]);
            }, 1000);
        }
    );
};

decorators.Header = (props) => {
        let nodeData = props.node.data,
            nodeIcon = nodeData && nodeData.status ?
            `lifecycle-${nodeData.status}` : 'no-lifecycle',
            nodeProgress = nodeData && nodeData.progress ? nodeData.progress : 0;
        return (
            <div style={props.style}>
                {nodeIcon} {props.node.name} ({nodeProgress}%)
            </div>
        );
    };

export default class TreeExample extends Component {
    constructor(props){
        super(props);
        this.state = {
            data
        };
        this.onToggle = this.onToggle.bind(this);
    }

    onUpdateBtnClick(){
    }

    loadChildrenTree(node){
        loadChildren().then((data) => {
            // node.children = data;
            this.setState({data: data_source});
            //update data in state -> find node by id and set its children and loading state
        });
    }

    onToggle(node, toggled){
        console.log('onToggle', node, toggled);

        if (toggled && node.hasChildren){
            this.loadChildrenTree(node);
        }

        node.active = true;
        if(node.hasChildren){
            node.toggled = toggled;
        }

        this.setState({ cursor: node });
    }

    render(){
        return (
            <div>
                <h2>react-treebeard</h2>
                <Treebeard
                    data={this.state.data}
                    onToggle={this.onToggle}
                    decorators={decorators}
                />
            </div>
        );
    }
}

/*class TreeExample extends Component {
    constructor(props){
        super(props);
        this.state = {};
        this.onToggle = this.onToggle.bind(this);
    }
    onToggle(node, toggled){
        console.log('onToggle', node, toggled);

        node.active = true;
        if(node.children){ node.toggled = toggled; }

        this.setState({ cursor: node });
    }
    render(){
        return (
            <div>
                <Treebeard
                    data={data}
                    onToggle={this.onToggle}
                />
            </div>
        );
    }
}*/