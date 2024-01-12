import { Modal } from 'antd';
import React from 'react';

const NewsDemo = ({ data, visible, closeModal }) => {
  return (
    <Modal
      className="modal-wrapper"
      title='Xem trước'
      open={visible}
      onCancel={closeModal}
      footer={null}
      width={1200}
    >
      <div className='p-5 mb-10 text-base'>
        <h3 className='text-center text-gray-400 uppercase mb-4'>{data.category}</h3>
        <h1 className='text-center bold text-5xl mb-6'>{data.title}</h1>
        <p className='text-center prime-black medium'>{data.description}</p>
        <div className="" dangerouslySetInnerHTML={{ __html: data.content }}></div>
      </div>
    </Modal >
  );
}

export default React.memo(NewsDemo);
