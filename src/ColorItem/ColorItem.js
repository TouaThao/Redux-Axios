import React, { Component } from 'react';
import axios from 'axios'
import { connect } from 'react-redux'

class ColorItem extends Component {



    deleteOneColor = (id) => {
        axios.delete(`/api/colors/${this.props.color._id}`).then(response => {
            console.log('did we got this?', response.data)
            this.refreshData()
        })

    }
    refreshData() {
        axios.get('/api/colors').then((response) => {
            this.props.dispatch({
                type: 'SET_COLORS',
                payload: response.data
            })
        })
    }

    render() {
        return (
            <li>{this.props.color.name} {this.props.color.count}
                <button onClick={() => this.deleteOneColor(this.props.id)}>
                    Delete
                </button>
            </li>
        );
    }
}

export default connect()(ColorItem);

