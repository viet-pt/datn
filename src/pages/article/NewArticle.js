import { UploadOutlined } from '@ant-design/icons';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Button, Form, Upload } from 'antd';
import { InputForm, KCSModal, Notification } from 'components/common';
import { ROUTES } from 'global/routes';
import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';

const NewArticle = () => {
  const [openConfirmModal, setOpenConfirmModal] = useState();
  const editor = useRef();
  const history = useHistory();
  const [form] = Form.useForm();

  useEffect(() => {
    ClassicEditor.create(document.querySelector('#editorCreate'))
      .then(newEditor => {
        newEditor.ui.view.editable.element.style.height = '300px';
        editor.current = newEditor;
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleSubmit = (values) => {
    const content = editor.current.getData();
    if (!content) {
      Notification.warning('Content is required!');
      return;
    }
    const data = {
      ...values,
      content
    }
    console.log(1111, data);
    history.push(ROUTES.ARTICLE_MANAGEMENT);
  };

  const handleFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const handleBack = () => {
    setOpenConfirmModal(false);
    history.push(ROUTES.ARTICLE_MANAGEMENT);
  }

  const onCancel = () => {
    setOpenConfirmModal(true);
  }

  const removeFile = () => {
    form.setFieldsValue({ img: '' });
  }

  return (
    <div>
      <h1 className='text-xl medium text-prime-blue mb-0 mr-2'>Thêm tin tức</h1>
      <Form name="basic" className="mt-4" onFinish={handleSubmit} form={form}>
        <div className='flex justify-end space-x-6'>
          <Button type="link" className='bg-gray-200 text-black py-4 px-8' onClick={onCancel}>Cancel</Button>
          <Button type="primary" htmlType='submit' className='bg-green-500 py-4 px-8'>Submit</Button>
        </div>
        <div className='mb-4 flex'>
          <Form.Item
            name="img"
            label="Image"
            rules={[{
              required: true,
              message: 'Required field cannot be left blank'
            }]}
            getValueFromEvent={handleFile}
          >
            <Upload beforeUpload={() => false} listType="picture" onRemove={removeFile} maxCount={1}>
              <Button icon={<UploadOutlined />} className="rounded-md">Upload image</Button>
            </Upload>
          </Form.Item>
        </div>
        <div className='grid grid-cols-2 gap-5'>
          <InputForm
            isRequired
            name="title"
            title="Title"
            maxLength={200}
          />
          <InputForm
            isRequired
            name="description"
            title="Description"
          />
        </div>
        <p className='mb-2'><span className='text-red-500'>*</span> Content</p>
        <div id="editorCreate"></div>
      </Form>

      <KCSModal
        isOpenModal={openConfirmModal}
        closeModal={() => setOpenConfirmModal(false)}
        closeButton='Bỏ qua'
        confirmButton='Chấp nhận'
        content='Nội dung đã thay đổi sẽ không được lưu. Bạn có chắc chắn muốn kết thúc hoạt động này?'
        confirmAction={handleBack}
      />
    </div>
  );
}

export default React.memo(NewArticle);
