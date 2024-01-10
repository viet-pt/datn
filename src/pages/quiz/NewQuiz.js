import { faPlusCircle } from '@fortawesome/fontawesome-free-solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Form } from 'antd';
import { InputForm, KCSModal } from 'components/common';
import QuizRadio from 'components/page/quiz/QuizRadio';
import { ROUTES } from 'global/routes';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const NewQuiz = () => {
  const [quizList, setQuizList] = useState([]);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const history = useHistory();
  const [form] = Form.useForm();

  useEffect(() => {

  }, []);

  const handleSubmit = (values) => {
    const data = {
      ...values,
    }
    console.log(1111, data);
    // history.push(ROUTES.QUIZ_MANAGEMENT);
  };

  const handleBack = () => {
    setOpenConfirmModal(false);
    history.push(ROUTES.QUIZ_MANAGEMENT);
  }

  const onCancel = () => {
    setOpenConfirmModal(true);
  }

  return (
    <div>
      <h1 className='text-xl medium text-prime-blue mb-0 mr-2'>Thêm Quiz</h1>
      <Form name="basic" className="mt-4" onFinish={handleSubmit} form={form}>
        <div className='flex justify-end space-x-6'>
          <Button type="link" className='bg-gray-200 text-black py-4 px-8' onClick={onCancel}>Cancel</Button>
          <Button type="primary" htmlType='submit' className='bg-green-500 py-4 px-8'>Submit</Button>
        </div>

        <div className='w-1/2 p-3 bg-gray-50 rounded-lg'>
          <InputForm
            isRequired
            name="title"
            title="Tiêu đề"
            placeholder="Nhập tiêu đề"
          />
        </div>

        <div className='w-1/2 p-3 bg-gray-50 rounded-lg mt-6 text-base medium'>
          <p>Danh sách câu hỏi</p>

          <Form.List name="data" initialValue={[
            { question: "Câu hỏi 1" },
          ]}>
            {(fields, { add, remove }) => {
              return (
                <div>
                  {fields.map((field, index) => (
                    <div key={field.key} className='mb-3'>
                      <QuizRadio
                        index={index}
                        fields={fields}
                        onDelete={() => remove(field.name)}
                      />
                    </div>
                  ))}

                  <Form.Item>
                    <Button className='mt-5 text-blue-500 medium text-base'
                      onClick={() => add({ question: `Câu hỏi ${fields.length + 1}` })}>
                      <FontAwesomeIcon icon={faPlusCircle} color="#1890ff" className='mr-2' />
                      <span>Thêm câu hỏi</span>
                    </Button>
                  </Form.Item>
                </div>
              );
            }}
          </Form.List>
        </div>
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

export default React.memo(NewQuiz);
