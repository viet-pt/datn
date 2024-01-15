import React from 'react';

const Profile = () => {
  const user = {};


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

      </div>
    </div >
  );
}

export default React.memo(Profile);
