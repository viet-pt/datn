import cn from 'classnames';
import { TITLE_ANS } from 'constants/constants';
import React from 'react';

const QuizDetail = ({ data, index }) => {
  return (
    <div className={cn('mb-5', { 'mb-4 pb-4 border-b': index })}>
      <p>Thể loại: <span className='medium'>{data.category}</span></p>
      <p className='medium'>
        {index && <span>{index}. </span>}
        {data.question}
      </p>
      <div className='ml-6'>
        {data.answer.map((item, i) => (
          <p className={cn({ 'medium text-red-500': data.correctAnswer.includes(TITLE_ANS[i]) })}>
            <span>{TITLE_ANS[i]}. </span>
            <span className='ml-1'>{item.label}</span>
          </p>
        ))}

      </div>
    </div>
  );
}

export default React.memo(QuizDetail);
