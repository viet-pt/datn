import React, { useEffect, useRef } from 'react';
import { Button, Form, Modal, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { InputForm, Notification } from 'components/common';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const EditArticle = ({ data, visible, closeModal, confirmAction }) => {
  const [form] = Form.useForm();
  const editor = useRef();

  useEffect(() => {
    ClassicEditor.create(document.querySelector('#editorEdit'))
      .then(newEditor => {
        newEditor.ui.view.editable.element.style.height = '350px';
        newEditor.setData(data.content);
        editor.current = newEditor;
      })
      .catch(error => {
        console.error(error);
      });
  }, [data]);

  useEffect(() => {
    form.setFieldsValue(data);
  }, [data, form]);

  const removeFile = () => {
    form.setFieldsValue({ img: '' });
  }

  const handleFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const handleSubmit = (values) => {
    const content = editor.current.getData();
    if (!content) {
      Notification.warning('Content is required!');
      return;
    }
    const data = {
      ...values,
      content,
    }
    confirmAction(data);
  }

  return (
    <Modal
      className="modal-wrapper"
      title='Chỉnh sửa'
      open={visible}
      onCancel={closeModal}
      footer={null}
      width={1400}
    >
      <Form onFinish={handleSubmit} form={form}>
        <InputForm
          isRequired
          name="title"
          title="Title"
          maxLength={200}
        />
        <InputForm
          isRequired
          customClass="mt-3"
          name="description"
          title="Description"
        />
        <div className='mt-5'>
          <Form.Item
            name="img"
            label="Image"
            rules={[{
              required: true,
              message: 'Required field cannot be left blank'
            }]}
            getValueFromEvent={handleFile}
          >
            <Upload name="files" beforeUpload={() => false} maxCount={1}
              listType="picture" defaultFileList={[{ url: data.img }]}
              onRemove={removeFile}>
              <Button icon={<UploadOutlined />} className="rounded-md">Upload image</Button>
            </Upload>
          </Form.Item>
        </div>

        <div className='mt-5 mb-16'>
          <p className='mb-2'><span className='text-red-500'>*</span> Content</p>
          <div id="editorEdit"></div>
        </div>

        <div className="flex justify-center space-x-4 mt-6 absolute bottom-0 left-0 rounded-b-lg py-4 w-full bg-white shadow-md">
          <Button key="cancel" onClick={closeModal}>Hủy</Button>
          <Form.Item>
            <Button key="ok" type="primary" htmlType="submit">Xác nhận</Button>
          </Form.Item>
        </div>
      </Form>
    </Modal>

  )
}

export default React.memo(EditArticle);
