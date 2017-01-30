
const selection = (state = [], action) => {
    switch (action.type) {
        case 'SET_SELECTED':
            return [action.nodeId];
        case 'SET_DESELECTED':
            return [];
        default:
            return state
    }
};

export default selection
