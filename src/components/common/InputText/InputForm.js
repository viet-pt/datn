import { faEye, faEyeSlash } from '@fortawesome/fontawesome-free-solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Input } from 'antd';
import { CommonService } from 'api/CommonService';
import cn from 'classnames';
import React, { useState } from 'react';
import './style.scss';

const InputForm = ({ title, placeholder, customInput, customClass, name, isRequired, isPhoneNumber, onlyNumber,
  textRequire, isEmail, isPassword, rules, isOneLine, maxLength, ...props }) => {

  let convertedRules = [...rules];
  const [visible, setVisible] = useState(true);
  if (isRequired) {
    convertedRules = [
      {
        required: true,
        message: textRequire || 'Field is required',
      },
      ...convertedRules,
    ]
  }
  if (maxLength) {
    convertedRules = [
      {
        max: maxLength,
        message: "Value should be less than 50 character",
      },
      ...convertedRules,
    ]
  }
  if (isPhoneNumber) {
    convertedRules = [
      {
        pattern: CommonService.REGEX_PHONE_NUMBER,
        message: 'Phone number is not in the correct format',
      },
      ...convertedRules,
    ]
  }

  if (isEmail) {
    convertedRules = [
      {
        pattern: CommonService.REGEX_EMAIL,
        message: 'Email invalidate',
      },
      ...convertedRules,
    ]
  }

  return (
    <div className={cn(customClass, { 'flex items-center': isOneLine })}>
      {title && <p className='mb-1'>{isRequired && <span className='text-red-500'>*</span>} {title}</p>}
      <Form.Item className={cn({ 'input-place': placeholder }, 'input-common')}>
        <Form.Item name={name} noStyle rules={convertedRules}>
          <Input
            placeholder="&nbsp;"
            autoComplete="true"
            className={cn('custom-input', customInput)}
            type={(isPassword && visible) ? 'password' : isPhoneNumber || onlyNumber ? 'number' : 'text'}
            {...props}
          />
        </Form.Item>
        {placeholder &&
          <span className="placeholder">{placeholder}</span>
        }
        {isPassword &&
          <div className="absolute inset-y-0 right-4 pr-3 flex items-center text-sm leading-5">
            <FontAwesomeIcon
              icon={visible ? faEye : faEyeSlash}
              className="text-2xl"
              onClick={() => setVisible(!visible)}
            />
          </div>
        }
      </Form.Item>
    </div >

  );
}

InputForm.defaultProps = {
  rules: [],
};

export default React.memo(InputForm);