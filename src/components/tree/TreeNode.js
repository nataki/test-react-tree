/**
 * Created by nataliia.akimova on 1/25/2017.
 */
import React, {Component} from 'react';
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
        this.onClick = this.onClick.bind(this);
    }
    onClick(){
        // let isSelected = !this.props.node.isSelected;
        let onSelect = this.props.onSelect;
        if (onSelect){
            onSelect(this.props.node/*, isSelected*/);
        }
    }
    render(){
        let node = this.props.node;
        let subtree;

        if (/*node.isExpanded && !node.isLoading &&*/Array.isArray(node.children) ){
            subtree = (
                <ul className="av-rtree-subtree">
                    {node.children.map((node) =>
                        <TreeNode
                            {...this._eventBubbles()}
                            key={node.id}
                            node={node}
                        />
                    )}
                </ul>
            );
           /*subtree = (
                <ul className="av-rtree-subtree">
                    {for(let nodeId in node.children) {
                        <TreeNode
                            {...this._eventBubbles()}
                            key={node.id}
                             node={node}
                        />
                    }}
                </ul>
           );*/
        }

        return (
            <li className={(node.isSelected ? 'selected ' : '') + "av-rtree-node"}>
                {/*
                 if !node.isLeaf render expand/collapse btn - according node.isExpanded
                 if  node.isLoading render loadingIndicator
                 render header - according node.isSelected
                 render children
                 */}
                <div onClick={this.onClick}>
                    {node.isLeaf ? '' : node.isExpanded ? '-' : '+'}
                    {node.isLoading && '~'}
                    {node.name}
                </div>
                {subtree}
            </li>
        );
    }

    _eventBubbles(){
        return { onSelect: this.props.onSelect};
    }
}

export default TreeNode;