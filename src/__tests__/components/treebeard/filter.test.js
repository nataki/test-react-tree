/**
 * Created by nataliia.akimova on 1/20/2017.
 */

import {findNode, updateFilteredNodes, defaultUpdater} from '../../../components/treebeard/filter';

const data = require('../../../data/data.json');

describe('findNode', () => {
    it('is defined', () => {
        expect(findNode).not.toBe(undefined);
    });

    it('looks for nodes by id', () => {
        let node = findNode(data, 'id_parent3');
        expect(node).not.toBe(undefined);
        expect(node.name).toBe('parent3');
    });

    it('looks for nested parents by id', () => {
        let node = findNode(data, 'id_parent31');
        expect(node.name).toBe('parent31');
    });

    it('looks for root by id', () => {
        let node = findNode(data, 'id_parent0');
        expect(node.name).toBe('root');
    });

    it('looks for child by id', () => {
        let node = findNode(data, 'id_child311');
        console.log(node);
        expect(node.name).toBe('child311');
    });
});

describe('defaultUpdater', () => {
    it('is defined', () => {
        expect(defaultUpdater).not.toBe(undefined);
    });

    it('updates children', () => {
        let node = {
                name: 'nodeName1',
                id: 'nodeId1'
            },
            data = [
                {
                    name: 'nodeName11',
                    id: 'nodeId11'
                },
                {
                    name: 'nodeName12',
                    id: 'nodeId12'
                }
            ],
            newNode = defaultUpdater(node, data);
        expect(newNode.children).toBeDefined();
        expect(newNode.children.length).toBe(2);
        expect(newNode.children[0]).toEqual(data[0]);
        expect(newNode.children[1]).toEqual(data[1]);
    });

    it('overrides existing fields', () => {
        let node = {
                name: 'nodeName1',
                id: 'nodeId1',
                children: [
                    {
                        name: 'nodeNameXXX',
                        id: 'nodeIdXX'
                    }
                ]
            },
            data = [
                {
                    name: 'nodeName11',
                    id: 'nodeId11'
                },
                {
                    name: 'nodeName12',
                    id: 'nodeId12'
                }
            ],
            newNode = defaultUpdater(node, data);
        expect(newNode.children).toBeDefined();
        expect(newNode.children.length).toBe(2);
        expect(newNode.children[0]).toEqual(data[0]);
        expect(newNode.children[1]).toEqual(data[1]);
    });

    it('updates children with empty array if data is not defined', () => {
        let node = {
                name: 'nodeName1',
                id: 'nodeId1'
            },
            data ,
            newNode = defaultUpdater(node, data);
        expect(newNode.children).toBeDefined();
        expect(newNode.children.length).toBe(0);
    });
});

describe('updateFilteredNodes', () => {
    it('is defined', () => {
        expect(updateFilteredNodes).not.toBe(undefined);
    });

    it('updates subtree', () => {
        let dataToUpdate = [
                {
                    name: 'nodeName11',
                    id: 'nodeId11'
                },
                {
                    name: 'nodeName12',
                    id: 'nodeId12'
                }
            ],
            newSource = updateFilteredNodes(data, 'id_parent31', dataToUpdate);
        expect(newSource).not.toBe(undefined);
        expect(findNode(newSource, 'id_parent31').children).toEqual(dataToUpdate);
    });
});