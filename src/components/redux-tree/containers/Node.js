import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'

var classNames = require('classnames');

export class Node extends Component {

  handleSelectClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { select, id, isSelected } = this.props;
    select(id, !isSelected);
  };

  handleToggleClick = (e) => {
    e.preventDefault();
    console.log('toggle');
    const { requestToggle, id, isExpanded } = this.props;
    requestToggle(id, isExpanded);
  };

  handleIncrementClick = () => {
    const { increment, id } = this.props;
    increment(id)
  };

  handleAddChildClick = e => {
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
  };

  renderChild = childId => {
    const { id } = this.props;
    return (
      <li key={childId}>
        <ConnectedNode id={childId} parentId={id} />
      </li>
    )
  };

  render() {
    const {
        name, parentId, childIds,
        isSelected, isLoading, isExpanded, isLeaf
    } = this.props;

    let className = classNames(
        "av-rtree-node",{
          'selected': isSelected,
          'expanded': isExpanded
        }
    );
    return (
      <div className={className}>

        {!isLeaf &&
        <span className="av-rtree-node-switcher"
              onClick={this.handleToggleClick}>
          </span>
        }

         {isLoading && '~'}

        <div className="av-rtree-node-header"  onClick={this.handleSelectClick}>
          {name}
        </div>

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
  return state['nodes'][ownProps.id]
}

const ConnectedNode = connect(mapStateToProps, actions)(Node);
export default ConnectedNode;
