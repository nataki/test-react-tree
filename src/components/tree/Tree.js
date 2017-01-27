/**
 * Created by nataliia.akimova on 1/25/2017.
 */
import React, {Component} from 'react';
import TreeNode from './TreeNode';

class Tree extends Component{
    constructor(props){
        super(props);
        this.onSelect = this.onSelect.bind(this);
    }
    onSelect(node){
        let onSelect = this.props.onSelect;
        if (onSelect){
            onSelect.apply(this, arguments);
        }
    }
    render(){
        let data = this.props.data;
        if(!Array.isArray(data)){
            data = [data];
        }
        return (
            <ul className="av-rtree-root">
                {data.map((node) =>
                    <TreeNode
                        key={node.id}
                        onSelect={this.onSelect}
                        node={node}
                    />
                )}
            </ul>
        );
    }
}

Tree.propTypes = {
    data: React.PropTypes.oneOfType([
        React.PropTypes.object,
        React.PropTypes.array
    ]).isRequired,
    onSelect: React.PropTypes.func
};

export default Tree;