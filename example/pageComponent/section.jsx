import React from 'react'
const styles = {
    section : {

    }
}
export default class Section extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const style = Object.assign({}, styles.section, this.props.style); 
        return  <div style = {style}>
                    {this.props.children}
                </div>
    }
} 
