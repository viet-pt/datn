import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

function useOutsideAlerter(ref, onClickOutSide) {
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      onClickOutSide();
    }
  }
}

function OutsideClick({ children, onClickOutSide }) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, onClickOutSide);

  return <div className="h-100" ref={wrapperRef}>{children}</div>;
}

OutsideClick.propTypes = {
  children: PropTypes.element.isRequired,
};

export default React.memo(OutsideClick);