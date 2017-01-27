import {
    SELECT,
    REQUEST_TOGGLE,
    TOGGLE,
    SET_LOADING,
    ADD_CHILD, REMOVE_CHILD, CREATE_NODE, DELETE_NODE
} from '../actions'

const childIds = (state, action) => {
  switch (action.type) {
    case ADD_CHILD:
      return [ ...state, action.childId ];
    case REMOVE_CHILD:
      return state.filter(id => id !== action.childId);
    default:
      return state
  }
};

const node = (state, action) => {
  switch (action.type) {
    case CREATE_NODE:
      return {
        id: action.nodeId,
        // counter: 0,
        childIds: [],
        ...action.nodeData
      };
    case SELECT:
      return {
        ...state,
        isSelected: !state.isSelected
      };
    case TOGGLE:
      return {
        ...state,
        isExpanded: !state.isExpanded
      };
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case ADD_CHILD:
    case REMOVE_CHILD:
      return {
        ...state,
        childIds: childIds(state.childIds, action)
      };
    default:
      return state
  }
};

const getAllDescendantIds = (state, nodeId) => (
  state[nodeId].childIds.reduce((acc, childId) => (
    [ ...acc, childId, ...getAllDescendantIds(state, childId) ]
  ), [])
);

const deleteMany = (state, ids) => {
  state = { ...state };
  ids.forEach(id => delete state[id]);
  return state
};

export default (state = {}, action) => {
  const { nodeId } = action;
  if (typeof nodeId === 'undefined') {
    return state
  }

  if (action.type === DELETE_NODE) {
    const descendantIds = getAllDescendantIds(state, nodeId);
    return deleteMany(state, [ nodeId, ...descendantIds ])
  }

  return {
    ...state,
    [nodeId]: node(state[nodeId], action)
  }
}