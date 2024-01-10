import React, { useEffect } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import { DropdownForm } from 'components/common';
import { AGENCIES, PROVINCES } from 'constants/constants';

const EditModal = ({ data, visible, closeModal, confirmAction }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(data);
  }, [data, form]);

  const getAgencyList = (province) => {
    console.log('province', province);
  }

  const onValuesChange = (data, values) => {
    const keyNames = Object.keys(data);
    const value = data[keyNames];

    if (keyNames[0] === 'province') {
      form.setFieldsValue({ agency: '' });
      getAgencyList(value);
    }
  }

  return (
    <Modal
      className="modal-wrapper"
      title='Chỉnh sửa'
      open={visible}
      onCancel={closeModal}
      footer={null}
      width={800}
    >
      <Form onFinish={confirmAction} form={form} onValuesChange={onValuesChange}>
        <div>
          <p>Mã đơn hàng: <span className='medium'>{data.code}</span></p>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <p className='mb-1'>Họ tên:</p>
              <Form.Item name='name'>
                <Input
                  placeholder="Nhập họ tên"
                  className='h-11 w-full rounded'
                />
              </Form.Item>
            </div>

            <div>
              <p className='mb-1'>SDT:</p>
              <Form.Item name='phone'>
                <Input
                  placeholder="Nhập SDT"
                  className='h-11 w-full rounded'
                  type='number'
                />
              </Form.Item>
            </div>

            <div>
              <p className='mb-1'>CCCD:</p>
              <Form.Item name='cccd'>
                <Input
                  placeholder="Nhập CCCD"
                  className='h-11 w-full rounded'
                  type='number'
                />
              </Form.Item>
            </div>

            <div>
              <p className='mb-1'>Email:</p>
              <Form.Item name='email'>
                <Input
                  placeholder="Nhập email"
                  className='h-11 w-full rounded'
                />
              </Form.Item>
            </div>

            <DropdownForm
              name='province'
              list={PROVINCES}
              title="Tỉnh thành"
            />
            <DropdownForm
              name='agency'
              list={AGENCIES}
              title="Đại lý"
            />
          </div>
        </div>

        <div className="flex justify-center space-x-4 mt-6">
          <Button key="cancel" onClick={closeModal}>Hủy</Button>
          <Form.Item>
            <Button key="ok" type="primary" htmlType="submit">Xác nhận</Button>
          </Form.Item>
        </div>
      </Form>
    </Modal>

  )
}

export default React.memo(EditModal);
