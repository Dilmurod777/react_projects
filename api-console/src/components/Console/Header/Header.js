import React, {Component} from 'react';
import {connect} from "react-redux";
import classes from './Header.module.css'

import Logo from "../../Logo/Logo";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignOutAlt, faExpand, faCompress} from "@fortawesome/free-solid-svg-icons";
import {logout} from "../../../store/actions/auth";

class Header extends Component {
  state = {
    icon: 0,
    icons: [faExpand, faCompress]
  }

  expandView = () => {
    const elem = document.documentElement;

    if (this.state.icon === 0) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) { /* Firefox */
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) { /* IE/Edge */
        elem.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) { /* Firefox */
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { /* IE/Edge */
        document.msExitFullscreen();
      }
    }

    const icon = this.state.icon === 0 ? 1 : 0
    this.setState({
      icon,
    })
  }

  render() {
    return (
      <div className={classes.Header}>
        <div className={classes.HeaderLeft}>
          <Logo/>
          <h1>API-консолька</h1>
        </div>

        <div className={classes.HeaderRight}>
          <div className={classes.Profile}>
            <p>{this.props.login}</p>
            {
              !!this.props.sublogin
                ? <React.Fragment>
                  :
                  <p>{this.props.sublogin}</p>
                </React.Fragment>
                : null
            }
          </div>

          <div className={classes.Logout} onClick={this.props.logout}>
            <p>Выйти</p>
            <FontAwesomeIcon icon={faSignOutAlt}/>
          </div>

          <div className={classes.ExpandIcon}>
            <FontAwesomeIcon icon={this.state.icons[this.state.icon]} onClick={this.expandView}/>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    login: state.auth.login,
    sublogin: state.auth.sublogin
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
