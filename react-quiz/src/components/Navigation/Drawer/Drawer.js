import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import classes from './Drawer.module.css';

import Backdrop from "../../UI/Backdrop/Backdrop";

class Drawer extends Component {
  clickHandler = () => {
    this.props.onClose()
  }

  renderLinks(links) {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <NavLink
            to={link.to}
            exact={link.exact}
            activeClassName={classes.active}
            onClick={this.clickHandler}
          >
            {link.label}
          </NavLink>
        </li>
      )
    })
  }

  render() {
    const classList = [classes.Drawer]

    if (!this.props.isOpen) {
      classList.push(classes.close)
    }

    const links = [
      {to: '/', label: 'List', exact: true},
    ]

    if (this.props.isAuthenticated) {
      links.push({to: '/quiz-creator', label: 'Create quiz', exact: false})
      links.push({to: '/logout', label: 'Logout', exact: false})
    } else {
      links.push({to: '/auth', label: 'Authorization', exact: false})
    }

    return (
      <React.Fragment>
        <nav className={classList.join(' ')}>
          <ul>
            {this.renderLinks(links)}
          </ul>
        </nav>
        {this.props.isOpen ? <Backdrop onClick={this.props.onClose}/> : null}
      </React.Fragment>
    )
  }
}

export default Drawer
