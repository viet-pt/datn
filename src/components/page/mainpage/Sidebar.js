import {
  CarOutlined,
  ContainerOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import logo from 'assets/images/logo-konec.svg';
import { ROUTES } from 'global/routes';
import React from "react";
import { Link, NavLink } from "react-router-dom";
import './style.scss';

// const { SubMenu } = Menu;
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
        defaultOpenKeys={['manage_account']}>
        <Menu.Item key="article" icon={<ContainerOutlined />} title='Quản lý tin tức'>
          <Link to={ROUTES.ARTICLE_MANAGEMENT}>Quản lý tin tức</Link></Menu.Item>

        <Menu.Item key="order" icon={<CarOutlined />} title='Quản lý Quiz'>
          <Link to={ROUTES.QUIZ_MANAGEMENT}>Quản lý Quiz</Link></Menu.Item>
      </Menu>
    </Sider>
  );
};

export default React.memo(SidebarAnt);
