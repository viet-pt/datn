import React from 'react';
import { Breadcrumb as BreadcrumbAnt } from 'antd';
import { Link } from 'routers';
import { faCaretRight } from '@fortawesome/fontawesome-free-solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Breadcrumb = ({ list }) => {
  const newList = [...list];
  const lastItem = list[list.length - 1];
  newList.splice(-1);

  return (
    <div className="text-base mt-4">
      <BreadcrumbAnt style={{ margin: '16px 0', color: '#4d4d4d' }} separator={<FontAwesomeIcon icon={faCaretRight} color="#4D4D4D" />}>
        <BreadcrumbAnt.Item className="bold">
          <Link route="/"><a>Trang chủ</a></Link>
        </BreadcrumbAnt.Item>

        {newList.map((item, index) => (
          <BreadcrumbAnt.Item key={index}>
            <Link route={item.url}><a title={item.text}>{item.text}</a></Link>
          </BreadcrumbAnt.Item>
        ))}

        <BreadcrumbAnt.Item className="bold text-blue-zalo">{lastItem.text}</BreadcrumbAnt.Item>
      </BreadcrumbAnt>
    </div>
  )
}

export default React.memo(Breadcrumb);