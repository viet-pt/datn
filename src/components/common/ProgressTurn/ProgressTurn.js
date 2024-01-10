import React, { useEffect } from 'react';
import './style.scss';
import Spin from 'antd/es/spin';
import { useSelector, useDispatch } from 'react-redux';

const ProgressTurn = ({ show }) => {
  const loading = useSelector(state => state.progressReducer.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      if (loading > 0) {
        dispatch({ type: 'RESET_PROGRESS' });
      }
    }, 10000)
  }, [loading, dispatch])

  if (loading <= 0 && !show) {
    return null;
  }

  return (
    <div className="progress-turn">
      <Spin size="large" />
    </div>
  )
}

export default React.memo(ProgressTurn);
