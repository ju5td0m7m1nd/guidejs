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

export default class Guide extends React.Component{
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
        this._addListen = this._addListen.bind(this);
        this._removeListen = this._removeListen.bind(this);
        this._replay = this._replay.bind(this);
        this._getCurrentTime = this._getCurrentTime.bind(this);
    }
    componentDidMount() {
    
    }
    _getCurrentTime() {
      let currentTime = new Date();
      return `${currentTime.getMinutes()}:${currentTime.getSeconds()}`;
    } 
    _handleClickEvent(e) {
      this.actionLog.push({click: [e.target, this._getCurrentTime()]}); 
    }
    /* Add and Remove event listener
     *
     */
    _addListen() {
        this.actionLog = []; 
        window.addEventListener('click', this._handleClickEvent); 
        window.addEventListener('scroll',this._handleScrollEvent);
    }
    _removeListen() {
        window.removeEventListener('click', this._handleClickEvent);
        window.removeEventListener('scroll',this._handleScrollEvent);
    }
    _handleScrollEvent(){
        let currentTop = this._currentPosition(); 
        let currentTime = new Date();  
        this.actionLog.push({scroll: [currentTop, this._getCurrentTime()]});
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
        let preStepTime = 0;
        const _scrollFilter = (action) => {
            return action.hasOwnProperty('scroll');
        }
        for (let key in this.actionLog) {
          let action = this.actionLog[key];  
          
          if ( action.hasOwnProperty('scroll')) {
           // Need to calculate time with timestamp
            // to get the real simulation of website owner behavior
            /*
            let prePosition = key > 1 ? this.actionLog[key-1]['scroll'][0] : 
                                        this.actionLog.filter(_scrollFilter);
            */
            ( (offset, time) => {
                setTimeout( ()=>window.scrollTo(0, offset), time);
                preStepTime = time;
            })(action['scroll'][0], preStepTime + 20);
          }
          else if (action.hasOwnProperty('click')) {
            // Ignore start record step
            if (key != 0 ) {
              const clickEvent = this._createSimulatedClick();
              ( (target, time, e) => {
                setTimeout( ()=> target.dispatchEvent(e), time); 
                preStepTime = time;
              })(action['click'][0], preStepTime + (400) , clickEvent);
            }
          }
          else if (action.hasOwnProperty('halt')) {
            preStepTime += 200;
          }
        }
    }

    _createSimulatedClick() {
      const e = document.createEvent('MouseEvent');
      e.initMouseEvent('click',true,true);
      return e
    }
    render(){
        if (this.state.record) {
            this._addListen();
        } 
        else {
            this._removeListen();
        }
        let recordBtn = !this.state.record ? <StartBtn handleRecord={this._startRecord}/>: <PauseBtn handleRecord={this._stopRecord}/>; 
        return  <div className="panel" style={styles.panel}>
                    {recordBtn}
                    <PlayBtn handleReplay={this._replay}/>
                </div>
    }
}
