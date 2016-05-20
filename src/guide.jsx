import React from 'react'
import {smoothScroll} from './mixin/smoothScroll' 
import {StartBtn, PlayBtn, EndBtn} from './button.jsx'
const styles = {
    panel : {
        position:'fixed',
        bottom:'15px',
        right:'15px', 
        width:'auto',
        padding:'5px',
        background:'#FFF',
        boxShadow:'0 2px 5px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12)',
    },
}

export default class ControllPanel extends React.Component{
    constructor(props){
        super(props);
        let scrollStep = [];
        this.state = {
            record: false,
        }
        this._currentPosition = this._currentPosition.bind(this);
        this._startRecord = this._startRecord.bind(this);
        this._stopRecord = this._stopRecord.bind(this);
        this._addScrollListen = this._addScrollListen.bind(this);
        this._addMouseClickListen = this._addMouseClickListen.bind(this);
        this._removeMouseClickListen = this._removeScrollListen.bind(this);
        this._removeScrollListen = this._removeScrollListen.bind(this);
        this._handleScrollEvent = this._handleScrollEvent.bind(this);
        this._replay = this._replay.bind(this);
    }
    componentDidMount() {
        
    }
    /* Add and Remove event listener
     *
     */
    _addScrollListen() {
        this.scrollStep = []; 
        window.addEventListener('scroll',this._handleScrollEvent);
    }
    _addMouseClickListen() {

    }
    _removeScrollListen() {
        window.removeEventListener('scroll',this._handleScrollEvent);
    }
    _removeMouseClickListen() {

    }
    _handleScrollEvent(){
        let currentTop = this._currentPosition(); 
        let currentTime = new Date();  
        this.scrollStep.push([currentTop, `${currentTime.getMinutes()}:${currentTime.getSeconds()}`]);
    }
    _currentPosition() {
        let doc = document.documentElement;
        let top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
        return top
    }
    _startRecord (){
        this.setState({record: true});
    }
    _stopRecord (){
        this.setState({record: false});
    }
    _replay () {
        let preStepTime = `0:0`;
        let prePosition = 0;
        for (let key in this.scrollStep) {
            let step = this.scrollStep[key];  
            console.log(step[0]);
            prePosition = step > 1 ? this.scrollStep[step-1][0] : this.scrollStep[0][0];
            ( ()=> {
                smoothScroll( prePosition, step[0]); 
            })();
        }
        // scroll to last step
        smoothScroll (prePosition, this.scrollStep[this.scrollStep.length-1][0]);
    }
    render(){
        if (this.state.record) {
            this._addScrollListen();
            this._addMouseClickListen();
        } 
        else {
            this._removeScrollListen();
            this._removeMouseClickListen();
        }
        let recordBtn = !this.state.record ? <StartBtn handleRecord={this._startRecord}/>: <EndBtn handleRecord={this._stopRecord}/>; 
        return  <div className="panel" style={styles.panel}>
                    {recordBtn}
                    <PlayBtn handleReplay={this._replay}/>
                </div>
    }
}
