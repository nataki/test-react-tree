export const SELECT = 'SELECT';
export const SET_LOADING = 'SET_LOADING';
export const REQUEST_TOGGLE = 'REQUEST_TOGGLE';
export const TOGGLE = 'TOGGLE';
export const CREATE_NODE = 'CREATE_NODE';
export const DELETE_NODE = 'DELETE_NODE';
export const ADD_CHILD = 'ADD_CHILD';
export const REMOVE_CHILD = 'REMOVE_CHILD';

export const select = (nodeId) => ({
  type: SELECT,
  nodeId
});

export const toggle = (nodeId) => ({
  type: TOGGLE,
  nodeId
});
export const setLoading = (nodeId, isLoading) => ({
  type: SET_LOADING,
  nodeId,
  isLoading
});

export const requestToggle = (nodeId, isExpanded) => dispatch => {
  if (isExpanded) {
    return dispatch(toggle(nodeId));
  } else {
    dispatch(toggle(nodeId));
    dispatch(setLoading(nodeId, true));
    return new Promise(resolve => {
      setTimeout(() => {
        const childData = [{
              "name": `${nodeId}1`,
              "id": `${nodeId}1`,
              "isLeaf": true,
              // "childIds": []
        },
        {
            "name":`${nodeId}2`,
            "id": `${nodeId}2`,
            // "childIds": []
        }];
        childData.forEach(child => {
           let childId = dispatch(createNode(child)).nodeId;
           dispatch(addChild(nodeId, childId));
           resolve();
        });
      }, 500);
    }).then( () => {
      dispatch(setLoading(nodeId, false));
    });
  }
};

let nextId = 0;
export const createNode = (nodeData) => ({
  type: CREATE_NODE,
  // nodeId: `new_${nextId++}`
  nodeId: nodeData.id,
  nodeData
});

export const deleteNode = (nodeId) => ({
  type: DELETE_NODE,
  nodeId
});

export const addChild = (nodeId, childId) => ({
  type: ADD_CHILD,
  nodeId,
  childId
});

export const removeChild = (nodeId, childId) => ({
  type: REMOVE_CHILD,
  nodeId,
  childId
});