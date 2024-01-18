import {
  BookOutlined,
  CalendarOutlined,
  ContainerOutlined,
  LineChartOutlined,
  ProjectOutlined,
  ReadOutlined,
  UserOutlined,
  WalletOutlined
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
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
        <div className="border-b border-gray-500 py-3 text-center">
          <h1 className="medium text-white text-3xl mb-0 mr-3">CyberHub</h1>
        </div>
      </NavLink>

      <Menu theme="dark" defaultSelectedKeys={[]} mode="inline" style={{ fontWeight: 600 }}
        defaultOpenKeys={['news', 'quiz']}>
        <SubMenu key="news" icon={<BookOutlined />} title="Quản lý tin tức">
          <Menu.Item key="news_cate" icon={<CalendarOutlined />} title='Danh mục'>
            <Link to={ROUTES.CATEGORY_MANAGEMENT}>Danh mục</Link></Menu.Item>
          <Menu.Item key="news_item" icon={<ContainerOutlined />} title='Tin tức'>
            <Link to={ROUTES.ARTICLE_MANAGEMENT}>Tin tức</Link></Menu.Item>
        </SubMenu>

        <SubMenu key="quiz" icon={<ProjectOutlined />} title="Quản lý trắc nghiệm">
          <Menu.Item key="quiz_type" icon={<WalletOutlined />} title='Thể loại'>
            <Link to={ROUTES.QUIZ_TYPE}>Thể loại</Link></Menu.Item>
          <Menu.Item key="quiz_item" icon={<ReadOutlined />} title='Quiz'>
            <Link to={ROUTES.QUIZ_MANAGEMENT}>Quiz</Link></Menu.Item>
        </SubMenu>

        <Menu.Item key="statistical" icon={<LineChartOutlined />} title='Thống kê'>
          <Link to={ROUTES.STATISTICAL}>Thống kê</Link></Menu.Item>

        <Menu.Item key="user" icon={<UserOutlined />} title='Quản lý tài khoản'>
          <Link to={ROUTES.MANAGE_ACCOUNT}>Quản lý tài khoản</Link></Menu.Item>
      </Menu>
    </Sider>
  );
};

export default React.memo(SidebarAnt);
