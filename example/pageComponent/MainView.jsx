import React from 'react';

const styles = {
    slogan: {
        lineHeight: '200%',
        fontStyle:'italic',
        fontWeight:'bold',
        color:'#554',
        textAlign:'center',
    },
    mainBlock: {
        width: 'auto',
        height:'auto',
    },
    brand: {
        fontSize: '4vw',
        lineHeight:'300%',
    }
}
export default class MainView extends React.Component {
    constructor(props){
        super(props);
    } 
    render() {
        return(
            <div className="main-block" style={styles.mainBlock}>
                    <div className="brand" style={styles.brand}>
                        Best way to let user explore your website.
                    </div>
                    <div className="slogan" style={styles.slogan}>
                        <span>With a professional guide in your website,<br/></span>
                        <span>User won&#039;t miss the awesome design anymore!</span>
                    </div>
            </div>
        );
    }
}
