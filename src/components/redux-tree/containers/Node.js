import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'

var classNames = require('classnames');
const NodeHeader = (props) => {
  let nodeData = props.node.data || {},
      nodeProgress = nodeData.progress ? nodeData.progress : 0;

  return (
      <div className="av-rtree-node-header" onClick={props.onClick}>
        {props.node.name} ({nodeProgress}%)
      </div>
  );
};

export class Node extends Component {

  handleSelectClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { select, node } = this.props;

    select(node.id/*, !node.isSelected*/);
  };

  handleToggleClick = (e) => {
    e.preventDefault();
    console.log('toggle');
    const { requestToggle, node } = this.props;
    requestToggle(node.id, node.isExpanded);
  };


 /* handleAddChildClick = e => {
    e.preventDefault();

    const { addChild, createNode, id } = this.props;
    const childId = createNode().nodeId;
    addChild(id, childId)
  };

  handleRemoveClick = e => {
    e.preventDefault();

    const { removeChild, deleteNode, parentId, id } = this.props;
    removeChild(parentId, id);
    deleteNode(id)
  };*/

  renderChild = childId => {
    const { node } = this.props;
    return (
      <li key={childId}>
        <ConnectedNode id={childId} parentId={node.id} />
      </li>
    )
  };

  render() {
    const {
        id, childIds,
        isLoading, isExpanded, isLeaf
    } = this.props.node;

    const nodeData = this.props.node.data || {};
    const isSelected = this.props.selection.indexOf(id) > -1;

    let nodeCls = classNames(
        "av-rtree-node",{
          'selected': isSelected,
          'expanded': isExpanded,
          'leaf': isLeaf,
          'loading': isLoading
        }
    );
    let nodeIconCls = classNames(
        "av-rtree-node-icon", {
          'av-process-dashboard-lifecycle-icon': !isLoading,
          [`${nodeData.status}-icon`]: !isLoading,
          'av-spinner-black-small': isLoading
        }
    );
    return (
      <div className={nodeCls}>

        {!isLeaf &&
          <span className="av-rtree-node-switcher"
              onClick={this.handleToggleClick}>
          </span>
        }

        <div className={nodeIconCls}></div>
        <NodeHeader node={this.props.node} onClick={this.handleSelectClick} />

        <ul className="av-rtree-node-children">
          {childIds.map(this.renderChild)}
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    node: state['nodes'][ownProps.id],
    selection: state.selection
  }
}

const ConnectedNode = connect(mapStateToProps, actions)(Node);
export default ConnectedNode;
