import React, { Component } from 'react'
import ControlPanel from './guide.jsx'
import Container from './pageComponent/container.jsx'
import Bar from './pageComponent/Bar.jsx'
export default class App extends Component {
  render() {
    return (
            <div style={{height:'100%',width:'100%'}}>
                <Bar/>
                <Container/>
                <ControlPanel/>
            </div>
    );
  }
}
