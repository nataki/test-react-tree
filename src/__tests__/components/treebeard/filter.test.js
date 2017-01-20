/**
 * Created by nataliia.akimova on 1/20/2017.
 */

import {findNode} from '../../../components/treebeard/filter';

const data = {
    name: 'root',
    id: 'id_parent0',
    toggled: true,
    children: [
        {
            name: 'parent',
            id: 'id_parent1',
            children: [
                {
                    name: 'child1',
                    id: 'id_child1'
                },
                {
                    name: 'child2',
                    id: 'id_child2'
                }
            ]
        },
        {
            name: 'loading parent',
            id: 'id_parent2',
            loading: true,
            children: []
        },
        {
            name: 'parent3',
            id: 'id_parent3',
            children: [
                {
                    name: 'nested parent',
                    id: 'id_parent31',
                    children: [
                        {
                            name: 'nested child 1',
                            id: 'id_child311'
                        },
                        {
                            name: 'nested child 2',
                            id: 'id_child312'
                        }
                    ]
                }
            ]
        }
    ]
};

describe('findNode', () => {

    it('is defined', () => {
        expect(findNode).not.toBe(undefined);
    });

    it('looks for nodes by id', () => {
        let node = findNode(data, 'id_parent3');
        expect(node).not.toBe(undefined);
        expect(node.name).toBe('parent3');
    });

    it('looks for root by id', () => {
        let node = findNode(data, 'id_parent0');
        expect(node.name).toBe('root');
    });

    it('looks for child by id', () => {
        let node = findNode(data, 'id_child2');
        console.log(node);

        expect(node.name).toBe('child2');
    });
});
