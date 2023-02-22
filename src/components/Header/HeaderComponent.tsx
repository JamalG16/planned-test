import React from "react";
import PlannedLogo from "../../assets/logo.svg";
import './HeaderComponent.css';

export const HeaderComponent = () => {

  return (
    <div className="wrapper">
      <img src={PlannedLogo} alt="Planned Logo"/>
      <h3 className="header">Planned Test</h3>
    </div>
  )
}
