import { InputForm } from 'components/common';
import React from 'react';

const TypeDetail = () => {

  return (
    <div>
      <InputForm
        name="cateName" isRequired
        placeholder="Nhập tên thể loại"
      />
      <InputForm
        name="description"
        placeholder="Mô tả" customClass='mt-3'
      />
    </div>
  );
}

export default React.memo(TypeDetail);
