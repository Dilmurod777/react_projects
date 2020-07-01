import React from "react";
import classes from './MenuToggle.module.css'

const MenuToggle = (props) => {
  const classList = [
    classes.MenuToggle
  ]

  if(!props.isOpen){
    classList.push(classes.opened)
  }else{
    classList.push(classes.closed)
  }


  return (
    <div className={classList.join(' ')} onClick={props.onToggle}/>
  )

}

export default MenuToggle
