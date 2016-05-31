import React from 'react'
import {smoothScroll} from './mixin/smoothScroll' 
import {StartBtn, PlayBtn, PauseBtn} from './button.jsx'
const styles = {
    panel : {
        zIndex: '999',
        position:'fixed',
        bottom:'15px',
        height:'auto',
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
        let actionLog = [];
        this.state = {
            record: false,
        }
        this._handleScrollEvent = this._handleScrollEvent.bind(this);
        this._handleClickEvent = this._handleClickEvent.bind(this);
        this._currentPosition = this._currentPosition.bind(this);
        this._startRecord = this._startRecord.bind(this);
        this._stopRecord = this._stopRecord.bind(this);
        this._addScrollListen = this._addScrollListen.bind(this);
        this._addMouseClickListen = this._addMouseClickListen.bind(this);
        this._removeMouseClickListen = this._removeScrollListen.bind(this);
        this._removeScrollListen = this._removeScrollListen.bind(this);
        this._replay = this._replay.bind(this);
    }
    componentDidMount() {
       window.addEventListener('click', this._handleClickEvent); 
    
    }
    _handleClickEvent(e) {
        console.log(e);
    }
    /* Add and Remove event listener
     *
     */
    _addScrollListen() {
        this.actionLog = []; 
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
        this.actionLog.push({scroll: [currentTop, `${currentTime.getMinutes()}:${currentTime.getSeconds()}`]});
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
        const _scrollFilter = (action) => {
            return action.hasOwnProperty('scroll');
        }
        console.log(this.actionLog);
        for (let key in this.actionLog) {
    
            let action = this.actionLog[key];  
            
            if ( action.hasOwnProperty('scroll')) {
                let prePosition = key > 1 ? this.actionLog[key-1]['scroll'][0] : 
                                            this.actionLog.filter(_scrollFilter);
                ( (offset, time) => {
                    setTimeout( ()=>window.scrollTo(0, offset), time);
                })(action['scroll'][0], key*10);
            }
        }
        
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
        let recordBtn = !this.state.record ? <StartBtn handleRecord={this._startRecord}/>: <PauseBtn handleRecord={this._stopRecord}/>; 
        return  <div className="panel" style={styles.panel}>
                    {recordBtn}
                    <PlayBtn handleReplay={this._replay}/>
                </div>
    }
}
