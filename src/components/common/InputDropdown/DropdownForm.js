import { Form, Select } from 'antd';
import cn from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import './style.scss';

const { Option } = Select;

const DropdownForm = ({ placeholder, title, list, customClass, isRequired, handleChange,
  disabled, isOneLine, ...props }) => {

  let rules = [];
  if (isRequired) {
    rules = [
      {
        required: true,
        message: 'Field is required',
      },
      ...rules,
    ]
  }

  return (
    <div className={cn({ 'flex items-center': isOneLine })}>
      {title && <p className='mb-1'>{isRequired && <span className='text-red-500'>*</span>} {title}</p>}
      <Form.Item className={`dropdown-form ${customClass || ''}`} rules={rules} {...props}>
        <Select placeholder={placeholder} onChange={handleChange} disabled={disabled}>
          {list.map((item, index) => (
            <Option value={item.value} key={index}>{item.text}</Option>
          ))}
        </Select>
      </Form.Item>
    </div>
  );
}

DropdownForm.propTypes = {
  list: PropTypes.array,
};

DropdownForm.defaultProps = {
  list: [],
  isRequired: true
};

export default React.memo(DropdownForm);
