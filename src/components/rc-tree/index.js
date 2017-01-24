/**
 * Created by nataliia.akimova on 1/24/2017.
 */
import React, {Component} from 'react';
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

// import 'rc-tree/assets/index.css';
import './main.css';
import Tree, { TreeNode } from 'rc-tree';

/*export default class TreeExample2 extends Component {
    constructor(props){
        super(props);
        this.state = {
            data
        };
        // this.onToggle = this.onToggle.bind(this);
    }

    render(){
        return (
            <div>

            </div>
        );
    }
}*/

function generateTreeNodes(treeNode) {
    const arr = [];
    const key = treeNode.props.eventKey;
    for (let i = 0; i < 3; i++) {
        arr.push({ name: `leaf ${key}-${i}`, key: `${key}-${i}` });
    }
    return arr;
}

function setLeaf(treeData, curKey, level) {
    const loopLeaf = (data, lev) => {
        const l = lev - 1;
        data.forEach((item) => {
            if ((item.key.length > curKey.length) ? item.key.indexOf(curKey) !== 0 :
                curKey.indexOf(item.key) !== 0) {
                return;
            }
            if (item.children) {
                loopLeaf(item.children, l);
            } else if (l < 1) {
                item.isLeaf = true;
            }
        });
    };
    loopLeaf(treeData, level + 1);
}

function getNewTreeData(treeData, curKey, child, level) {
    const loop = (data) => {
        if (level < 1 || curKey.length - 3 > level * 2) return;
        data.forEach((item) => {
            if (curKey.indexOf(item.key) === 0) {
                if (item.children) {
                    loop(item.children);
                } else {
                    item.children = child;
                }
            }
        });
    };
    loop(treeData);
    setLeaf(treeData, curKey, level);
}
/*
export class TreeExample2_ extends Component {
    constructor(props) {
        super(props);
        this.state = {
            treeData: [],
            checkedKeys: [],
        };
        this.onSelect = this.onSelect.bind(this);
        this.onLoadData = this.onLoadData.bind(this);
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                treeData: [
                    { name: 'pNode 01', key: '0-0' },
                    { name: 'pNode 02', key: '0-1' },
                    { name: 'pNode 03', key: '0-2', isLeaf: true },
                ],
                checkedKeys: ['0-0'],
            });
        }, 100);
    }
    onSelect(info) {
        console.log('selected', info);
    }
    onCheck(checkedKeys) {
        console.log(checkedKeys);
        this.setState({
            checkedKeys,
        });
    }
    onLoadData(treeNode) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const treeData = [...this.state.treeData];
                getNewTreeData(treeData, treeNode.props.eventKey, generateTreeNodes(treeNode), 2);
                this.setState({ treeData });
                resolve();
            }, 500);
        });
    }
    render() {
        const loop = (data) => {
            return data.map((item) => {
                if (item.children) {
                    return <TreeNode title={item.name} key={item.key}>{loop(item.children)}</TreeNode>;
                }
                return (
                    <TreeNode title={item.name} key={item.key} isLeaf={item.isLeaf}
                              disabled={item.key === '0-0-0'}
                    />
                );
            });
        };
        const treeNodes = loop(this.state.treeData);
        return (
            <div>
                <h2>dynamic render</h2>
                <Tree
                    onSelect={this.onSelect}
                    checkable onCheck={this.onCheck} checkedKeys={this.state.checkedKeys}
                    loadData={this.onLoadData}
                >
                    {treeNodes}
                </Tree>
            </div>
        );
    }
};*/

const TreeExample2 = React.createClass({
    propTypes: {},
    getInitialState() {
        return {
            treeData: [],
            expandedKeys: [],
        };
    },
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                treeData: [
                    { name: 'pNode 01', key: '0-0' },
                    { name: 'pNode 02', key: '0-1' },
                    { name: 'pNode 03', key: '0-2', isLeaf: true },
                ],
                checkedKeys: ['0-0'],
            });
        }, 100);
    },
    onSelect(info) {
        console.log('selected', info);
    },
    onExpand(expandedKeys, info) {
        this.setState({
            expandedKeys,
        });
        console.log('expanded', arguments);
    },
    /*onCheck(checkedKeys) {
        console.log(checkedKeys);
        this.setState({
            checkedKeys,
        });
    },*/
    onLoadData(treeNode) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const treeData = [...this.state.treeData];
                getNewTreeData(treeData, treeNode.props.eventKey, generateTreeNodes(treeNode), 2);
                // this.setState({ treeData :[{"name":"pNode 01","key":"0-0"},{"name":"pNode 02","key":"0-1","children":[{"name":"leaf 0-1-0","key":"0-1-0","children":[{"name":"leaf 0-1-0-0","key":"0-1-0-0","isLeaf":true},{"name":"leaf 0-1-0-1","key":"0-1-0-1","isLeaf":true},{"name":"leaf 0-1-0-2","key":"0-1-0-2","isLeaf":true}]},{"name":"leaf 0-1-1","key":"0-1-1"},{"name":"leaf 0-1-2","key":"0-1-2"}]},{"name":"pNode 03","key":"0-2","isLeaf":true}] });
                this.setState({ treeData });
                resolve();
            }, 500);
        });
    },
    render() {
        const loop = (data) => {
            return data.map((item) => {
                let title = `${item.name} (0%)`,
                    status= 'pending',
                    processClass=`process-${status}`;
                if (item.children) {
                    return <TreeNode title={title} key={item.key} className={processClass}>{loop(item.children)}</TreeNode>;
                }
                return (
                    <TreeNode title={title} key={item.key} isLeaf={item.isLeaf} className={processClass}
                              disabled={item.key === '0-0-0'}
                    />
                );
            });
        };
        const treeNodes = loop(this.state.treeData);
        return (
            <div>
                <h2>rc-tree - dynamic loading</h2>
                <Tree
                    onSelect={this.onSelect}
                    onExpand={this.onExpand}
                    loadData={this.onLoadData}
                    showLine={false}
                >
                    {treeNodes}
                </Tree>
            </div>
        );
    },
});

export default TreeExample2;

