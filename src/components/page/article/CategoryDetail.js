import { InputForm } from 'components/common';
import React from 'react';

const CategoryDetail = () => {

  return (
    <div>
      <InputForm
        name="cateName" isRequired
        placeholder="Nhập tên danh mục"
      />
      <InputForm
        name="cateCode" isRequired
        placeholder="Nhập mã danh mục" customClass='mt-3'
      />
      <InputForm
        name="description"
        placeholder="Mô tả" customClass='mt-3'
      />
    </div>
  );
}

export default React.memo(CategoryDetail);
