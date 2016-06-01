import React from 'react'
import Section from './section.jsx' 
import MainView from './MainView.jsx'
import FeatureCard from './FeatureCard.jsx'
export default class Container extends React.Component {
    constructor(props) {
        super(props);        
    }
    render () {
        const mainStyle = {
          height:'100%',
          width:'100%',
          justifyContent: 'center',
          background:'#EEE',
        }
        const featureStyle = {
          justifyContent:'space-around',
          alignItems: 'flex-start',
          paddingTop: '10%',
          height:'80%',
          width:'100%',
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
                </div>
    } 
}
