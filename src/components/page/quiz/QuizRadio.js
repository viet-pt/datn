import { DeleteOutlined } from '@ant-design/icons';
import { faTimes } from '@fortawesome/fontawesome-free-solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Form, Input } from 'antd';
import React from 'react';

const TITLE_ANS = ['A', 'B', 'C', 'D', 'E', 'F'];

const QuizRadio = ({ fields, index, onDelete }) => {

  return (
    <>
      <div className='flex space-x-2'>
        <span>{index + 1}. </span>
        <Form.Item
          name={[index, "question"]}
          initialValue={`Câu hỏi ${index + 1}`}
          rules={[{ required: true, message: 'Field is required' }]}
          className='w-full'
        >
          <Input placeholder="Nhập câu hỏi" className='input-text' />
        </Form.Item>

        {fields.length > 1 &&
          <Button className="text-red-500 border-red-500" onClick={onDelete}
            icon={<DeleteOutlined />}
          >Xóa</Button>
        }
      </div>

      <Form.List name={[index, "answers"]} initialValue={[
        { label: "Tùy chọn 1" },
        { label: "Tùy chọn 2" },
        { label: "Tùy chọn 3" },
        { label: "Tùy chọn 4" },
      ]}>
        {(answers, { add, remove }) => {
          return (
            <div className='ml-5'>
              {answers.map((answer, i) => (
                <div key={answer.key} className='flex -mb-1'>
                  <span>{TITLE_ANS[i]}. </span>
                  <Form.Item
                    name={[i, "label"]}
                    rules={[{ required: true, message: 'Field is required' }]}
                    className='w-full ml-2'
                  >
                    <Input placeholder="Nhập câu trả lời" className='input-text' />
                  </Form.Item>
                  <FontAwesomeIcon
                    color='#959595' icon={faTimes}
                    className='ml-3 pointer hover-scale'
                    onClick={() => remove(answer.name)} />
                </div>
              ))}
            </div>
          );
        }}
      </Form.List>
    </>
  )
}

export default React.memo(QuizRadio);
