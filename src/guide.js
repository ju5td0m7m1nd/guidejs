import React from 'react'
import {smoothScroll} from './mixin/smoothScroll' 
import {RecordBtn, PlayBtn, QuestionBtn} from './button.js'
const styles = {
    panel : {
        zIndex: '9999',
        position:'fixed',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        right:'10%', 
        bottom:'10%',
        fontWeight:'bold',
        color:'#FFF',
        cursor:'pointer',
        height:'3em',
        width:'3em',
        borderRadius:'50%',
        background:'rgb(0, 188, 212)',
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
        this._handleMouseDown = this._handleMouseDown.bind(this);
        this._handleMouseMove = this._handleMouseMove.bind(this);
        this._handleMouseUp = this._handleMouseUp.bind(this);
        this._currentPosition = this._currentPosition.bind(this);
        this._startRecord = this._startRecord.bind(this);
        this._stopRecord = this._stopRecord.bind(this);
        this._addListen = this._addListen.bind(this);
        this._removeListen = this._removeListen.bind(this);
        this._replay = this._replay.bind(this);
        this._getCurrentTime = this._getCurrentTime.bind(this);
        this.panelEvent = this.panelEvent.bind(this);
        this._createSimulatedMouseEvent = this._createSimulatedMouseEvent.bind(this);
    }
    componentDidMount() {
    
    }
    _getCurrentTime() {
      let currentTime = new Date();
      return `${currentTime.getMinutes()}:${currentTime.getSeconds()}`;
    } 
    /*  Handle event put here ! 
        actionLog[event].push([param1, param2, param3 ])
        event: type of action
        param1: target
        param2: time
        param3: additional info
    */
     
    _handleScrollEvent(){
        let currentTop = this._currentPosition(); 
        let currentTime = new Date();  
        this.actionLog.push({scroll: [currentTop, this._getCurrentTime()]});
    }
    _handleClickEvent(e) {
      this.actionLog.push({click: [e.target, this._getCurrentTime()]}); 
    }
    _handleMouseDown(e) {
      this.actionLog.push({mousedown: [e.target, this._getCurrentTime()]});
    }
    _handleMouseMove(e) {
      this.actionLog.push({mousemove: [e.target, this._getCurrentTime(), 
        {cx: e.clientX, cy:e.clientY, sx:e.screenX, sy:e.screenY}]});
    }
    _handleMouseUp(e) {
      this.actionLog.push({mouseup: [e.target, this._getCurrentTime()]});
    }
    /* Add and Remove event listener
     *
     */
    _addListen() {
        this.actionLog = []; 
        window.addEventListener('click', this._handleClickEvent); 
        window.addEventListener('scroll',this._handleScrollEvent);
        window.addEventListener('mousedown',this._handleMouseDown);
        window.addEventListener('mousemove',this._handleMouseMove);
        window.addEventListener('mouseup',this._handleMouseUp);
    }
    _removeListen() {
        window.removeEventListener('click', this._handleClickEvent);
        window.removeEventListener('scroll',this._handleScrollEvent);
        window.removeEventListener('mousedown', this._handleMouseDown);
        window.removeEventListener('mousemove',this._handleMouseMove);
        window.removeEventListener('mouseup',this._handleMouseUp);
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
           
            ( (offset, time) => {
                setTimeout( ()=>window.scrollTo(0, offset), time);
                preStepTime = time;
            })(action['scroll'][0], preStepTime + 20);
          }
          else if (action.hasOwnProperty('click')) {
            // Ignore start record step
            if (key != 0 ) {
              const clickEvent = this._createSimulatedMouseEvent('click');
              ( (target, time, e) => {
                setTimeout( ()=> target.dispatchEvent(e), time); 
                preStepTime = time;
              })(action['click'][0], preStepTime + 400 , clickEvent);
            }
          }
          else if (action.hasOwnProperty('mousedown')) {
            ((target, time, e) => {
              setTimeout( ()=> target.dispatchEvent(e), time);
              preStepTime = time;
            })(action['mousedown'][0], preStepTime + 10, this._createSimulatedMouseEvent('mousedown'));
          } else if (action.hasOwnProperty('mouseup')) {
            ((target, time, e) => {
              setTimeout( ()=> target.dispatchEvent(e), time);
              preStepTime = time;
            })(action['mouseup'][0], preStepTime + 10, this._createSimulatedMouseEvent('mouseup'));
          }
          else if (action.hasOwnProperty('mousemove')) {
            const additionalInfo = action['mousemove'][2];
            ((target, time, e) => {
              setTimeout( ()=> target.dispatchEvent(e), time);
              preStepTime = time;
            })(action['mousemove'][0], preStepTime + 10, this._createSimulatedMouseEvent('mousemove',additionalInfo)); 
          }
          else if (action.hasOwnProperty('halt')) {
            preStepTime += 200;
          }
        }
    }
    /* addition info will not null, if mouse event need extra info */
    _createSimulatedMouseEvent(action, info) {
      const e = document.createEvent('MouseEvent');
      if (action === 'click') {
        e.initMouseEvent('click',true,true);
      } else if ( action === 'mousedown' ) {
        e.initMouseEvent('mousedown',true,true);
      } else if (action === 'mousemove') {
        e.initMouseEvent('mousemove',true,true,document.defaultView,0,info.sx,info.sy,info.cx,info.cy,false,false,false,false,0,null);
      } else if (action === 'mouseup') {
        e.initMouseEvent('mouseup', true,true);
      }
      return e
    }
    panelEvent() {
        this.refs.playBtn.openBtn();
        this.refs.recordBtn.openBtn();
        this.refs.qBtn.openBtn();
    }
    render(){
        if (this.state.record) {
            this._addListen();
        } 
        else {
            this._removeListen();
        }
        let recordBtn = !this.state.record ? <RecordBtn ref="recordBtn" handleRecord={this._startRecord}/>: <RecordBtn ref="recordBtn" handleRecord={this._stopRecord}/>; 

        return  <div>
                  <div className="panel" onClick={this.panelEvent} style={styles.panel}>
                  G    
                  </div>
                  {recordBtn}
                  <PlayBtn ref="playBtn" handleReplay={this._replay}/>
                  <QuestionBtn ref="qBtn" />
                </div>
    }
}
