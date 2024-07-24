import React from 'react';

interface Props extends React.PropsWithChildren {
  showModal: boolean;
  title: string;
  onClose: (status: boolean) => void;
}

const Modal: React.FC<Props> = ({showModal, title, onClose , children}) => {
  return (
    <>
      <div className="modal-backdrop show" style={{ display: showModal ? 'block' : 'none' }}/>
      <div className="modal show" style={{ display: showModal ? 'block' : 'none' }} onClick={() => onClose(false)}>
        <div className="modal-dialog" onClick={(event) => event.stopPropagation()}>
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">{title}</h1>
            </div>
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;