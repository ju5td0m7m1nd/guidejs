import React, { Component } from 'react'
import ReactDom  from 'react-dom'
import Guide from '../'
import Container from './pageComponent/container.jsx'
import Bar from './pageComponent/Bar.jsx'
class App extends Component {
  render() {
    return (
            <div style={{height:'100%',width:'100%'}}>
                <Bar/>
                <Container/>
                <Guide/>
            </div>
    );
  }
}


ReactDOM.render(<App />, document.getElementById('root'));
