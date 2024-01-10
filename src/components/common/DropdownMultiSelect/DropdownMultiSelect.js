import React from 'react';
import './style.scss';
import { Form, Select, Tag } from 'antd';

const { Option } = Select;

const tagRender = (props) => {
  const { label, closable, onClose } = props;

  const onPreventMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <Tag
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      className='bg-gray-200 text-black mr-2'
    >
      {label}
    </Tag>
  );
};

const DropdownMultiSelect = ({ list, disabled, placeholder, customClass, isRequired, handleChange, ...props }) => {
  let rules = [];
  if (isRequired) {
    rules = [
      {
        required: true,
        message: 'Required field cannot be left blank',
      },
      ...rules,
    ]
  }

  return (
    <Form.Item className="multi-select" rules={rules} {...props}>
      <Select
        mode="multiple"
        showArrow
        tagRender={tagRender}
        className={customClass}
        disabled={disabled}
        placeholder={placeholder}
      >
        {list.map((item, index) => (
          <Option value={item.value} key={index}>{item.text}</Option>
        ))}
      </Select>
    </Form.Item>
  );
}

export default React.memo(DropdownMultiSelect);