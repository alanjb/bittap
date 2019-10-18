import React from 'react';
import Menu_Button from '../../assets/menu_button.svg';

class MenuButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        const {toggleNavPanel} = this.props;
        
        return (
            <React.Fragment>
                <img 
                    src={Menu_Button} 
                    className="menu_button" 
                    onClick={toggleNavPanel} 
                    alt="menu_button" 
                    title="menu_button"
                />
            </React.Fragment> 
        );
    }

};

export default MenuButton;