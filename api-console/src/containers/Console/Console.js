import React, {Component} from 'react';
import {connect} from "react-redux";
import {Redirect} from 'react-router-dom'
import SweetAlert from 'react-bootstrap-sweetalert';
import classes from './Console.module.css'

import Header from "../../components/Console/Header/Header";
import History from "../../components/Console/History/History";
import Actions from "../../components/Console/Actions/Actions";
import InputOutput from "../../components/Console/InputOutput/InputOutput";
import {fetchHistory} from "../../store/actions/console";
import {deleteCancel, deleteConfirm} from "../../store/actions/request";

class Console extends Component {
  renderConfirmDeletePopup = () => {
    return (
      this.props.confirmDeleteShow
        ? <SweetAlert
          danger
          showCancel
          confirmBtnText="Yes, delete it!"
          confirmBtnBsStyle="danger"
          title="Are you sure?"
          onConfirm={this.props.confirmDelete}
          onCancel={this.props.cancelDelete}
          focusCancelBtn
        >
          You will not be able to recover this imaginary file!
        </SweetAlert>
        : null
    )
  }

  componentDidMount() {
    this.props.fetchHistory()
  }

  render() {
    // Return to auth after logout
    if (this.props.login.trim() === '' || this.props.isAuthExpired) {
      return <Redirect to={'/'}/>
    }

    return (
      <div className={classes.Console}>
        {this.renderConfirmDeletePopup()}

        <Header/>
        <History/>
        <InputOutput/>
        <Actions/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    login: state.auth.login,
    isAuthExpired: state.auth.isAuthExpired,
    history: state.console.history,
    deletingRequestId: state.console.deletingRequestId,
    confirmDeleteShow: state.console.confirmDeleteShow
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchHistory: () => dispatch(fetchHistory()),
    confirmDelete: () => dispatch(deleteConfirm()),
    cancelDelete: () => dispatch(deleteCancel())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Console);
