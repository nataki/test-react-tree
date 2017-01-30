const api = {
    loadChildNodes: (nodeId) => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve([{
                    "name": `${nodeId}1`,
                    "id": `${nodeId}1`,
                    "isLeaf": true,
                    // "childIds": []
                },
                    {
                        "name": `${nodeId}2`,
                        "id": `${nodeId}2`,
                        // "childIds": []
                    }]);
            }, 500);
        });
    }
};

export default api;