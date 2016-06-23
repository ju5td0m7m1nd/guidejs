import React from 'react'
import Section from './section.jsx' 
import MainView from './MainView.jsx'
import FeatureCard from './FeatureCard.jsx'
import Wheel from './Wheel.jsx'
export default class Container extends React.Component {
    constructor(props) {
        super(props);        
    }
    render () {
        const mainStyle = {
          display:'flex',
          alignItems: 'center',
          height:'100%',
          width:'100%',
          justifyContent: 'center',
          background:'#EEE',
        }
        const featureStyle = {
          display:'flex',
          alignItems: 'center',
          justifyContent:'space-around',
          alignItems: 'flex-start',
          paddingTop: '10%',
          height:'80%',
          width:'100%',
        }
        const wheelStyle = {
          height:'100%',
          width:'100%',
          position:'relative',
        }
        return  <div style={{height:'100%', width:'100%'}}>
                    <Section style={mainStyle}>
                        <MainView/>
                    </Section>
                    <Section style={featureStyle}>
                        <FeatureCard class='icon_floppy_alt' title='CUSTOMIZED' subtitle='Train your own guide.'/>
                        <FeatureCard class='icon_clock_alt'title='SERVICE ANYTIME' subtitle='No matter when does user come to your site, user can always get the service from the guide.'/>
                        <FeatureCard class='icon_compass_alt' title='BEST EXPERIENCE' subtitle='User will experience the best way to explore your website.'/>
                    </Section>
                    <Section style={wheelStyle}>
                      <Wheel/>
                    </Section>
                </div>
    } 
}
