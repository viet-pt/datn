import { DeleteOutlined, SolutionOutlined } from '@ant-design/icons';
import { Button, Table } from 'antd';
import { KCSFormModal, KCSModal, Notification } from 'components/common';
import TypeDetail from 'components/page/quiz/TypeDetail';
import { FAKE_TYPE } from 'constants/constants';
import React, { useMemo, useState } from 'react';

const cateList = FAKE_TYPE;

const QuizType = () => {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [currentCate, setCurrentCate] = useState('');

  const columnsCate = useMemo(() => (
    [
      {
        title: 'STT',
        dataIndex: 'index',
        key: 'index',
      },
      {
        title: 'Tên loại',
        dataIndex: 'typeName',
        key: 'typeName',
      },
      {
        title: 'Mã loại',
        dataIndex: 'typeCode',
        key: 'typeCode',
      },
      {
        title: 'Mô tả',
        dataIndex: 'description',
        key: 'description',
      },
      {
        title: 'Ngày tạo',
        dataIndex: 'createDate',
        key: 'createDate',
      },
      {
        title: 'Action',
        key: 'action',
        dataIndex: '',
        render: (value) => (
          <div className='flex space-x-3 flex-wrap'>
            <Button type="primary" className='bg-green-500' icon={<SolutionOutlined />}
              onClick={() => editCate(value)}>Sửa</Button>
            <Button type="primary" danger icon={<DeleteOutlined />} onClick={() => onDelete(value)}>Xóa</Button>
          </div>
        )
      }
    ]
  ), [])

  const editCate = (data) => {
    setCurrentCate(data)
    setOpenCreateModal(true);
  }

  const onDelete = (data) => {
    setCurrentCate(data);
    setOpenModalDelete(true);
  }

  const confirmDeleteCate = () => {
    Notification.success('Xóa danh mục thành công!');
    setOpenModalDelete(false);
  }

  const onCreateCate = (values) => {
    setOpenCreateModal(false);
    Notification.success('Thêm câu hỏi thành công!')
    console.log(1111, values);
    // history.push(ROUTES.QUIZ_MANAGEMENT);
  };

  const onOpenCreateModal = () => {
    setCurrentCate('');
    setOpenCreateModal(true);
  }

  return (
    <div>
      <div className='flex-between mb-10'>
        <h1 className='text-xl medium text-prime-blue mb-0 mr-2'>Quản lý thể loại</h1>
        <Button className={`bg-prime-orange h-9 mt-5 rounded border-prime-orange hover-scale`} type='primary'
          onClick={onOpenCreateModal}>
          Thêm mới</Button>
      </div>

      <Table
        columns={columnsCate}
        dataSource={cateList}
        rowKey="index"
      />

      {openCreateModal &&
        <KCSFormModal
          isOpenModal={openCreateModal}
          title={currentCate ? "Sửa thể loại" : "Thêm mới thể loại"}
          confirmButton="Submit"
          closeModal={() => setOpenCreateModal(false)}
          confirmAction={onCreateCate}
          initialValues={currentCate}
          content={
            <TypeDetail />
          }
        />
      }

      <KCSModal
        isOpenModal={openModalDelete}
        closeModal={() => setOpenModalDelete(false)}
        confirmButton="Xóa"
        closeButton
        content={<div className='text-center'>Bạn chắc chắn muốn xóa danh mục <span className='bold'>{currentCate.cateName}</span> ?</div>}
        confirmAction={confirmDeleteCate}
      />
    </div>
  );
}

export default React.memo(QuizType);
