import React, { useState } from 'react';
import { InputForm, KCSFormModal, Notification, DropdownForm } from 'components/common';
import { Button } from 'antd';
import { UserService } from 'api/UserService';
import { Queries } from 'api/queries';
import { useMutation } from 'react-query';

const UserDetail = ({ groupList }) => {
  return (
    <div>
      <InputForm
        name="username" disabled
        placeholder="Username..."
      />
      <InputForm
        name="name" isRequired
        placeholder="Tên..." customClass='mt-3'
      />
      <InputForm
        name="email" isRequired
        isEmail placeholder="Email..." customClass='mt-3'
      />
      <InputForm
        name="phone" isRequired isPhoneNumber
        placeholder="Phone..." customClass='mt-3'
      />
      <DropdownForm
        name='groupId' disabled
        list={groupList} customClass='mt-3' placeholder="Chọn nhóm"
      />
    </div>
  )
}

const Profile = () => {
  const [openModalChangePass, setOpenModalChangePass] = useState(false);
  const [openModalUpdateInfo, setOpenModalUpdateInfo] = useState(false);

  const { data: user1, refetch } = Queries.useGetUserInfo({});
  // const { data: groupList } = Queries.useGetUserInfo({});
  console.log(user1);

  const user = {};
  const groupList = [];

  const { mutate: mutateChangePass } = useMutation(UserService.personalChangPass, {
    onSuccess: (res) => {
      if (res.errorCode === 0) {
        Notification.success('Thay đổi mật khẩu thành công!')
        setOpenModalChangePass(false);
      } else if (res.errorCode === 4002) {
        Notification.error('Mật khẩu hiện tại không đúng!')
      } else {
        Notification.error(res.message);
      }
    },
    onError: (err) => {
      Notification.error(err.message);
    },
  });

  const onChangePass = (values) => {
    if (values.password !== values.rePassword) {
      Notification.error('Mật khẩu không khớp, vui lòng nhập lại!');
      return;
    }
    delete values.rePassword;
    mutateChangePass(values);
  }

  const onUpdate = (values) => {
    UserService.personalUpdate(values, res => {
      if (res.errorCode === 0) {
        Notification.success('Update thông tin cá nhân thành công!')
        setOpenModalUpdateInfo(false);
        refetch();
      } else {
        Notification.error(res.message);
      }
    })
  }

  return (
    <div className="shadow p-5 w-2/5 mx-auto mt-8 rounded-lg">
      <h1 className="text-center text-xl bold mb-5">Thông tin cá nhân</h1>
      <div className="text-sm">
        <p className="text-gray-400 mb-0">Username</p>
        <p className="font-semibold mb-3">{user.username}</p>

        <p className="text-gray-400 mb-0">Tên</p>
        <p className="font-semibold mb-3">{user.name}</p>

        <p className="text-gray-400 mb-0">Email</p>
        <p className="font-semibold mb-3">{user.email}</p>

        <p className="text-gray-400 mb-0">Phone</p>
        <p className="font-semibold mb-3">{user.phone}</p>

        <p className="text-gray-400 mb-0">Nhóm</p>
        <p className="font-semibold">{groupList?.find(item => item.id === user?.groupId)?.name}</p>

        <div className='mt-5 flex-center space-x-8'>
          <Button type="primary" ghost onClick={() => setOpenModalChangePass(true)}>Đổi mật khẩu</Button>
          <Button type="primary" onClick={() => setOpenModalUpdateInfo(true)}>Cập nhật</Button>
        </div>
      </div>

      {openModalUpdateInfo &&
        <KCSFormModal
          isOpenModal={openModalUpdateInfo}
          title="Update thông tin"
          closeModal={() => setOpenModalUpdateInfo(false)}
          confirmAction={onUpdate}
          confirmButton={'Lưu'}
          initialValues={user}
          content={<UserDetail groupList={groupList} />}
        />
      }

      {openModalChangePass &&
        <KCSFormModal
          isOpenModal={openModalChangePass}
          title="Đổi mật khẩu"
          closeModal={() => setOpenModalChangePass(false)}
          confirmAction={onChangePass}
          confirmButton="Lưu"
          content={
            <div>
              <InputForm
                name="current_password" isRequired
                placeholder="Mật khẩu hiện tại..."
              />
              <InputForm
                name="password" isRequired
                customClass='mt-3'
                placeholder="Mật khẩu mới..."
                rules={[{
                  pattern: /^[a-zA-Z0-9@._]{8,15}$/,
                  message: "Mật khẩu 8 - 15 ký tự",
                }]}
              />
              <InputForm
                name="rePassword" isRequired
                placeholder="Nhập lại mật khẩu mới..."
                customClass='mt-3'
                rules={[{
                  pattern: /^[a-zA-Z0-9@._]{8,15}$/,
                  message: "Mật khẩu 8 - 15 ký tự",
                }]}
              />
            </div>
          }
        />
      }
    </div >
  );
}

export default React.memo(Profile);
