import React, { Component } from 'react';
import { connect } from 'react-redux';
import ColorItem from '../ColorItem/ColorItem';

// The entire store is passed in to this function
const mapReduxToProps = (reduxStore) => ({
    // this.props.reduxStore will contain the entire store
    // reduxStore: reduxStore
    // only render when secondReducer is changed
    colors: reduxStore.secondReducer  // this.props.colors will an array
});

class ColorList extends Component {
    render() {
        console.log('Rendering ColorList');
        return (
            <div>
                <pre>{JSON.stringify(this.props)}</pre>
                {/* this.props.reduxStore.secondReducer.map... */}
                {this.props.colors.map((color, i) => {
                    return <ColorItem key={i} color={color} />
                })}
            </div>
        )
    }
}

export default connect(mapReduxToProps)(ColorList);