import { EditOutlined } from '@ant-design/icons';
import { Button, Pagination, Table, Tabs } from 'antd';
import Search from 'antd/lib/input/Search';
import { NewsService } from 'api/NewsService';
import { KCSModal, Notification } from 'components/common';
import ArticleDetail from 'components/page/article/ArticleDetail';
import EditArticle from 'components/page/article/EditArticle';
import { URL_WEB } from 'constants/constants';
import { ROUTES } from 'global/routes';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { convertTime } from 'utils/Utils';

const TAB_LIST = ['Đang hiển thị', 'Đang ẩn'];
const ACTION_TYPE = {
  SHOW: 'SHOW',
  HIDE: 'HIDE',
  EDIT: 'EDIT',
}

const Article = () => {
  const [cateList, setCateList] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [tab, setTab] = useState(0);
  const [openShowModal, setOpenShowModal] = useState(false);
  const [openHideModal, setOpenHideModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [orderSelected, setOrderSelected] = useState('');
  const [searchTxtShow, setSearchTxtShow] = useState('');
  const [searchTxtHide, setSearchTxtHide] = useState('');

  const { data: articleListShow, refetch: refetchArticleListShow } = NewsService.useGetNews({
    params:
    {
      pageNumber: pageIndex,
      status: 'show',
      title: searchTxtShow
    }
  });
  const { data: articleListHide, refetch: refetchArticleListHide } = NewsService.useGetNews({
    params:
    {
      pageNumber: pageIndex,
      status: 'hidden',
      title: searchTxtHide
    }
  });
  const { data: cates } = NewsService.useGetCategory({ params: {} });

  useEffect(() => {
    if (cates?.length) {
      const arr = cates.map(item => ({ value: item.cateId, text: item.cateName }));
      setCateList(arr);
    }
  }, [cates])

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
        render: (value, record, index) => <span>{pageIndex * 10 + index + 1}</span>,
      },
      {
        title: 'Tiêu đề',
        key: 'title',
        dataIndex: 'title',
        width: '25%',
        render: (row, record) => <span className='underline pointer text-blue-500' onClick={() => viewDetail(record)}>{row}</span>
      },
      {
        title: 'Mô tả',
        key: 'description',
        dataIndex: 'description',
        width: '25%',
      },
      {
        title: 'Danh mục',
        key: 'cateName',
        dataIndex: 'cateName',
      },
      {
        title: 'Thumbnail',
        key: 'thumbnail',
        dataIndex: 'thumbnail',
        width: '10%',
        render: (row) => <img alt='thumbnail' src={row} className='h-12 w-auto' />,
      },
      {
        title: 'Ngày đăng',
        width: '10%',
        key: 'createTime',
        dataIndex: 'createTime',
        render: (value) => convertTime(value)
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
    if (tab) {
      setSearchTxtHide(data);
    } else {
      setSearchTxtShow(data);
    }
  }

  const onEdit = (values) => {
    if (typeof values.thumbnail === 'string' || values.thumbnail instanceof String) {
      updateNews(values);
    } else {
      handleUploadFile(values);
    }
  }

  const handleUploadFile = (data) => {
    NewsService.uploadFile(data.thumbnail, res => {
      if (res.success) {
        let body = {
          ...data,
          thumbnail: `${URL_WEB}/${res.data.link}`
        }
        updateNews(body);
      } else {
        Notification.error(res.message);
      }
    })
  }

  const updateNews = (data, status) => {
    const action = status === ACTION_TYPE.SHOW ? 'Hiển thị' : status === ACTION_TYPE.HIDE ? 'Ẩn' : 'Update';
    NewsService.updateNews(data, res => {
      if (res.success) {
        Notification.success(`${action} tin thành công!`);
        setOpenEditModal(false);
        refetchArticleListHide();
        refetchArticleListShow();

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
                  dataSource={i ? articleListHide : articleListShow}
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

      {openEditModal &&
        <EditArticle
          data={orderSelected}
          cateList={cateList}
          visible={openEditModal}
          closeModal={() => setOpenEditModal(false)}
          confirmAction={onEdit}
        />
      }

      {openDetailModal &&
        <ArticleDetail
          data={orderSelected}
          cateList={cateList}
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
