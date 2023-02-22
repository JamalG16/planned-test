import React from "react";
import './Input.css';

export const Input = (props: {
  value?: any;
  icon: React.ReactNode;
  placeholder?: string | undefined;
  onChange: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined; type: string | undefined; }) => {

  return(
    <div className="wrapper">
      <label className="placeholder">{props.icon} </label>
      <input className="input" placeholder={props.placeholder} onChange={props.onChange} type={props.type} value={props.value}/>
    </div>
  )
}
