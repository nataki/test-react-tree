import { combineReducers } from 'redux'
import nodes from './nodes'
import selection from './selection'

const treeApp = combineReducers({
    nodes,
    selection
});

export default treeApp;
