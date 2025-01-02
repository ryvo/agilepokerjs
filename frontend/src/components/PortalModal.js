import ReactDOM from 'react-dom';

export default function PortalModal({children}) {
  const modalRoot = document.getElementById("modal-root");
  return ReactDOM.createPortal(
    <div className="portal-modal">
      <div className="portal-modal-overlay"/>
      <div className="portal-modal-content">{children}</div>
    </div>,
    modalRoot
  )
}