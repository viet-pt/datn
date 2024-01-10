import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'antd';

const InputCheckbox = ({ value, name, title, handleOnChange,  extensionClass, customClass, disabled }) => {
  const onChange = (e) => {
    const { checked } = e.target;
    handleOnChange(checked, name);
  }

  return (
    <div className={`flex items-center ${customClass || ''}`}>
      <Checkbox
        className={extensionClass || ''}
        checked={value}
        onChange={onChange}
        disabled={disabled}
      />
      <div className="text-black ml-3" dangerouslySetInnerHTML={{ __html: title }} />
    </div>
  );
}

InputCheckbox.propTypes = {
  value: PropTypes.bool,
  handleOnChange: PropTypes.func
};

InputCheckbox.defaultProps = {
  value: false,
  handleOnChange: () => {}
};

export default React.memo(InputCheckbox);
