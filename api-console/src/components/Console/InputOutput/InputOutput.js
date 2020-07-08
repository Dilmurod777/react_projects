import React, {Component} from 'react';
import classes from './InputOutput.module.css'
import {connect} from "react-redux";
import {updateInputData} from "../../../store/actions/console";

class InputOutput extends Component {
  onDragHandler = (event) => {
    event.preventDefault()

    const inputBlock = this.inputRef.current
    const outputBlock = this.outputRef.current
    const inputWidth = inputBlock.clientWidth
    const outputWidth = outputBlock.clientWidth

    if (inputWidth < 640) {
      inputBlock.style.overflowX = 'scroll'
      inputBlock.style.overflowY = 'unset'
    } else {
      inputBlock.style.overflow = 'unset'
    }

    if (outputWidth < 640) {
      outputBlock.style.overflowX = 'scroll'
      outputBlock.style.overflowY = 'unset'
    } else {
      outputBlock.style.overflow = 'unset'
    }

    if (event.pageX > 0) {
      inputBlock.style.width = (event.pageX - 15) + 'px'
      outputBlock.style.width = (outputBlock.parentNode.clientWidth - event.pageX - 10 - 15) + 'px'

      localStorage.setItem('inputOverflowX', inputBlock.style.overflowX.toString())
      localStorage.setItem('outputOverflowX', outputBlock.style.overflowX.toString())
      localStorage.setItem('inputWidth', inputBlock.style.width.toString())
      localStorage.setItem('outputWidth', outputBlock.style.width.toString())
    }
  }

  constructor(props) {
    super(props);

    this.inputRef = React.createRef()
    this.outputRef = React.createRef()
  }

  componentDidMount() {
    const inputWidth = localStorage.getItem('inputWidth') || "49%"
    const outputWidth = localStorage.getItem('outputWidth') || "49%"
    const inputOverflowX = localStorage.getItem('inputOverflowX') || "unset"
    const outputOverflowX = localStorage.getItem('outputOverflowX') || "unset"

    this.inputRef.current.style.width = inputWidth
    this.outputRef.current.style.width = outputWidth
    this.inputRef.current.style.overflowX = inputOverflowX
    this.outputRef.current.style.overflowX = outputOverflowX
  }

  render() {
    let inputClassList = [classes.Input_Output_block]
    let outputClassList = [classes.Input_Output_block]

    if (!this.props.inputData.isValidJson && this.props.inputData.isTouched) {
      inputClassList.push(classes.error)
    }

    if (!this.props.outputData.isValidJson) {
      outputClassList.push(classes.error)
    }

    return (
      <div className={classes.Input_Output}>
        <div
          className={inputClassList.join(' ')}
          ref={this.inputRef}
        >
          <p className={classes.Input_Output_block_title}>Запрос:</p>
          <div className={classes.Input_Output_content}>
            <textarea
              placeholder='Введите запрос...'
              onChange={(event) => this.props.updateInputData(event.target.value)}
              value={this.props.inputData.json}
            />
          </div>
        </div>

        <div
          className={classes.ThreeDotsWrapper}
          draggable
          onDrag={this.onDragHandler}
        >
          <div className={classes.ThreeDots}/>
        </div>

        <div
          className={outputClassList.join(' ')}
          ref={this.outputRef}
        >
          <p className={classes.Input_Output_block_title}>Ответ:</p>
          <div className={classes.Input_Output_content}>
            <textarea
              value={this.props.outputData.json}
              disabled={true}
            />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    inputData: state.console.inputData,
    outputData: state.console.outputData
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateInputData: (value) => dispatch(updateInputData(value))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InputOutput);
