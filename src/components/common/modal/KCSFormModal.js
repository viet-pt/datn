import React from 'react';
import { Modal, Button, Form } from 'antd';

const KCSFormModal = ({ isOpenModal, title, content, closeButton, closeModal, confirmButton, confirmAction,
  size, initialValues }) => {

  return (
    <Modal
      className="modal-wrapper"
      title={title || 'Thông báo'}
      open={isOpenModal}
      onCancel={closeModal}
      footer={null}
      width={size === "xl" ? 1150 : size === "lg" ? 800 : 520}
    >
      <Form onFinish={confirmAction} initialValues={initialValues}>
        <div>{content}</div>
        <div className="flex justify-center space-x-4 mt-6">
          <Button key="cancel" onClick={closeModal}>{closeButton || 'Hủy'}</Button>
          <Form.Item>
            <Button key="ok" type="primary" htmlType="submit">{confirmButton || 'Xác nhận'}</Button>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default React.memo(KCSFormModal);
