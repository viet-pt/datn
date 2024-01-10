import React from 'react';
import { DatePicker as DatePickerAnt } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';

const DatePicker = ({ value, title, name, placeholder, customClass, handleOnChange, ...props }) => {
  const onChange = (date, dateString) => {
    const time = date?.format('YYYY-MM-DD hh:mm:ss') || '';
    handleOnChange(time, name);
  }

  return (
    <div className={`w-full ${customClass || ''}`}>
      {title && <div className="">{title}</div>}
      <DatePickerAnt
        onChange={onChange}
        format="DD/MM/YYYY"
        placeholder={placeholder}
        defaultValue={value ? moment(value, 'YYYY-MM-DD') : ''}
        {...props}
      />
    </div>
  );
}

DatePicker.propTypes = {
  title: PropTypes.string,
};

export default React.memo(DatePicker);
