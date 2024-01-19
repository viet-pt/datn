import { UserService } from 'api/UserService';
import React, { useEffect } from 'react';

const Statistical = () => {
  useEffect(() => {

  }, []);

  const { data: statistic } = UserService.useGetStatistic({ params: {} });


  return (
    <div>
      <h1 className='text-xl medium text-prime-blue mb-6 mr-2'>Thống kê</h1>
      <section className='grid grid-cols-3 gap-x-10 gap-y-6 bg-gray-100 p-8 medium text-lg rounded-lg'>
        <div className='shadow-lg p-5 rounded-lg bg-white'>
          {statistic?.user?.total?.toLocaleString('en-GB')} Người dùng
        </div>
        <div className='shadow-lg p-5 rounded-lg bg-white'>
          {statistic?.post?.total?.toLocaleString('en-GB')} Tin tức
        </div>
        <div className='shadow-lg p-5 rounded-lg bg-white'>
          {statistic?.quiz?.questionTotal?.toLocaleString('en-GB')} Câu hỏi
        </div>
      </section>

      <section className='grid grid-cols-3 gap-10 bg-gray-100 p-8 pt-0 text-base'>
        <div className='shadow-lg p-5 rounded-lg bg-white'>
          Người dùng mới: {statistic?.user?.new?.toLocaleString('en-GB')}
        </div>
        <div className='shadow-lg p-5 rounded-lg bg-white'>
          <ul>
            <li>Truy cập: {statistic?.post?.view_total?.toLocaleString('en-GB')}</li>

          </ul>
          <table className='border'>
            <tr className='bg-gray-200 medium'>
              <td className='border px-3 py-1'>Danh mục</td>
              <td className='border px-3 py-1'>Số lượt truy cập</td>
            </tr>
            {statistic?.post?.categories?.map(item => (
              <tr key={item.cateName}>
                <td className='border px-3 py-1'>{item.cateName}</td>
                <td className='border px-3 py-1'>{item.viewTotal}</td>
              </tr>
            ))}

          </table>
        </div>
        <div className='shadow-lg p-5 rounded-lg bg-white text-base'>
          <p className='mb-5'>Tổng số lượt thi: {statistic?.quiz ? (statistic.quiz?.singleQuiz + statistic?.quiz?.multipleQuiz)?.toLocaleString('en-GB') : ''}</p>
          <p className='mb-2'>Ngẫu nhiên: {statistic?.quiz?.singleQuiz?.toLocaleString('en-GB')}</p>
          <p className='mb-2'>Kiểm tra: {statistic?.quiz?.multipleQuiz?.toLocaleString('en-GB')}</p>

        </div>
      </section>


    </div>
  );
}

export default React.memo(Statistical);
