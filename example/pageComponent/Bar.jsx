import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar'
const styles = {
    bar: {
        height:'initial',
        position:'fixed',
    },
}
const Bar = () => 
        <MuiThemeProvider muiTheme={getMuiTheme()}>
            <AppBar style={styles.bar} title="GuideJs" showMenuIconButton={false}/>
        </MuiThemeProvider>
export default Bar;
