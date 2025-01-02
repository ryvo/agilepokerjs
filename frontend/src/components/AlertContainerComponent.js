import './AlertContainerComponent.css';
import React from 'react';
import AlertComponent from './AlertComponent';

export default function AlertContainerComponent() {
  return (
    <div id="alert-container" className="collapse alert-container">
      <AlertComponent alertType="info" message="Jaj, chybička :-("></AlertComponent>
      <AlertComponent alertType="success" message="Jaj, chybička :-("></AlertComponent>
      <AlertComponent alertType="warning" message="Jaj, chybička :-( Jaj, chybička :-( Jaj, chybička :-( Jaj, chybička :-( Jaj, chybička :-( Jaj, chybička :-( Jaj, chybička :-( Jaj, chybička :-( Jaj, chybička :-( Jaj, chybička :-( Jaj, chybička :-( Jaj, chybička :-( Jaj, chybička :-( "></AlertComponent>
      <AlertComponent alertType="error" message="Jaj, chybička :-("></AlertComponent>
    </div>
  );
}