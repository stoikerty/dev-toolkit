import React from 'react';
import Markdown from 'react-markdown';
import HeaderContent from './Article/HeaderContent';
const { Screen, Header, Content, Footer } = app.reactUtils.screen;

export default class extends React.Component{
  constructor(props){
    super(props);
    this.displayName = 'Article';

    this.state = {
      header: {
        image: { src: '', alt: '' },
        title: 'header_title',
      },
      content: '',
      metaData: {},
    };
  }

  componentDidMount(){
    setTimeout(()=>{
      // after content is fetched,
      // The markdown source is separated into 2 sections
      if (app.articles && app.articles[0].content) {
        const source = app.articles[0].content;
        const metaData = app.articles[0].metaData;
        const lines = source.split('\n');

        // 1. extract header
        const header = lines.splice(0,2);

        // get the first and second lines
        const firstLine = header[0];
        const secondLine = header[1];

        // extract url from markdown image
        const image_url = metaData.root_url + '/' + firstLine.match(/!\[.*?\]\((.*?)\)/)[1];

        // extract the header title
        const header_title = secondLine.match(/(#+)\s(.*)/)[2];

        // 2. extract content
        const content = lines.splice(2,lines.length).join('\n');

        this.setState({
          header: {
            image: { src: image_url, alt: '' },
            title: header_title,
          },
          content: content,
          metaData: metaData,
        });
      }
    }, 1500);
  }

  render() {
    return (
      <Screen className="article">
        <Header>
          { 'Article Screen' }
          <If condition={this.state.header}>
            <HeaderContent
              title={this.state.header.title}
              image={this.state.header.image}
            />
          </If>
        </Header>
        <Content>
          <If condition={this.state.content}>
            <Markdown className="content" source={this.state.content}/>
          </If>
        </Content>
        <Footer>

        </Footer>
      </Screen>
    );
  }
}
