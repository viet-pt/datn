import {
  BarChartOutlined,
  BookOutlined,
  CalendarOutlined,
  ContainerOutlined,
  FundOutlined,
  LineChartOutlined,
  ProjectOutlined,
  ReadOutlined,
  UserOutlined,
  WalletOutlined
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import logo from 'assets/images/logo-konec.svg';
import { ROUTES } from 'global/routes';
import React from "react";
import { Link, NavLink } from "react-router-dom";
import './style.scss';

const { SubMenu } = Menu;
const { Sider } = Layout;


const SidebarAnt = () => {
  return (
    <Sider
      style={{
        overflowY: 'auto',
        overflowX: 'hidden',
        height: '100vh',
        position: 'fixed',
        left: 0,
        zIndex: 1000
      }}>
      <NavLink exact to="/" className="block">
        <div className="border-b border-gray-500 h-16 py-4 text-center">
          <img className="h-7 mx-auto" src={logo} alt="logo" />
        </div>
      </NavLink>

      <Menu theme="dark" defaultSelectedKeys={[]} mode="inline" style={{ fontWeight: 600 }}
        defaultOpenKeys={['news', 'quiz']}>
        <SubMenu key="news" icon={<BookOutlined />} title="Quản lý tin tức">
          <Menu.Item key="news_cate" icon={<CalendarOutlined />} title='Quản lý danh mục'>
            <Link to={ROUTES.CATEGORY_MANAGEMENT}>Quản lý danh mục</Link></Menu.Item>
          <Menu.Item key="news_item" icon={<ContainerOutlined />} title='Quản lý tin đăng'>
            <Link to={ROUTES.ARTICLE_MANAGEMENT}>Quản lý tin đăng</Link></Menu.Item>
        </SubMenu>

        <SubMenu key="quiz" icon={<ProjectOutlined />} title="Quản lý trắc nghiệm">
          <Menu.Item key="quiz_type" icon={<WalletOutlined />} title='Quản lý thể loại'>
            <Link to={ROUTES.QUIZ_TYPE}>Quản lý thể loại</Link></Menu.Item>
          <Menu.Item key="quiz_item" icon={<ReadOutlined />} title='Quản lý quiz'>
            <Link to={ROUTES.QUIZ_MANAGEMENT}>Quản lý quiz</Link></Menu.Item>
        </SubMenu>

        <SubMenu key="statistical" icon={<LineChartOutlined />} title="Thống kê">
          <Menu.Item key="statistical_news" icon={<FundOutlined />} title='Thống kê tin tức'>
            <Link to={ROUTES.STATISTICAL_NEWS}>Thống kê tin tức</Link></Menu.Item>
          <Menu.Item key="statistical_quiz" icon={<BarChartOutlined />} title='Thống kê trắc nghiệm'>
            <Link to={ROUTES.STATISTICAL_QUIZ}>Thống kê trắc nghiệm</Link></Menu.Item>
        </SubMenu>

        <Menu.Item key="user" icon={<UserOutlined />} title='Quản lý user'>
          <Link to={ROUTES.USER}>Quản lý user</Link></Menu.Item>
      </Menu>
    </Sider>
  );
};

export default React.memo(SidebarAnt);
