import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import cui from '../cui/cui';
const { TextArea: TextAreaAnt } = Input;

const TextArea = ({ title, handleOnChange, onEnter, extensionClass,
  errorMsg, customClass, customTitle, autoSize, minRows, maxRows, rows, ...rest }) => {
  const onChange = (e) => {
    const { value } = e.target;
    handleOnChange(value);
  }

  const handleOnKeyDown = (e) => {
    if (e.keyCode === 13) {
      onEnter();
    }
  }

  return (
    <>
      <div className={`w-full ${customClass || ''}`}>
        {title && <span className={`text-black mb-3 ${customTitle || ''}`}>{title}</span>}
        <TextAreaAnt
          {...rest}
          rows={rows}
          autoSize={autoSize ? { minRows, maxRows } : false}
          className={extensionClass}
          onChange={onChange}
          onKeyDown={handleOnKeyDown}
          className='w-full leading-5 px-5 py-4 text-black rounded-lg outline-none bg-white border border-solid border-gray-500'
        />
      </div>
      {!cui.isUndefinedOrNull(errorMsg) &&
        <div className="err-msg">{errorMsg}</div>
      }
    </>
  );
}

TextArea.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  row: PropTypes.number,
  autoSize: PropTypes.bool,
  minRows: PropTypes.number,
  maxRows: PropTypes.number,
  handleOnChange: PropTypes.func,
  onEnter: PropTypes.func
};

TextArea.defaultProps = {
  value: '',
  rows: 3,
  minRows: 3,
  maxRows: 5,
  autoSize: true,
  autoFocus: false,
  handleOnChange: () => { },
  onEnter: () => { }
};

export default React.memo(TextArea);
