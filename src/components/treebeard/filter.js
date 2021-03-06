//TODO: use Immutable.js to correctly clone tree  structure

export const defaultMatcher = (filterText, node) => {
    return node.id === filterText;
};

const nameMatcher = (filterText, node) => {
    return node.name.toLowerCase().indexOf(filterText.toLowerCase()) !== -1;
};

export const defaultUpdater = (node, data) => {
    return Object.assign({}, node, {children: data || []})
};

export const findNode = (node, filter, matcher = defaultMatcher) => {
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
};
const checkNode = (node, filter, matcher = defaultMatcher) => {
    return matcher(filter, node) || // i match
        (node.children && // or i have decendents and one of them match
        node.children.length &&
        !!node.children.find(child => findNode(child, filter, matcher)));
};

export const updateFilteredNodes = (node, filter, data, matcher = defaultMatcher, updater = defaultUpdater) => {
    //TODO:
    let children = node.children;
    if (!children || children.length === 0){
        return Object.assign({}, node, { toggled: false });
    }
    const childrenWithMatches = node.children.filter(child => findNode(child, filter, matcher));
    const shouldExpand = childrenWithMatches.length > 0;
    // If im going to expand, go through all the matches and see if thier children need to expand
    if(shouldExpand){
        children = childrenWithMatches.map(child => {
            return updateFilteredNodes(child, filter, matcher);
        });
    }
    return Object.assign({}, node, {
        children: children,
        toggled: shouldExpand
    });
};