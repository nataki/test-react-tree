const api = {
    loadChildNodes: (nodeId) => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve([{
                    "name": `${nodeId}1`,
                    "id": `${nodeId}1`,
                    "isLeaf": true,
                    data: {
                        "status": "pending",
                        "name": `${nodeId}1`,
                        "progress": 20,
                        "hasChildren": false
                    }
                    // "childIds": []
                },
                    {
                        "name": `${nodeId}2`,
                        "id": `${nodeId}2`,
                        data: {
                            "status": "error",
                            "name": `${nodeId}2`,
                            "progress": 20,
                            "hasChildren": true
                        }
                        // "childIds": []
                    }]);
            }, 500);
        });
    }
};

export default api;