import React, { Component } from 'react';
import ControlPanel from './guide.jsx';
const styles = {
    page : {
        height:'100%',
        width:'100%',
        background:'rgba(123,136,200,1)',
    }, 
    page1 : {
        height:'100%',
        width:'100%',
        background:'rgba(182,255,203,1)',
    },
    page2 : {
        height:'100%',
        width:'100%',
        background:'rgba(255,231,100,1)',
    },
}
export default class App extends Component {
  render() {
    return (
        <div style={{height:'100%',width:'100%'}}>
            <ControlPanel/>
            <div style={styles.page}/>
            <div style={styles.page1}/>
            <div style={styles.page2}/>
        </div>
    );
  }
}
