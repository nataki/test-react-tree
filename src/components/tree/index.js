/**
 * Created by nataliia.akimova on 1/24/2017.
 */
import React, {Component} from 'react';
const data_source = require('../../data/data-minimal.json');
import Tree from './Tree';
import './css/main.css';

import DataSource from './DataSource';

export default class TreeExample3 extends Component{
    //manage all datasource operations here
    constructor(props){
        super(props);
        this.state = {
            data: data_source,
            selected: []
        };
        this.onSelect = this.onSelect.bind(this);
        this.onToggle = this.onToggle.bind(this);
    }
    onSelect(node, isSelected){
        console.log('onSelect', node.id, arguments);
        //check selection mode - if it's single, deselect other selected nodes
        if (this.state.selected){
            this.setState({
                selected: [node.id]
            });
            let dataSource = new DataSource(this.state.data);
            dataSource.setByID(node.id);
        }
        //change data source directly here
    }
    onToggle(){
        console.log('onToggle', arguments);
        //change data directly here
        //trigger loading, change loading indicator while it's in process, reset after rejecting/resolving. update subtree after
    }
    render(){
        return (
            <div>
                <h2>Custom Tree</h2>
                <Tree
                    data={this.state.data}
                    onSelect={this.onSelect}
                />
            </div>
        );
    }
}