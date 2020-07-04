import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Redirect, Route,NavLink} from 'react-router-dom';
//import { ToastContainer, toast } from "react-toastify";
//import 'react-toastify/dist/ReactToastify.css';

import { connect } from 'react-redux';
import Clinic from './components/clinic';







const mapStateToProps = (state) => {
  return {
   
    globalloading: state.loading
  }
}
const mapDispachToProps = (dispach) => {
  return {
    login: (enteredusername) =>  dispach({ type: "login", username: enteredusername }),
    logout: () => dispach({ type: 'logout' })
  }
}

class App extends Component {
  
  state = { tab: "Clinic" }
  lastpath="";
  selectedtab="";
  
  
  logout = () => {
   
  }
  
  render() {
    return (
      <>
        
        <Router>
        <div className="main_page">
        <div className="side_menu">
          <div className="main_icon">
          </div>

          <NavLink className="menu_button" to ="/">Dashboard</NavLink>
          <NavLink className="menu_button" to ="/">Patients</NavLink>
          <NavLink className="menu_button" to ="/">Calender</NavLink>
          <NavLink className="menu_button isActiveSidemenu" to ="/">Clinic</NavLink>
          <NavLink className="menu_button" to ="/">Messages</NavLink>
          <NavLink className="menu_button" to ="/">My Account</NavLink>
          <NavLink className="menu_button" to ="/">Logout</NavLink>


        </div>
        <div className="pages">
        <Route path="/" exact strict render={
              () => {
                //return this.props.globallogin ? (<Redirect to={`/home/${this.props.globalusername}`} />) :
                return  <Clinic></Clinic>
              }
            } />
        </div>
      </div>
      </Router>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispachToProps)(App);
