import { UploadOutlined } from '@ant-design/icons';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Button, Form, Modal, Upload } from 'antd';
import { DropdownForm, InputForm, Notification } from 'components/common';
import { STATUS_QUIZ } from 'constants/constants';
import React, { useEffect, useRef, useState } from 'react';
import NewsDemo from './NewsDemo';

const EditArticle = ({ data, cateList, visible, closeModal, confirmAction }) => {
  const [openPreviewModal, setOpenPreviewModal] = useState(false);
  const [newsData, setNewsData] = useState('');
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
    return e?.file;
  };

  const handleSubmit = (values) => {
    const content = editor.current.getData();
    if (!content) {
      Notification.warning('Content is required!');
      return;
    }
    const body = {
      ...data,
      ...values,
      content,
    }
    confirmAction(body);
  }

  const onPreview = () => {
    let data = {
      ...form.getFieldsValue(),
      content: editor.current.getData()
    }
    setNewsData(data);
    setOpenPreviewModal(true);
  }

  return (
    <Modal
      className="modal-wrapper"
      title='Chỉnh sửa'
      open={visible}
      onCancel={closeModal}
      footer={null}
      width={1500}
    >
      <Form onFinish={handleSubmit} form={form}>
        <div className='flex-between mb-3'>
          <div className='w-1/3'>
            <DropdownForm
              name='cateId'
              list={cateList}
              title="Danh mục"
            />
          </div>
          <div className='w-1/3 ml-5'>
            <DropdownForm
              name='status'
              list={STATUS_QUIZ}
              title="Trạng thái"
            />
          </div>
          <Button type="primary" className='bg-prime-orange border-none py-4 px-8 ml-auto' onClick={onPreview}>Xem trước</Button>
        </div>


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
            name="thumbnail"
            label="Image"
            rules={[{
              required: true,
              message: 'Field is required'
            }]}
            getValueFromEvent={handleFile}
          >
            <Upload name="files" beforeUpload={() => false} maxCount={1}
              listType="picture" defaultFileList={[{ url: data.thumbnail }]}
              onRemove={removeFile}>
              <Button icon={<UploadOutlined />} className="rounded-md">Upload image</Button>
            </Upload>
          </Form.Item>
        </div>

        <div className='mt-5 mb-16'>
          <p className='mb-2'><span className='text-red-500'>*</span> Content</p>
          <div id="editorEdit"></div>
        </div>

        <div className="flex justify-center space-x-4 mt-6 absolute bottom-0 left-0 rounded-b-lg py-4 w-full bg-white shadow-md z-1000">
          <Button key="cancel" onClick={closeModal}>Hủy</Button>
          <Form.Item>
            <Button key="ok" type="primary" htmlType="submit">Xác nhận</Button>
          </Form.Item>
        </div>
      </Form>

      {openPreviewModal &&
        <NewsDemo
          data={newsData}
          visible={openPreviewModal}
          closeModal={() => setOpenPreviewModal(false)}
        />
      }
    </Modal>

  )
}

export default React.memo(EditArticle);
