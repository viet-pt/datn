import { Checkbox, Radio } from 'antd';
import cn from 'classnames';
import { IconCate, IconChecked } from 'components/common/Icons';
import { TITLE_ANS } from 'constants/constants';
import React from 'react';

const QuizView = ({ data, index, isMulti }) => {
  const answerList = () => (
    <div className='quiz-detail'>
      {data.answer.map((item, i) => (
        <div className='ml-6 py-1.5 relative' key={i}>
          {data.correctAnswer.length > 1 ?
            <Checkbox value={TITLE_ANS[i]} disabled>{item.label}</Checkbox> :
            <Radio value={TITLE_ANS[i]} disabled>{item.label}</Radio>
          }
          <div className='absolute top-2 -left-5'>
            {data.correctAnswer?.includes(TITLE_ANS[i]) ? <IconChecked className="text-green-500 w-3" /> : null}
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <div className={cn('mb-5 border-2 border-primary-orange px-6 pt-10 pb-2 relative rounded-md')}>
      <div className='border-b-2 border-r-2 rounded-br-md border-primary-orange absolute top-0 left-0 px-2 py-1 flex-center'>
        <IconCate className="text-primary-orange w-4 mr-2" />
        <span className='font-semibold text-xs text-primary-orange italic capitalize'>{data.cateName || 'General'}</span>
      </div>
      <div className='medium mb-3 flex items-start'>
        {isMulti &&
          <span className='mr-1 whitespace-nowrap'>Câu {index + 1}. </span>
        }
        <span className='flex-grow-0'>{data.question}</span>
      </div>

      {data.correctAnswer.length > 1 ?
        <Checkbox.Group value={data.correctAnswer}>
          {answerList()}
        </Checkbox.Group> :
        <Radio.Group value={data.correctAnswer[0]}>
          {answerList()}
        </Radio.Group>
      }
    </div >
  );
}

export default React.memo(QuizView);
