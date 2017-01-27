/**
 * Created by nataliia.akimova on 1/25/2017.
 */
import Immutable, {Seq} from 'immutable';
// import TreeUtils from 'immutable-treeutils';
// import TreeUtils from './TreeUtils';

// let treeUtils = new TreeUtils(Seq.of('data'));

/*const defaultMatcher = (filterText, node) => {
    return node.id === filterText;
};
const findNode = (node, filter, matcher = defaultMatcher) => {
    let result = false;
    if (matcher(filter, node)){
        result = node;
    } else if (node.children && // or i have decendents and one of them match
        node.children.length) {
        for (let i=0; i<node.children.length; i++) {
            let child = node.children[i];
            result = findNode(child, filter, matcher);
            if (result) break;
        }
    }
    return result ?  Object.assign({}, result) : false;
};*/
/*const utils = {*/
const    find = (node, matcher) => {
        let result = false;
        if (matcher(node)){
            result = node;
        } else if (node.children && // or i have decendents and one of them match
            node.children.length) {
            for (let i=0; i<node.children.length; i++) {
                let child = node.children[i];
                result = this.find(child, matcher);
                if (result) break;
            }
        }
        return result ?  Object.assign({}, result) : false;
    };

 const  findKeyPath = (node, matcher) => {
        let result = false;
        if (matcher(node)){
            result = [node.id];
        } else if (node.children && // or i have decendents and one of them match
            node.children.length) {
            for (let i=0; i<node.children.length; i++) {
                let child = node.children[i];
                let subPath = findKeyPath(child, matcher);
                if (subPath) {
                    result = [node.id].concat(subPath);
                    break;
                }
            }
        }
        return result;
        // return result.length ? result : false;
 };
// };
export default class DataSource {
    constructor(data){
        this.data = Immutable.Map(data);
        // this.data = data;
    }

    setByID(nodeID, key, value){
        let keyPath = findKeyPath(this.data.toJS(), node => node.id === nodeID);
        this.data = this.data.
        console.log(keyPath);
            // findNode(data, nodeId);
    }
}