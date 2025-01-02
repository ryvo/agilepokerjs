import './AlertComponent.css';
import { Alert, Toast } from 'react-bootstrap';
import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function AlertComponent({alertType, message}) {
  const alertTypeInfoList = {
    info: {
      title: 'Info',
      variant: 'info',
      class: 'alert-primary',
      icon: 'info-circle',
    },
    success: {
      title: 'Success',
      variant: 'success',
      class: 'alert-success',
      icon: 'check-circle',
    },
    warning: {
      title: 'Warning',
      variant: 'warning',
      class: 'alert-warning',
      icon: 'exclamation-circle',
    },
    error: {
      title: 'Danger',
      variant: 'danger',
      class: 'alert-danger',
      icon: 'x-circle',
    },
  }

  const getTitle = () => {
    return alertTypeInfoList[alertType]?.title || '';
  }

  const getVariant = () => {
    return alertTypeInfoList[alertType]?.variant || '';
  }

  const getClass = () => {
    return alertTypeInfoList[alertType]?.class || '';
  }

  const getIcon = () => {
    return alertTypeInfoList[alertType]?.icon || '';
  }

  return (
    <Alert variant={getVariant()} dismissible className={'fade'}>
      <i className={`bi bi-${getIcon(alertType)}`} style={{'font-size':'1.5rem'}}></i>
      <span>{message}</span>
    </Alert>
    /*
        <div className={`alert ${getClass(alertType)}`} role="alert">
          <i className={`bi bi-${getIcon(alertType)}`}></i>
          <span>{message}</span>
          <button type="button" className="btn-close" aria-label="Close" data-dismiss="toast"></button>
        </div>
    */
/*  <Toast
    className="d-inline-block m-1"
    bg={getVariant().toLowerCase()}
  >
      <Toast.Header>
        <i className={`bi bi-${getIcon()}`}></i>
        <strong className="me-auto">{getTitle()}</strong>
        <small>11 mins ago</small>
      </Toast.Header>
      <Toast.Body className={'text-white'}>{message}</Toast.Body>
    </Toast>*/
  );
}