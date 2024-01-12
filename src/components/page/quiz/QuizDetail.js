import cn from 'classnames';
import { TITLE_ANS } from 'constants/constants';
import React from 'react';

const QuizDetail = ({ data }) => {
  return (
    <div>
      <p>Thể loại: <span className='medium'>{data.category}</span></p>
      <p className='medium'>{data.question}</p>
      <div className='ml-6'>
        {data.answer.map((item, index) => (
          <p className={cn({'medium text-red-500': data.correctAnswer.includes(TITLE_ANS[index])})}>
            <span>{TITLE_ANS[index]}. </span>
            <span className='ml-1'>{item.label}</span>
          </p>
        ))}

      </div>
    </div>
  );
}

export default React.memo(QuizDetail);
