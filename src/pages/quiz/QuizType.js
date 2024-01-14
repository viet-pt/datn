import { DeleteOutlined, SolutionOutlined } from '@ant-design/icons';
import { Button, Table } from 'antd';
import { QuizService } from 'api/QuizService';
import { KCSFormModal, KCSModal, Notification } from 'components/common';
import TypeDetail from 'components/page/quiz/TypeDetail';
import React, { useMemo, useState } from 'react';
import { convertTime } from 'utils/Utils';

const QuizType = () => {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [currentCate, setCurrentCate] = useState('');

  const { data: cateList, refetch: refetchCate } = QuizService.useGetCategory({ params: {} });

  const columnsCate = useMemo(() => (
    [
      {
        title: 'STT',
        dataIndex: 'index',
        key: 'index',
        render: (value, record, index) => index + 1
      },
      {
        title: 'Tên loại',
        dataIndex: 'cateName',
        key: 'cateName',
      },
      {
        title: 'Mô tả',
        dataIndex: 'description',
        key: 'description',
      },
      {
        title: 'Ngày tạo',
        dataIndex: 'createTime',
        key: 'createTime',
        render: (value) => convertTime(value)
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
    const data = { cateId: currentCate.cateId };
    QuizService.deleteCategory(data, res => {
      if (res.success) {
        refetchCate();
        Notification.success('Xóa thể loại thành công!');
        setOpenModalDelete(false);
      } else {
        Notification.error(res.message);
      }
    })
  }

  const onCreateEditCate = (values) => {
    if (!values.description) {
      values.description = '';
    }
    if (currentCate) {
      const data = {
        cateId: currentCate.cateId,
        ...values
      }
      QuizService.updateCategory(data, res => {
        if (res.success) {
          setOpenCreateModal(false);
          refetchCate();
          Notification.success('Update thể loại thành công!');
        } else {
          Notification.error(res.message);
        }
      })
    } else {
      QuizService.createCategory(values, res => {
        if (res.success) {
          setOpenCreateModal(false);
          refetchCate();
          Notification.success('Thêm thể loại thành công!');
        } else {
          Notification.error(res.message);
        }
      })
    }
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
          confirmAction={onCreateEditCate}
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
        content={<div className='text-center'>Bạn chắc chắn muốn xóa thể loại <span className='bold'>{currentCate.cateName}</span> ?</div>}
        confirmAction={confirmDeleteCate}
      />
    </div>
  );
}

export default React.memo(QuizType);
