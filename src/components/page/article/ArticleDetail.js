import { Form, Modal } from 'antd';
import { InputForm } from 'components/common';
import React, { useEffect } from 'react';

const ArticleDetail = ({ data, visible, closeModal }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(data);
  }, [data, form]);

  return (
    <Modal
      className="modal-wrapper"
      title='Chi tiết'
      open={visible}
      onCancel={closeModal}
      footer={null}
      width={1400}
    >
      <Form form={form}>
        <InputForm
          isRequired disabled
          name="title"
          title="Title"
          maxLength={200}
        />
        <InputForm
          isRequired disabled
          customClass="mt-3"
          name="description"
          title="Description"
        />
        <div className='mt-6 flex space-x-4'>
          <p><span className='text-red-500'>*</span> Image:</p>
          <img alt={data.title} src={data.img} className='w-36 h-auto' />
        </div>

        <div className='mt-5'>
          <p className='mb-5'><span className='text-red-500'>*</span> Content:</p>
          <div className="" dangerouslySetInnerHTML={{ __html: data.content }}></div>
        </div>
      </Form>
    </Modal>
  )
}

export default React.memo(ArticleDetail);
