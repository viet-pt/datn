import { Table } from 'antd';
import { UserService } from 'api/UserService';
import React, { useMemo } from 'react';

const Account = () => {
  // const [currentAcc, setCurrentAcc] = useState('');
  // const [openModalDelete, setOpenModalDelete] = useState(false);

  const { data: accountList } = UserService.useGetAccount({ params: {} });

  const columnsRole = useMemo(() => (
    [
      {
        title: 'STT',
        dataIndex: 'index',
        key: 'index',
        render: (value, record, index) => index + 1
      },
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id'
      },
      {
        title: 'Email',
        dataIndex: 'username',
        key: 'username'
      },
      {
        title: 'Tên',
        dataIndex: 'first_name',
        key: 'first_name'
      },
      // {
      //   title: 'Google ID',
      //   dataIndex: 'google_id',
      //   key: 'google_id'
      // },
      // {
      //   title: 'Create at',
      //   dataIndex: 'create_at',
      //   key: 'create_at'
      // },
      // {
      //   title: 'Action',
      //   key: 'action',
      //   width: '10%',
      //   render: (row) =>
      //     <div className='flex space-x-3 items-center'>
      //       <Button type="primary" danger icon={<DeleteOutlined />} onClick={() => onDelete(row)}>Xóa</Button>
      //     </div>
      // },
    ]
  ), [])

  // const onDelete = (data) => {
  //   setCurrentAcc(data);
  //   setOpenModalDelete(true);
  // }

  // const confirmDelete = () => {
  //   const data = { cateId: currentAcc.id };
  //   UserService.deleteAccount(data, res => {
  //     if (res.success) {
  //       refetchAccountList();
  //       Notification.success('Xóa tài khoản thành công!');
  //       setOpenModalDelete(false);
  //     } else {
  //       Notification.error(res.message);
  //     }
  //   })
  // }

  return (
    <div>
      <div className='flex justify-between mb-10'>
        <h1 className='text-xl medium text-prime-blue mr-2'>Danh sách tài khoản</h1>
      </div>

      <Table
        columns={columnsRole}
        dataSource={accountList}
        rowKey="index"
      />

      {/* <KCSModal
        isOpenModal={openModalDelete}
        closeModal={() => setOpenModalDelete(false)}
        confirmButton="Xóa"
        closeButton
        content={<div className='text-center'>Bạn chắc chắn muốn xóa tài khoản <span className='bold'>{currentAcc.email}</span> ?</div>}
        confirmAction={confirmDelete}
      /> */}
    </div>
  )
}

export default React.memo(Account);
