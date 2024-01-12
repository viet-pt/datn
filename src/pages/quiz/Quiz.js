import { Button, Pagination, Table, Tabs } from 'antd';
import Search from 'antd/lib/input/Search';
import { UserService } from 'api/UserService';
import { Queries } from 'api/queries';
import { KCSModal, Notification } from 'components/common';
import QuizDetail from 'components/page/quiz/QuizDetail';
import QuizEdit from 'components/page/quiz/QuizEdit';
import { FAKE_TYPE, ORDER_LIST } from 'constants/constants';
import { ROUTES } from 'global/routes';
import moment from 'moment';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useMutation } from 'react-query';
import { Link } from 'react-router-dom';

const ACTION_TYPE = {
  SHOW: 'SHOW',
  HIDE: 'HIDE',
  EDIT: 'EDIT',
}

const TAB_LIST = ['Đang hiển thị', 'Đang ẩn'];

const Quiz = () => {
  const [orderList, setOrderList] = useState(ORDER_LIST); //fake
  const [typeList, setTypeList] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [tab, setTab] = useState(0);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [orderSelected, setOrderSelected] = useState('');
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openShowModal, setOpenShowModal] = useState(false);
  const [openHideModal, setOpenHideModal] = useState(false);

  const { data: orderData, refetch: refetchOrder } = Queries.useGetOrder({ params: { page: pageIndex, status: tab, sort: 'createTime,desc' } });

  useEffect(() => {
    if (orderData?.errorCode === 0) {
      setOrderList(orderData.data);
      setTotalPage(orderData.totalItems);
    }
  }, [orderData])

  useEffect(() => {
    getTypeList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getTypeList = () => {
    if (typeList.length) return;
    const types = FAKE_TYPE.map(item => ({ value: item.typeCode, text: item.typeName }));
    setTypeList(types);
  }

  const { mutate: updateStatusOrder } = useMutation(UserService.updateStatusOrder, {
    onSuccess: (res) => {
      if (res?.errorCode === 0) {
        Notification.success('Cập nhật trạng thái thành công!');
        refetchOrder();
      } else {
        Notification.error(res?.message || 'Cập nhật thất bại!');
      }
    },
    onError: (err) => {
      Notification.error(err?.message || 'Cập nhật thất bại!');
    },
  });

  const viewDetailQuiz = useCallback((data) => {
    setOrderSelected(data);
    setOpenDetailModal(true);
  }, [setOrderSelected])

  const changeStatus = useCallback((type, row) => {
    setOrderSelected(row);
    if (type === ACTION_TYPE.SHOW) {
      setOpenShowModal(true);
    } else if (type === ACTION_TYPE.HIDE) {
      setOpenHideModal(true);
    } else {
      setOpenEditModal(true);
    }
  }, [])

  const handleShow = () => {
    updateStatusOrder({
      ...orderSelected,
      status: 1
    });
  }

  const handleHide = () => {
    updateStatusOrder({
      ...orderSelected,
      status: 0
    });
  }

  const columnsTable = useMemo(() => (
    [
      {
        title: 'STT',
        dataIndex: 'index',
        key: 'index',
        width: '3%',
        render: (row) => <span>{pageIndex * 10 + row}</span>,
      },
      {
        title: 'Câu hỏi',
        dataIndex: 'question',
        key: 'question',
        render: (value, row) => <span className='underline pointer text-blue-500 hover:text-green-500'
          onClick={() => viewDetailQuiz(row)}>{value}</span>
      },
      {
        title: 'Thể loại',
        key: 'category',
        dataIndex: 'category',
      },
      {
        title: 'Ngày tạo',
        key: 'createTime',
        dataIndex: 'convertCreateTime',
        sorter: (a, b) => moment(a.convertCreateTime, 'hh:mm DD/MM/YY').unix() - moment(b.convertCreateTime, 'hh:mm DD/MM/YY').unix()
      },
      // {
      //   title: 'Số lượt đã thi',
      //   key: 'numberParticipant',
      //   dataIndex: 'numberParticipant',
      // },
      {
        title: 'Số lượt pass',
        key: 'passNumber',
        dataIndex: 'passNumber',
      },
      {
        title: 'Số lượt fail',
        key: 'failNumber',
        dataIndex: 'failNumber',
      },
      {
        title: 'Action',
        key: 'action',
        render: (row) =>
          <div className='flex space-x-3 items-center'>
            <Button type="primary" className='hover-raise bg-blue-400 border-none'
              onClick={() => changeStatus(ACTION_TYPE.EDIT, row)}>Edit</Button>
            {tab === 0 &&
              <Button type="primary" className='hover-raise bg-prime-red border-none' danger onClick={() => changeStatus(ACTION_TYPE.HIDE, row)}>Hide</Button>
            }
            {tab === 1 &&
              <Button type="primary" className='hover-raise bg-prime-green border-none' onClick={() => changeStatus(ACTION_TYPE.SHOW, row)}>Show</Button>
            }
          </div>
      },
    ]
  ), [viewDetailQuiz, changeStatus, tab, pageIndex])

  const onSearch = (data) => {

  }

  const onEdit = (values) => {
    console.log(111, values);
  }

  const changePage = (page) => {
    setPageIndex(page - 1);
  }

  const onChangeTab = (key) => {
    setTab(key);
  };

  return (
    <div>
      <div className='flex-between'>
        <h1 className='text-xl medium text-prime-blue mb-6 mr-2'>Quản lý Quiz</h1>
        <Link to={ROUTES.CREATE_QUIZ}>
          <Button className={`bg-prime-orange h-9 mt-5 rounded border-prime-orange hover-scale`} type='primary'>
            Thêm Quiz</Button>
        </Link>
      </div>

      <Tabs
        onChange={onChangeTab}
        items={TAB_LIST.map((tab, i) => ({
          label: <span className='text-base'>{tab}</span>,
          key: i,
          children: (
            <>
              <div className='flex-between mt-5'>
                <Search
                  placeholder='Tìm kiếm tên quiz...'
                  enterButton='Tìm kiếm'
                  onSearch={onSearch}
                  className='search-antd w-1/3'
                />
              </div>

              <div className='mt-10 shadow-md overflow-x-auto bg-white'>
                <Table
                  columns={columnsTable}
                  dataSource={orderList}
                  pagination={false}
                  rowKey="index"
                />
              </div>

              <Pagination
                current={pageIndex + 1}
                pageSize={10}
                total={totalPage}
                onChange={changePage}
                className='mt-6 flex justify-center'
              />
            </>
          )
        }))}
      />

      <KCSModal
        isOpenModal={openDetailModal}
        size='lg'
        title="Chi tiết"
        closeModal={() => setOpenDetailModal(false)}
        confirmButton='Đóng'
        content={<QuizDetail data={orderSelected} />}
      />

      {openEditModal &&
        <QuizEdit
          data={orderSelected}
          visible={openEditModal}
          closeModal={() => setOpenEditModal(false)}
          confirmAction={onEdit}
        />
      }

      <KCSModal
        isOpenModal={openShowModal}
        closeModal={() => setOpenShowModal(false)}
        title="Hiển thị quiz"
        closeButton
        content={<div>Bạn chắc chắn muốn hiển thị quiz: <span className='bold'>{orderSelected.title}</span> ?</div>}
        confirmAction={handleShow}
      />

      <KCSModal
        isOpenModal={openHideModal}
        closeModal={() => setOpenHideModal(false)}
        title="Ẩn quiz"
        closeButton
        content={<div>Bạn chắc chắn muốn ẩn quiz: <span className='bold'>{orderSelected.title}</span> ?</div>}
        confirmAction={handleHide}
      />

    </div>
  );
}

export default React.memo(Quiz);
