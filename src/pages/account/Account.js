import React, { useEffect, useMemo, useState } from 'react';
import { Table } from 'antd';

const Account = () => {
  const [accountList, setAccountList] = useState([]);

  useEffect(() => {
    setAccountList([]);
  }, [])

  const columnsRole = useMemo(() => (
    [
      {
        title: 'STT',
        dataIndex: 'index',
      },
      {
        title: 'Tên',
        dataIndex: 'name',
      },
      {
        title: 'Username',
        dataIndex: 'username',
      },
      {
        title: 'Email',
        dataIndex: 'email',
      },
      {
        title: 'Phone',
        dataIndex: 'phone',
      },
      {
        title: 'Trạng thái',
        dataIndex: 'statusTxt',
        key: '6',
      },
    ]
  ), [])

  return (
    <div>
      <div className='flex justify-between'>
        <div className='flex mb-8'>
          <h1 className='text-xl medium text-prime-blue mb-0 mr-2'>Danh sách tài khoản</h1>
        </div>
      </div>

      <Table
        columns={columnsRole}
        dataSource={accountList}
      />
    </div>
  )
}

export default React.memo(Account);
