import React from 'react'
import PlayFont from 'react-icons/lib/fa/play-circle-o'
import StopFont from 'react-icons/lib/fa/pause'
import ReactFont from 'react-icons/lib/fa/video-camera'
import QuestionFont from 'react-icons/lib/fa/question'
const styles = {
    btn: {
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        position:'fixed',
        right:'10%', 
        bottom:'10%',
        boxShadow:'0 2px 5px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12)',
        cursor:'pointer',
        fontWeight:'bold',
        width:'3em',
        height:'3em',
        borderRadius:'50%',
        zIndex: '9998',
        transition:'all .3s ease-in',
    },
    startBtn: {
        background:'rgba(255,255,255,1)',
        color:'rgba(230,0,0,1)', 
    },
    endBtn: {
        background:'rgba(230,0,0,1)',
        color:'#FFF',
    },
    qBtn: {
      background:'rgba(255,255,255,1)',
      color:'#222',
    },
    playBtn: {
        color:'rgba(0,230,0,1)',
        background:'rgba(255,255,255,1)',
    }, 
}
class RecordBtn extends React.Component{
    constructor(props){
        super(props);
        this.state= {
          openPos: '20',
          open: false,
          start: false,
        }
        this.openBtn = this.openBtn.bind(this);
        this.startRecord = this.startRecord.bind(this);
    }
    openBtn () {
      this.setState({open: !this.state.open});
    }
    startRecord() {
      this.props.handleRecord();
      this.setState({start: !this.state.start});
    }
    render() {
        let recordBtnStyle = Object.assign({},styles.btn,styles.startBtn);
        recordBtnStyle = this.state.start ? Object.assign({}, recordBtnStyle, styles.PauseBtn):
          Object.assign({}, recordBtnStyle, styles.StartBtn);
        recordBtnStyle = this.state.open ? Object.assign({},recordBtnStyle,{'right':`${this.state.openPos}%`}) : 
          recordBtnStyle;

        return  <div 
                  className="start-btn" 
                  onClick={this.startRecord} 
                  style={recordBtnStyle}
                >
                {
                  this.state.start ? <StopFont height="1.5em" width="1.5em" />:
                  <ReactFont height="1.5em" width="1.5em" />
                }
                </div>
    }
}
class PlayBtn extends React.Component{
    constructor(props){
        super(props);
        this.state= {
          openPos: '15',
          open:false,
        }
        this.openBtn = this.openBtn.bind(this);
    }
    openBtn () {
      this.setState({open: !this.state.open});
    }
    render() {
        let playBtnStyle = Object.assign({},styles.btn,styles.playBtn);
        playBtnStyle = this.state.open ? Object.assign({},playBtnStyle,{'right':`${this.state.openPos}%`}) : 
          playBtnStyle;
        return  <div className="play-btn" onClick={this.props.handleReplay} style={playBtnStyle}>
                  <PlayFont height="2em" width="2em"/></div>
    }
} 

class QuestionBtn extends React.Component{
    constructor(props){
        super(props);
        this.state= {
          openPos: this.props.mode === 'dev' ? 25 : 20,
          open:false,
        }
        this.openBtn = this.openBtn.bind(this);
        this.visitGuideJs = this.visitGuideJs.bind(this);
    }
    openBtn () {
      this.setState({open: !this.state.open});
    }
    visitGuideJs() {
      window.open("https://www.npmjs.com/package/guidejs");
    }
    render() {
        let qBtnStyle = Object.assign({},styles.btn,styles.qBtn);
        qBtnStyle = this.state.open ? Object.assign({},qBtnStyle,{'right':`${this.state.openPos}%`}) : 
          qBtnStyle;
        return  <div className="question-btn" onClick={this.visitGuideJs} style={qBtnStyle}>
                  <QuestionFont height="2em" width="2em"/></div>
    }
}
export {RecordBtn, PlayBtn, QuestionBtn} 
