import React from 'react'

const styles = {
    btn: {
        verticalAlign:'top',
        boxShadow:'0 2px 5px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12)',
        padding:'5px',
        cursor:'pointer',
        textAlign:'center',
        fontSize:'18px',
        fontWeight:'bold',
        display:'inline-block',
        width:'auto',
        height:'auto',
        marginLeft:'5px',
    },
    startBtn: {
        background:'rgba(255,255,255,1)',
        color:'rgba(230,0,0,1)', 
    },
    endBtn: {
        background:'rgba(230,0,0,1)',
        color:'#FFF',
    },
    playBtn: {
        color:'#FFF',
        background:'rgba(0,230,0,1)',
    }, 
}
class StartBtn extends React.Component{
    constructor(props){
        super(props);
    }
    render() {
        let startBtnStyle = Object.assign({},styles.btn,styles.startBtn,{'marginLeft':'0'});
        return <div className="start-btn" onClick={this.props.handleRecord} style={startBtnStyle}>Start</div>
    }
}

class EndBtn extends React.Component{
    constructor(props){
        super(props);
    }
    render() {
        let endBtnStyle = Object.assign({},styles.btn,styles.endBtn,{'marginLeft':'0'});
        return <div className="start-btn" onClick={this.props.handleRecord} style={endBtnStyle}>Stop</div>
    }
}

class PlayBtn extends React.Component{
    constructor(props){
        super(props);
    }
    render() {
        let playBtnStyle = Object.assign({},styles.btn,styles.playBtn);
        return <div className="start-btn" onClick={this.props.handleReplay} style={playBtnStyle}>Play</div>
    }
} 
 
export {StartBtn, EndBtn, PlayBtn} 
