import React from 'react';
import BittapLogo from '../assets/BittapLogo';
import MenuButton from '../assets/MenuButton';
import {Button} from 'reactstrap';
import SignInModal from './SignInModal';
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
    isSignInModalOpen: false,
    isNavPanelOpen: false
    // items: menuItemsArray
  };

  toggle() {
    let screenWidth = window.screen.width;
    let innerWidth = window.innerWidth;
    console.log('clicked');
    if(screenWidth<maxScreenWidthForNavPanel || innerWidth<maxScreenWidthForNavPanel ){
      this.setState((prevState) => {
        return {
          isNavPanelOpen: !prevState.isNavPanelOpen
        }
      });
    }
  }

  toggleSignIn = () => {
    this.setState((prevState) => {
      return {
        isSignInModalOpen: !prevState.isSignInModalOpen
      }
    });
    console.log('State:' + this.state.isSignInModalOpen);
  }

  render(){
    const { isSignInModalOpen } = this.state;
    const { items } = this.state;
    return(
      <React.Fragment>
      <div className="Navbar-Component">
        <div className="top-gradient"></div>
          <div> <BittapLogo/> </div>
          <div className="nav-buttons"> 
            <Button outline="false" onClick={() => this.toggleSignIn()}>Sign in</Button>
            <MenuButton toggleNavPanel={() => this.toggle()}/> 
          </div>
      </div>  
        <SignInModal isOpen={isSignInModalOpen}/>
      </React.Fragment>
    );
  }
}

export default Navbar;