import { Button, Modal } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';

const KCSModal = ({ isOpenModal, title, content, closeButton, closeModal, confirmButton, confirmAction, size }) => {
  let btn = [
    <Button type="primary" key="ok" onClick={confirmAction || closeModal}>{confirmButton || 'Xác nhận'}</Button>
  ]

  if (closeButton) {
    btn = [<Button key="cancel" onClick={closeModal} className='mr-5'>{closeButton === true ? 'Hủy' : closeButton}</Button>, ...btn];
  }

  return (
    <Modal
      className="modal-wrapper"
      title={title || 'Thông báo'}
      open={isOpenModal}
      onCancel={closeModal}
      footer={btn}
      width={size === "xl" ? 1150 : size === "lg" ? 800 : 520}
    >
      {content}
    </Modal>
  );
};

KCSModal.propTypes = {
  title: PropTypes.string,
  isOpenModal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  confirmButton: PropTypes.string,
  confirmAction: PropTypes.func,
};

KCSModal.defaultProps = {
  isOpenModal: false,
  closeModal: () => { },
};

export default React.memo(KCSModal);
