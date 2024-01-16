import { Button, Table, Tabs } from 'antd';
import Search from 'antd/lib/input/Search';
import { QuizService } from 'api/QuizService';
import { KCSModal, Notification } from 'components/common';
import QuizDetail from 'components/page/quiz/QuizDetail';
import QuizEdit from 'components/page/quiz/QuizEdit';
import { ROUTES } from 'global/routes';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { convertTime } from 'utils/Utils';

const ACTION_TYPE = {
  SHOW: 'SHOW',
  HIDE: 'HIDE',
  EDIT: 'EDIT',
}

const TAB_LIST = ['Đang hiển thị', 'Đang ẩn'];

const Quiz = () => {
  const [cateList, setCateList] = useState([]);
  const [pageIndexShow, setPageIndexShow] = useState(0);
  const [pageIndexHide, setPageIndexHide] = useState(0);
  const [tab, setTab] = useState(0);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [orderSelected, setOrderSelected] = useState('');
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openShowModal, setOpenShowModal] = useState(false);
  const [openHideModal, setOpenHideModal] = useState(false);
  const [searchTxtShow, setSearchTxtShow] = useState('');
  const [searchTxtHide, setSearchTxtHide] = useState('');

  const { data: quizListShow, refetch: refetchQuizListShow } = QuizService.useGetQuiz({
    params:
    {
      status: 'show',
      title: searchTxtShow
    }
  });
  const { data: quizListHide, refetch: refetchQuizListHide } = QuizService.useGetQuiz({
    params:
    {
      status: 'hidden',
      title: searchTxtHide
    }
  });
  const { data: cates } = QuizService.useGetCategory({ params: {} });

  useEffect(() => {
    if (cates?.length) {
      const arr = cates.map(item => ({ value: item.cateId, text: item.cateName }));
      setCateList(arr);
    }
  }, [cates])

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
    updateNews({
      ...orderSelected,
      status: 'show'
    }, ACTION_TYPE.SHOW);
  }

  const handleHide = () => {
    updateNews({
      ...orderSelected,
      status: 'hidden'
    }, ACTION_TYPE.HIDE);
  }

  const columnsTable = useMemo(() => (
    [
      {
        title: 'STT',
        dataIndex: 'index',
        key: 'index',
        width: '3%',
        render: (row, record, index) => <span>{(tab ? pageIndexHide : pageIndexShow) * 10 + index + 1}</span>,
      },
      {
        title: 'Câu hỏi',
        dataIndex: 'question',
        key: 'question',
        width: '50%',
        render: (value, row) => <span className='underline pointer text-blue-500 hover:text-green-500'
          onClick={() => viewDetailQuiz(row)}>{value}</span>
      },
      {
        title: 'Thể loại',
        key: 'cateName',
        dataIndex: 'cateName',
        width: '15%',
      },
      {
        title: 'Ngày tạo',
        key: 'createTime',
        dataIndex: 'createTime',
        render: (value) => convertTime(value)
      },
      // {
      //   title: 'Số lượt pass',
      //   key: 'passNumber',
      //   dataIndex: 'passNumber',
      // },
      // {
      //   title: 'Số lượt fail',
      //   key: 'failNumber',
      //   dataIndex: 'failNumber',
      // },
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
  ), [viewDetailQuiz, changeStatus, tab, pageIndexShow, pageIndexHide])

  const onSearch = (data) => {
    if (tab) {
      setSearchTxtHide(data);
    } else {
      setSearchTxtShow(data);
    }
  }

  const updateNews = (values, status) => {
    const action = status === ACTION_TYPE.SHOW ? 'Hiển thị' : status === ACTION_TYPE.HIDE ? 'Ẩn' : 'Update';
    QuizService.updateQuiz(values, res => {
      if (res.success) {
        Notification.success(`${action} quiz thành công!`);
        setOpenEditModal(false);
        refetchQuizListHide();
        refetchQuizListShow();
        if (status) {
          setOpenShowModal(false);
          setOpenHideModal(false);
        }
      } else {
        Notification.error(res.message);
      }
    })
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
                  dataSource={i ? quizListHide : quizListShow}
                  rowKey="index"
                  pagination={{
                    onChange: (page) => {
                      if (i) {
                        setPageIndexHide(page)
                      } else {
                        setPageIndexShow(page)
                      }
                    },
                    position: ['bottomCenter']
                  }}
                />
              </div>
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
          cateList={cateList}
          visible={openEditModal}
          closeModal={() => setOpenEditModal(false)}
          confirmAction={updateNews}
        />
      }

      <KCSModal
        isOpenModal={openShowModal}
        closeModal={() => setOpenShowModal(false)}
        title="Hiển thị quiz"
        closeButton
        content={<div>Bạn chắc chắn muốn hiển thị quiz: <span className='bold'>{orderSelected.question}</span> ?</div>}
        confirmAction={handleShow}
      />

      <KCSModal
        isOpenModal={openHideModal}
        closeModal={() => setOpenHideModal(false)}
        title="Ẩn quiz"
        closeButton
        content={<div>Bạn chắc chắn muốn ẩn quiz: <span className='bold'>{orderSelected.question}</span> ?</div>}
        confirmAction={handleHide}
      />
    </div>
  );
}

export default React.memo(Quiz);
