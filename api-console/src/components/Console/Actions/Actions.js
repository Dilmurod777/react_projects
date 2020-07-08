import React from 'react';
import {connect} from "react-redux";
import classes from './Actions.module.css'

import Button from "../../Button/Button";
import GithubLink from "../../GithubLink/GithubLink";
import ButtonFormat from "../../ButtonFormat/ButtonFormat";
import {sendRequest} from "../../../store/actions/console";

const Actions = (props) => {
  return (
    <div className={classes.Actions}>
      <Button
        title='Отправить'
        isValid={props.inputData.isValidJson}
        isTouched={props.inputData.isTouched}
        loading={props.isLoading}
        onClick={props.onRequestSend}
      />

      <GithubLink link={props.githubLink} margin={false}/>

      <ButtonFormat/>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    inputData: state.console.inputData,
    outputData: state.console.outputData,
    isLoading: state.console.isLoading,
    githubLink: state.auth.githubLink
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onRequestSend: () => dispatch(sendRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Actions);
