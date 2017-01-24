/**
 * Created by nataliia.akimova on 1/24/2017.
 */
import React, {Component} from 'react';
const data_source = require('../../data/data-minimal.json');


class TreeNodeHeader extends Component{

    constructor(props){
        super(props);
    }
    render(){
        let data = this.props.data;
        return (
            <div>
                {data.name}
            </div>
        );
    }
}

class TreeNode extends Component{
    constructor(props){
        super(props);
    }
    render(){
        let data = this.props.data;
        let subtree;

        if (/*data.isExpanded && !data.isLoading &&*/ Array.isArray(data.children) ){
            subtree = (
                <ul>
                    {data.children.map((node) =>
                        <TreeNode
                            key={node.id}
                            data={node}
                        />
                    )}
                </ul>
            );
        }

        return (
            <li>
                {/*
                    if !data.isLeaf render expand/collapse btn - according data.isExpanded
                    if  data.isLoading render loadingIndicator
                    render header - according data.isSelected
                    render children
                */}
                <div>
                    {data.isLeaf ? '' : data.isExpanded ? '-' : '+'}
                    {data.isLoading && '~'}
                    {data.name}
                </div>
                {subtree}
            </li>
        );
    }
}

class Tree extends Component{
    constructor(props){
        super(props);
    }
    render(){
        let data = this.props.data;
        if(!Array.isArray(data)){
            data = [data];
        }
        return (
            <ul>
                {data.map((node) =>
                    <TreeNode
                        key={node.id}

                        data={node}
                    />
                )}
            </ul>
        );
    }
}

export default class TreeExample3 extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div>
                <h2>Custom Tree</h2>
                <Tree
                    data={data_source}
                />
            </div>
        );
    }
}