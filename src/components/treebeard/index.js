import React, { Component } from 'react';
import {findNode} from './filter';
import {Treebeard} from 'react-treebeard';

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

const data_source = {
    name: 'root',
    id: 'id_parent0',
    toggled: true,
    children: [
        {
            name: 'parent',
            id: 'id_parent1',
            children: [
                {
                    name: 'child1',
                    id: 'id_child1'
                },
                {
                    name: 'child2',
                    id: 'id_child2'
                }
            ]
        },
        {
            name: 'loading parent',
            id: 'id_parent2',
            loading: true,
            children: []
        },
        {
            name: 'parent',
            id: 'id_parent3',
            children: [
                {
                    name: 'nested parent',
                    id: 'id_parent31',
                    children: [
                        {
                            name: 'nested child 1',
                            id: 'id_child311'
                        },
                        {
                            name: 'nested child 2',
                            id: 'id_child312'
                        }
                    ]
                }
            ]
        }
    ]
};

let data = {
    name: 'root',
    id: 'id_parent1',
    toggled: false,
    loading: true,
    hasChildren: true,
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
            node.children = data;
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
                <button onClick={this.onUpdateBtnClick}>Update tree</button>
                <Treebeard
                    data={this.state.data}
                    onToggle={this.onToggle}
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