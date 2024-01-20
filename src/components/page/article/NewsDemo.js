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
      <div className='bg-gray-100 py-5 px-8 mb-5 text-base w-3/4 mx-auto'>
        <h3 className='text-gray-500 uppercase mb-4 text-center text-lg'>{data.cateName}</h3>
        <h1 className='text-center bold text-5xl mb-6'>{data.title}</h1>
        <p className='text-center prime-black text-lg medium'>{data.description}</p>
        <div className="content" dangerouslySetInnerHTML={{ __html: data.content }}></div>
      </div>
    </Modal >
  );
}

export default React.memo(NewsDemo);
