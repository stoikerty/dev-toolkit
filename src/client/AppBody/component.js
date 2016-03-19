import React from 'react';
import s from './component.scss';

export default class Component extends React.Component{
  constructor(props){
    super(props);
    this.displayName = 'Component';

    this.state = {};
  }

  render() {
    return (
      <div className={s.ExampleComponent}>
        Component
      </div>
    );
  }
}
