import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const styles = {
    card: {
        width: '30%',
        display: 'flex',
        justifyContent: 'flex-start',
    },
    title: {
        lineHeight:'300%',
        fontSize: '18px',
        fontWeight: 'bold',
    },
    toggle: {
        padding:'10% 0px',
        margin:'0',
    }
}
export default class FeatureCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
    this.handleExpandChange = this.handleExpandChange.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleExpand = this.handleExpand.bind(this);
    this.handleReduce = this.handleReduce.bind(this);
  }

  handleExpandChange(expanded) {
    this.setState({expanded: expanded});
  };

  handleToggle(event, toggle) {
    this.setState({expanded: toggle});
  };

  handleExpand() {
    this.setState({expanded: true});
  };

  handleReduce() {
    this.setState({expanded: false});
  };

  render() {
    return (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <Card 
        style={styles.card}
        expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
        <CardHeader
            style={styles.cardHeader}
            titleStyle={styles.title}
            title={this.props.title}
            subtitle={this.props.subtitle}
            actAsExpander={true}
            showExpandableButton={false}
        >
        <Toggle
            style={styles.toggle}
            toggled={this.state.expanded}
            onToggle={this.handleToggle}
          />

        </CardHeader>
        <CardText expandable={true}>
            So this is cool. 
        </CardText>
      </Card>
    </MuiThemeProvider>
    );
  }
}
