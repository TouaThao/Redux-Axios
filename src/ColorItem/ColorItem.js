import React, { Component } from 'react';

class ColorItem extends Component {
    render() {
        return (
            <li>{this.props.color.name} {this.props.color.count}</li>
        );
    }
}

export default ColorItem;