import React, { Component } from 'react';

class ButtonSwitch extends Component {
  state = {
    switch1: true,
  }
  handleSwitchChange = nr => () => {
    let switchNumber = `switch${nr}`;
    this.setState({
      [switchNumber]: !this.state[switchNumber]
    });
  }

  render() {
    return (
      <div className='custom-control custom-switch'>
        <input
          type='checkbox'
          className='custom-control-input'
          id='customSwitches'
          checked={this.state.switch1}
          onChange={this.handleSwitchChange(1)}
          readOnly
        />
        <label className='custom-control-label' htmlFor='customSwitches'>
          
        </label>
      </div>
    );
  }
}

export default ButtonSwitch;