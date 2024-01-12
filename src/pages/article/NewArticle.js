import { UploadOutlined } from '@ant-design/icons';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Button, Form, Upload } from 'antd';
import { DropdownForm, InputForm, KCSModal, Notification } from 'components/common';
import MyCustomUploadAdapterPlugin from 'components/common/UploadAdapter/UploadAdapter';
import NewsDemo from 'components/page/article/NewsDemo';
import { FAKE_CATE } from 'constants/constants';
import { ROUTES } from 'global/routes';
import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';

const NewArticle = () => {
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [openPreviewModal, setOpenPreviewModal] = useState(false);
  const [newsData, setNewsData] = useState('');
  const [cateList, setCateList] = useState([]);
  const editor = useRef();
  const history = useHistory();
  const [form] = Form.useForm();

  useEffect(() => {
    const cates = FAKE_CATE.map(item => ({ value: item.cateCode, text: item.cateName }));
    setCateList(cates);
    ClassicEditor.create(document.querySelector('#editorCreate'), {
      extraPlugins: [MyCustomUploadAdapterPlugin],
    })
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

  const onPreview = () => {
    let data = {
      ...form.getFieldsValue(),
      content: editor.current.getData()
    }
    setNewsData(data);
    setOpenPreviewModal(true);
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
        <div className='flex mb-4'>
          <Form.Item
            name="img"
            label="Image"
            rules={[{
              required: true,
              message: 'Field is required'
            }]}
            getValueFromEvent={handleFile}
          >
            <Upload beforeUpload={() => false} listType="picture" onRemove={removeFile} maxCount={1}>
              <Button icon={<UploadOutlined />} className="rounded-md">Upload image</Button>
            </Upload>
          </Form.Item>
        </div>

        <div className='flex-between'>
          <div className='w-1/4'>
            <DropdownForm
              name='category'
              list={cateList}
              title="Danh mục"
            />
          </div>
          <Button type="primary" className='bg-prime-orange border-none py-4 px-8' onClick={onPreview}>Xem trước</Button>
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

      {openPreviewModal &&
        <NewsDemo
          data={newsData}
          visible={openPreviewModal}
          closeModal={() => setOpenPreviewModal(false)}
        />
      }

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
