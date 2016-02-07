import React from 'react';
import About from './Screens/About';
import Article from './Screens/Article';
const Screens = app.reactUtils.screen.Screens;

export default class extends React.Component{
  constructor(props){
    super(props);
    this.displayName = 'List of Screens';

    this.state = {
      screens: [
        /* about */
        {},
        /* articles */
        {},{},{},{},{},
      ],
    };
  }

  componentDidMount(){
    // gist url : https://api.github.com/gists/db7cd19103e03abb5fb1
    // tutorial : https://facebook.github.io/react/tips/initial-ajax.html
  }

  render() {
    return (
      <Screens selectedScreen={2}>
        {
          this.state.screens.map((content, index)=>{
            return (
              <If condition={index === 0}>
                <About key={index}/>
              <Else/>
                <Article key={index}/>
              </If>
            );
          })
        }
      </Screens>
    );
  }
}
