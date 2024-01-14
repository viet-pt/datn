import { faTimes } from '@fortawesome/fontawesome-free-solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Form, Input, Modal, Select } from 'antd';
import { DropdownForm } from 'components/common';
import { TITLE_ANS } from 'constants/constants';
import React, { useEffect, useState } from 'react';
const { Option } = Select;

const QuizEdit = ({ data, cateList, visible, closeModal, confirmAction }) => {
  const [numbAns, setNumberAns] = useState(4);
  const [form] = Form.useForm();

  useEffect(() => {
    if (data.answer) {
      setNumberAns(data?.answer.length);
    }
    form.setFieldsValue(data);
  }, [data, form]);

  const handleAddAnswer = (add, answer) => {
    add({ label: `Tùy chọn ${answer.length + 1}` });
    const count = numbAns + 1;
    setNumberAns(count);
  }

  const handleRemoveAnswer = (remove, name) => {
    remove(name);
    const count = numbAns - 1;
    setNumberAns(count);

    let { correctAnswer } = form.getFieldsValue();
    if (correctAnswer) {
      correctAnswer = getAnsArray(correctAnswer, count);
      form.setFieldsValue({ correctAnswer });
    }
  }

  const getAnsArray = (correctAnswer, count) => {
    const arr = TITLE_ANS.filter((item, index) => index < count);
    const newAnsArr = correctAnswer.filter(item => arr.includes(item));
    return newAnsArr;
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
      <Form onFinish={confirmAction} form={form}>
        <div className='text-base medium p-5'>
          <div className='flex space-x-3 mb-4'>
            <Form.Item
              name={"question"}
              rules={[{ required: true, message: 'Field is required' }]}
              className='w-full'
            >
              <Input placeholder="Nhập câu hỏi" className='input-text' />
            </Form.Item>

            <DropdownForm
              name={"category"}
              isRequired
              placeholder="Thể loại"
              customClass='quiz'
              list={cateList}
            />
          </div>

          <Form.List name={"answer"} initialValue={[
            { label: "Tùy chọn 1" },
            { label: "Tùy chọn 2" },
            { label: "Tùy chọn 3" },
            { label: "Tùy chọn 4" },
          ]}>
            {(answer, { add, remove }) => {
              return (
                <div className='ml-6'>
                  {answer.map((item, i) => (
                    <div key={item.key} className='flex mb-4'>
                      <span>{TITLE_ANS[i]}. </span>
                      <Form.Item
                        name={[i, "label"]}
                        rules={[{ required: true, message: 'Field is required' }]}
                        className='w-full ml-2'
                      >
                        <Input placeholder="Nhập câu trả lời" className='input-text' />
                      </Form.Item>

                      {answer.length > 2 &&
                        <FontAwesomeIcon
                          color='#959595' icon={faTimes}
                          className='ml-3 pointer hover-scale'
                          onClick={() => handleRemoveAnswer(remove, item.name)} />
                      }
                    </div>
                  ))}
                  {answer.length < 5 &&
                    <div className='text-gray-400'>
                      <span>{TITLE_ANS[answer.length]}. </span>
                      <span className='underline pointer ml-3' onClick={() => handleAddAnswer(add, answer)}>Thêm tùy chọn</span></div>
                  }
                </div>
              );
            }}
          </Form.List>

          <div className='flex space-x-3 mt-5 ml-6'>
            <span>Đáp án: </span>
            <Form.Item
              name='correctAnswer' className='w-1/3 rounded-md'
              rules={[{ required: true, message: 'Field is required' }]}
            >
              <Select mode="multiple" placeholder="Chọn đáp án" className='rounded-md' showSearch={false}>
                {Array.from(Array(numbAns)).map((item, i) => (
                  <Option value={TITLE_ANS[i]} key={i}>{TITLE_ANS[i]}</Option>
                ))}
              </Select>
            </Form.Item>
          </div>
        </div>

        <div className="flex justify-center space-x-4 mt-6">
          <Button key="cancel" onClick={closeModal}>Hủy</Button>
          <Form.Item>
            <Button key="ok" type="primary" htmlType="submit">Xác nhận</Button>
          </Form.Item>
        </div>
      </Form>
    </Modal >
  );
}

export default React.memo(QuizEdit);
