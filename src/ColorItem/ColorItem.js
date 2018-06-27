import React, { Component } from 'react';

class ColorItem extends Component {
    render() {
        return (
            <li>{this.props.color}</li>
        );
    }
}

export default ColorItem;