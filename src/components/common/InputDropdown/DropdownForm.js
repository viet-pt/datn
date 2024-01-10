import React from 'react';
import './style.scss';
import { Form, Select } from 'antd';
import PropTypes from 'prop-types';

const { Option } = Select;

const DropdownForm = ({ placeholder, title, list, customClass, isRequired, handleChange, disabled, ...props }) => {

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
    <div>
      {title && <p className='mb-1'>{title}:</p>}
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
};

export default React.memo(DropdownForm);
