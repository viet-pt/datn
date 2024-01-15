import { faTimes } from '@fortawesome/fontawesome-free-solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Form, Input, Select } from 'antd';
import { DropdownForm } from 'components/common';
import { TITLE_ANS } from 'constants/constants';
import React, { useState } from 'react';
const { Option } = Select;

const MAX_ANS = 6;

const QuizItem = ({ fields, form, index, onDelete, typeList }) => {
  const [numbAns, setNumberAns] = useState(4);

  const handleAddAnswer = (add, answer) => {
    add({ label: `Tùy chọn ${answer.length + 1}` });
    const count = numbAns + 1;
    setNumberAns(count);
  }

  const handleRemoveAnswer = (remove, name) => {
    remove(name);
    const count = numbAns - 1;
    setNumberAns(count);

    const { data } = form.getFieldsValue();
    const { correctAnswer } = data[index];
    if (correctAnswer) {
      data[index].correctAnswer = getAnsArray(correctAnswer, count);
      form.setFieldsValue({ data });
    }
  }

  const getAnsArray = (correctAnswer, count) => {
    const arr = TITLE_ANS.filter((item, index) => index < count);
    const newAnsArr = correctAnswer.filter(item => arr.includes(item));
    return newAnsArr;
  }

  return (
    <>
      <div className='flex space-x-3'>
        <span>{index + 1}. </span>
        <Form.Item
          name={[index, "question"]}
          initialValue={`Câu hỏi ${index + 1}`}
          rules={[{ required: true, message: 'Field is required' }]}
          className='w-full'
        >
          <Input placeholder="Nhập câu hỏi" className='input-text' onFocus={e => e.target.select()} />
        </Form.Item>

        <DropdownForm
          name={[index, "cateId"]}
          isRequired
          placeholder="Thể loại"
          customClass='quiz'
          list={typeList}
        />

        {/* <DropdownForm
          name={[index, "type"]}
          isRequired
          list={TYPE_ANS}
        /> */}

        <Button className={fields.length === 1 ? 'text-gray-400 border-gray-300' : 'text-red-500 border-red-500'}
          onClick={onDelete} disabled={fields.length === 1}>
          Xóa</Button>
      </div>

      <Form.List name={[index, "answer"]} initialValue={[
        { label: "Tùy chọn 1" },
        { label: "Tùy chọn 2" },
        { label: "Tùy chọn 3" },
        { label: "Tùy chọn 4" },
      ]}>
        {(answer, { add, remove }) => {
          return (
            <div className='ml-6'>
              {answer.map((item, i) => (
                <div key={item.key} className='flex -mb-1'>
                  <span>{TITLE_ANS[i]}. </span>
                  <Form.Item
                    name={[i, "label"]}
                    rules={[{ required: true, message: 'Field is required' }]}
                    className='w-full ml-2'
                  >
                    <Input placeholder="Nhập câu trả lời" className='input-text' onFocus={e => e.target.select()} />
                  </Form.Item>

                  {answer.length > 2 &&
                    <FontAwesomeIcon
                      color='#959595' icon={faTimes}
                      className='ml-3 pointer hover-scale'
                      onClick={() => handleRemoveAnswer(remove, item.name)} />
                  }
                </div>
              ))}
              {answer.length < MAX_ANS &&
                <div className='text-gray-400'>
                  <span>{TITLE_ANS[answer.length]}. </span>
                  <span className='underline pointer ml-3' onClick={() => handleAddAnswer(add, answer)}>Thêm tùy chọn</span></div>
              }
            </div>
          );
        }}
      </Form.List>

      <div className='flex space-x-3 mt-5'>
        <span>Đáp án: </span>
        <Form.Item
          name={[index, 'correctAnswer']} className='w-1/3 rounded-md'
          rules={[{ required: true, message: 'Field is required' }]}
        >
          <Select mode="multiple" placeholder="Chọn đáp án" className='rounded-md' showSearch={false}>
            {Array.from(Array(numbAns)).map((item, i) => (
              <Option value={TITLE_ANS[i]} key={i}>{TITLE_ANS[i]}</Option>
            ))}
          </Select>
        </Form.Item>
      </div>
    </>
  )
}

export default React.memo(QuizItem);
