import React from 'react';
import s from './component.scss';
// if (typeof window !== 'undefined') require('./component.scss');

export default class Component extends React.Component{
  constructor(props){
    super(props);
    this.displayName = 'Component';

    this.state = {};
  }

  render() {
    return (
      <div className="component">
        Component
      </div>
    );
  }
}
