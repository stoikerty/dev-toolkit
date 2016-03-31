import React from 'react';
import cx from 'classnames';
import s from './component.scss';

export default class Component extends React.Component{
  constructor(props){
    super(props);
    this.displayName = 'Component';
    this.toggleText = this.toggleText.bind(this);

    this.state = {
      textEnabled: true,
    };
  }

  toggleText(){
    this.setState({ textEnabled : !this.state.textEnabled });
  }

  render() {
    return (
      <div className={s.exampleComponent} onClick={this.toggleText}>
        { 'Styled Example Component' }

        <If condition={this.state.textEnabled}>
          <div className={s.text}>
            { 'click to test <If/> condition' }
          </div>
        <Else/>
          <div className={cx(s.text, s.isHidden)}>
            { 'woohooo!' }
          </div>
        </If>
      </div>
    );
  }
}
