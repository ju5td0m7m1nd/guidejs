import React from 'react'
import Section from './section.jsx' 
import MainView from './MainView.jsx'
import FeatureCard from './FeatureCard.jsx'
export default class Container extends React.Component {
    constructor(props) {
        super(props);        
    }
    render () {
        return  <div style={{height:'100%', width:'100%'}}>
                    <Section justify='center' height='100%' width='100%'>
                        <MainView/>
                    </Section>
                    <Section justify='space-around' height='50%' width='100%'>
                        <FeatureCard title='CUSTOMIZED' subtitle='Train your own guide.'/>
                        <FeatureCard title='EVERYTHING AWAKE' subtitle='Every component have the chance to show up themselves.'/>
                        <FeatureCard title='BEST EXPERIENCE' subtitle='User will know the best way to explore your website.'/>
                    </Section>
                </div>
    } 
}
