import React from 'react';
const { Screen, Header, Content, Footer } = app.reactUtils.screen;

export default class extends React.Component{
  constructor(props){
    super(props);
    this.displayName = 'About';

    this.state = {};
  }

  render() {
    return (
      <Screen className="about">
        <Header>
          { 'About Screen' }
        </Header>
        <Content>

        </Content>
        <Footer>

        </Footer>
      </Screen>
    );
  }
}
