import React from 'react'
const styles = {
    section : {
        display:'flex',
        alignItems: 'center',
    }
}
export default class Section extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        // assign a justify attribute.
        const style = Object.assign({}, styles.section, {justifyContent: this.props.justify,
                                    height: this.props.height,
                                    width: this.props.width}); 
        return  <div style = {style}>
                    {this.props.children}
                </div>
    }
} 
