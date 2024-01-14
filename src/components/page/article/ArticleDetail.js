import { Form, Modal } from 'antd';
import { DropdownForm, InputForm } from 'components/common';
import React, { useEffect } from 'react';

const ArticleDetail = ({ data, cateList, visible, closeModal }) => {
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
        <div className='w-1/3 mb-3'>
          <DropdownForm
            name='category'
            list={cateList}
            title="Danh mục"
            disabled
          />
        </div>
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
          <img alt={data.title} src={data.thumbnail} className='w-36 h-auto' />
        </div>

        <div className='mt-5'>
          <p className='mb-5'><span className='text-red-500'>*</span> Content:</p>
          <div dangerouslySetInnerHTML={{ __html: data.content }}></div>
        </div>
      </Form>
    </Modal>
  )
}

export default React.memo(ArticleDetail);
