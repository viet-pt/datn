import { InputForm } from 'components/common';
import React from 'react';

const TypeDetail = () => {

  return (
    <div>
      <InputForm
        name="typeName" isRequired
        placeholder="Nhập tên thể loại"
      />
      <InputForm
        name="typeCode" isRequired
        placeholder="Nhập mã thể loại" customClass='mt-3'
      />
      <InputForm
        name="description" isRequired
        placeholder="Mô tả" customClass='mt-3'
      />
    </div>
  );
}

export default React.memo(TypeDetail);
