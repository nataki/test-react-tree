export const SET_SELECTED = 'SET_SELECTED';
export const SET_DESELECTED = 'SET_DESELECTED';
export const SET_LOADING = 'SET_LOADING';
export const TOGGLE = 'TOGGLE';
export const CREATE_NODE = 'CREATE_NODE';
export const DELETE_NODE = 'DELETE_NODE';
export const UPDATE_NODE = 'UPDATE_NODE';
export const ADD_CHILD = 'ADD_CHILD';
export const REMOVE_CHILD = 'REMOVE_CHILD';
export const REMOVE_CHILDREN = 'REMOVE_CHILDREN';

export const set_selected = (nodeId) => ({
  type: SET_SELECTED,
  nodeId
});

export const set_deselected = (nodeId) => ({
  type: SET_DESELECTED,
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

export const createNode = (nodeData) => ({
  type: CREATE_NODE,
  nodeId: nodeData.id,
  nodeData
});

export const deleteNode = (nodeId) => ({
  type: DELETE_NODE,
  nodeId
});

export const updateNode = (nodeId, nodeData) => ({
  type: UPDATE_NODE,
  nodeId,
  nodeData
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

export const removeChildren = (nodeId) => ({
  type: REMOVE_CHILDREN,
  nodeId
});

export const select = (nodeId) => (dispatch, getState) => {
    //single-selection mode
    let state = getState();
    if (state.selection.length && (nodeId !== state.selection[0])) {
        dispatch(set_deselected(state.selection[0]));//deselect
    }
    dispatch(set_selected(nodeId)); //don't dispatch deselect twice
};

export const requestToggle = (nodeId, isExpanded) => (dispatch, getState, api) => {
    if (isExpanded) {
        dispatch(removeChildren(nodeId));
        return dispatch(toggle(nodeId));
    } else {
        dispatch(toggle(nodeId));
        dispatch(setLoading(nodeId, true));

        return api.loadChildNodes(nodeId)
            .then((childData) => {
                childData.forEach(child => {
                    let childId = dispatch(createNode(child)).nodeId;
                    dispatch(addChild(nodeId, childId));
                });
                dispatch(setLoading(nodeId, false));
            },
            () => {
            });
    }
};
