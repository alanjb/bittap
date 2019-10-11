import React from 'react';
import BittapLogo from '../assets/BittapLogo';
import MenuButton from '../assets/MenuButton';
// import PiXIcon from '../../components/assets/PiXIcon';
// import SearchBar from '../layout/SearchBar';
// import NavPanel from '../layout/NavPanel';
// import Menu from '../layout/Menu';
// import Caret from '../assets/Caret';
// import PiXChatIcon from '../../components/assets/PiXChatIcon';

// const { getMenuItems } = require('../../config/ConfigFunctions');
// const menu = getMenuItems();
// const menuItemsArray = menu.menu.items;
const maxScreenWidthForNavPanel = 991;
class Navbar extends React.Component{
  constructor(props){
    super(props);
    this.toggle = this.toggle.bind(this);
  }

  state = {
    isNavPanelOpen: false,
    isFeedbackOpen: false, 
    // items: menuItemsArray
  };

  toggle() {
    let screenWidth = window.screen.width;
    let innerWidth = window.innerWidth;
    if(screenWidth<maxScreenWidthForNavPanel || innerWidth<maxScreenWidthForNavPanel ){
      this.setState((prevState) => {
        return {
          isNavPanelOpen: !prevState.isNavPanelOpen
        }
      });
    }
  }

  render(){
    const { isNavPanelOpen } = this.state;
    const { items } = this.state;
    return(
      // <div className="top-gradient"></div>
      <div className="Navbar-Component">
      <div className="top-gradient"></div>
          <div> <BittapLogo/> </div>
          <div> <MenuButton/> </div>

      </div>
    );
  }
}

export default Navbar;