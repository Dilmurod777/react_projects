import React from 'react';
import {connect} from "react-redux";
import classes from './Request.module.css'

import {copyClick, deleteClick, doClick, requestClick, toggleActions} from "../../../../store/actions/request";

function getStatusClassList(request) {
  let statusExtraClass = '';
  let statusClassList = [classes.Request__status];

  if (request.status === 'success') {
    statusExtraClass = classes.Request_status_success;
  } else if (request.status === 'error') {
    statusExtraClass = classes.Request_status_error;
  }

  return statusClassList.concat(statusExtraClass)
}

function getActionsClassList(request) {
  let actionsExtraClass = '';
  let actionsClassList = [classes.Request__actions];

  if (request.showActions) {
    actionsExtraClass = classes.Request__actions_show;
  } else {
    actionsExtraClass = classes.Request__actions_hide;
  }

  return actionsClassList.concat(actionsExtraClass)
}

function getCopyEffectClassList(request) {
  let copyEffectExtraClass = '';
  let copyEffectClassList = [classes.Request__copy_effect];

  if (request.copyCompleted) {
    copyEffectExtraClass = classes.Request__copy_completed;
  } else {
    copyEffectExtraClass = '';
  }

  return copyEffectClassList.concat(copyEffectExtraClass)
}

const Request = (props) => {
  return (
    <div className={classes.Request}>
      <div className={classes.Request__inner_wrapper}>
        <div className={getCopyEffectClassList(props.request).join(' ')}>
          <p>Скопировано</p>
        </div>
      </div>

      <div
        className={classes.Request_details}
        onClick={() => props.requestClick(props.request.id)}
      >
        <div className={getStatusClassList(props.request).join(' ')}/>

        <p className={classes.Request__title}>{props.request.title}</p>
      </div>

      <div
        className={classes.Request__mores}
        onClick={() => props.toggleActions(props.request.id)}
      >
        <div className={classes.Request__more}/>
      </div>

      <div className={getActionsClassList(props.request).join(' ')}>
        <div
          className={[classes.Request__action, classes.Request__action_do].join(' ')}
          onClick={() => props.doClick(props.request.id)}
        >
          <p>Выполнить</p>
        </div>

        <div
          className={[classes.Request__action, classes.Request__action_copy].join(' ')}
          onClick={() => {
            props.copyClick(props.request.id)
            // this.copyCompletedEffect()
          }}
        >
          <p>Скопировать</p>
        </div>

        <div className={classes.Request__actions_separator}/>

        <div
          className={[classes.Request__action, classes.Request__action_delete].join(' ')}
          onClick={() => {
            props.deleteClick(props.request.id)
          }}
        >
          <p>Удалить</p>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    history: state.console.history
  }
}

function mapDispatchToProps(dispatch) {
  return {
    requestClick: (id) => dispatch(requestClick(id)),
    doClick: (id) => dispatch(doClick(id)),
    copyClick: (id) => dispatch(copyClick(id)),
    deleteClick: (id) => dispatch(deleteClick(id)),
    toggleActions: (id) => dispatch(toggleActions(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Request);
