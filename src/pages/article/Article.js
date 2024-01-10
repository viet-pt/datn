import { EditOutlined } from '@ant-design/icons';
import { Button, Pagination, Table, Tabs } from 'antd';
import Search from 'antd/lib/input/Search';
import { UserService } from 'api/UserService';
import { Queries } from 'api/queries';
import { KCSModal, Notification } from 'components/common';
import ArticleDetail from 'components/page/article/ArticleDetail';
import EditArticle from 'components/page/article/EditArticle';
import { ARTICLE_LIST } from 'constants/constants';
import { ROUTES } from 'global/routes';
import moment from 'moment';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useMutation } from 'react-query';
import { Link } from 'react-router-dom';

const TAB_LIST = ['Đang hiển thị', 'Đang ẩn'];
const ACTION_TYPE = {
  SHOW: 'SHOW',
  HIDE: 'HIDE',
  EDIT: 'EDIT',
}

const Article = () => {
  const [articleList, setArticleList] = useState(ARTICLE_LIST); //fake
  const [totalPage, setTotalPage] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [tab, setTab] = useState(0);
  const [openShowModal, setOpenShowModal] = useState(false);
  const [openHideModal, setOpenHideModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [orderSelected, setOrderSelected] = useState('');

  const { data: orderData, refetch: refetchOrder } = Queries.useGetOrder({ params: { page: pageIndex, status: tab, sort: 'createTime,desc' } });

  useEffect(() => {
    if (orderData?.errorCode === 0) {
      setArticleList(orderData.data);
      setTotalPage(orderData.totalItems);
    }
  }, [orderData])

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

  const viewDetail = useCallback((data) => {
    setOrderSelected(data);
    setOpenDetailModal(true);
  }, [])

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
        title: 'Tiêu đề',
        key: 'title',
        dataIndex: 'title',
        render: (row, record) => <span className='underline pointer text-blue-500' onClick={() => viewDetail(record)}>{row}</span>
      },
      {
        title: 'Mô tả',
        key: 'description',
        dataIndex: 'description',
      },
      {
        title: 'Thumbnail',
        key: 'thumbnail',
        dataIndex: 'img',
        width: '10%',
        render: (row) => <img alt='thumbnail' src={row} className='h-12 w-auto' />,
      },
      {
        title: 'Ngày đăng',
        width: '10%',
        key: 'createTime',
        dataIndex: 'convertCreateTime',
        sorter: (a, b) => moment(a.convertCreateTime, 'DD/MM/YY hh:mm').unix() - moment(b.convertCreateTime, 'DD/MM/YY hh:mm').unix()
      },
      {
        title: 'Action',
        key: 'action',
        width: '10%',
        render: (row) =>
          <div className='flex space-x-3 items-center'>
            <Button type="primary" className='hover-raise bg-blue-400 border-none'
              onClick={() => changeStatus(ACTION_TYPE.EDIT, row)} icon={<EditOutlined />}>Edit</Button>
            {tab === 0 &&
              <Button type="primary" className='hover-raise bg-prime-red border-none' danger onClick={() => changeStatus(ACTION_TYPE.HIDE, row)}>Hide</Button>
            }
            {tab === 1 &&
              <Button type="primary" className='hover-raise bg-prime-green border-none' onClick={() => changeStatus(ACTION_TYPE.SHOW, row)}>Show</Button>
            }
          </div>

      },
    ]
  ), [viewDetail, changeStatus, tab, pageIndex])

  const onSearch = (data) => {

  }

  const onEdit = (values) => {
    console.log('data: ', values);
    setOpenEditModal(false);
  }

  const onChangeTab = (key) => {
    setTab(key);
  };

  const changePage = (page) => {
    setPageIndex(page - 1);
  }

  return (
    <div>
      <div className='flex-between'>
        <h1 className='text-xl medium text-prime-blue mb-6 mr-2'>Quản lý tin tức</h1>
        <Link to={ROUTES.CREATE_ARTICLE}>
          <Button className={`bg-prime-orange h-9 mt-5 rounded border-prime-orange hover-scale`} type='primary'>
            Thêm tin tức</Button>
        </Link>
      </div>

      <Tabs
        onChange={onChangeTab}
        items={TAB_LIST.map((tab, i) => ({
          label: <span className='text-base'>{tab}</span>,
          key: i,
          children: (
            <>
              <div className='mt-5'>
                <Search
                  placeholder='Tìm kiếm theo tiêu đề...'
                  enterButton='Tìm kiếm'
                  onSearch={onSearch}
                  className='search-antd w-1/3'
                />
              </div>

              <div className='mt-10 shadow-md overflow-x-auto bg-white'>
                <Table
                  columns={columnsTable}
                  dataSource={articleList}
                  pagination={false}
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

      {openEditModal &&
        <EditArticle
          data={orderSelected}
          visible={openEditModal}
          closeModal={() => setOpenEditModal(false)}
          confirmAction={onEdit}
        />
      }

      {openDetailModal &&
        <ArticleDetail
          data={orderSelected}
          visible={openDetailModal}
          closeModal={() => setOpenDetailModal(false)}
        />
      }

      <KCSModal
        isOpenModal={openShowModal}
        closeModal={() => setOpenShowModal(false)}
        title="Hiển thị bài viết"
        closeButton
        content={<div>Bạn chắc chắn muốn hiển thị bài viết: <span className='bold'>{orderSelected.title}</span> ?</div>}
        confirmAction={handleShow}
      />

      <KCSModal
        isOpenModal={openHideModal}
        closeModal={() => setOpenHideModal(false)}
        title="Ẩn bài viết"
        closeButton
        content={<div>Bạn chắc chắn muốn ẩn bài viết: <span className='bold'>{orderSelected.title}</span> ?</div>}
        confirmAction={handleHide}
      />
    </div>
  );
}

export default React.memo(Article);
