import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'

var classNames = require('classnames');
const NodeHeader = (props) => {
  let nodeData = props.node.data || {},
      nodeIconCls = 'av-process-dashboard-lifecycle-icon ' +
          (nodeData.status ? `${nodeData.status}-icon`: ''),
      nodeProgress = nodeData.progress ? nodeData.progress : 0;

  return (
      <div className="av-rtree-node-header" onClick={props.onClick}>
        <div className={nodeIconCls}></div> {props.node.name} ({nodeProgress}%)
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
        /*name, parentId, */
        id, childIds,
        /*isSelected, */isLoading, isExpanded, isLeaf
    } = this.props.node;

    const isSelected = this.props.selection.indexOf(id) > -1;

    let className = classNames(
        "av-rtree-node",{
          'selected': isSelected,
          'expanded': isExpanded,
          'loading': isLoading
        }
    );
    return (
      <div className={className}>

        {!isLeaf &&
          <span className="av-rtree-node-switcher"
              onClick={this.handleToggleClick}>
          </span>
        }

        <span className={(isLoading ? 'av-spinner-black-small ' : '') + "av-rtree-node-icon"}></span>
        {/*isLoading && <span className="av-spinner-black-small">~</span>*/}

        {/*<div className="av-rtree-node-header"  onClick={this.handleSelectClick}>
          {name}
        </div>*/}

        <NodeHeader node={this.props.node} onClick={this.handleSelectClick}/>

        <ul className="av-rtree-node-children">
          {childIds.map(this.renderChild)}
        </ul>
      </div>
    )
  }
  /*render() {
    const { name, parentId, childIds } = this.props;
    return (
      <div>
        {name}
        {' '}
        <button onClick={this.handleIncrementClick}>
          +
        </button>
        {' '}
        {typeof parentId !== 'undefined' &&
          <a href="#" onClick={this.handleRemoveClick}
             style={{ color: 'lightgray', textDecoration: 'none' }}>
            ×
          </a>
        }
        <ul>
          {childIds.map(this.renderChild)}
          <li key="add">
            <a href="#" onClick={this.handleAddChildClick}>
              Add child
            </a>
          </li>
        </ul>
      </div>
    )
  }*/
}

function mapStateToProps(state, ownProps) {
  return {
    node: state['nodes'][ownProps.id],
    selection: state.selection
  }
}

const ConnectedNode = connect(mapStateToProps, actions)(Node);
export default ConnectedNode;
