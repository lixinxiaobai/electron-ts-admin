import * as React from 'react'
import { Dropdown, Menu, Icon, Avatar,Button,message } from 'antd';
import styled from "styled-components";
import user from "@/utils/user";
import {withRouter,Link, RouteComponentProps} from "react-router-dom";
import { UserInfo } from '@/api/user';

let HeaderRight:React.FC<RouteComponentProps> = (props) => {
    const menu = (
        <Menu>
            <Menu.Item>
                <Link  to="/user/editpass">修改密码</Link>
            </Menu.Item>
        </Menu>
    );
    // 退出登录
    const logout = async () => {
        await user.logout();
        message.success("退出登录成功");
        props.history.replace("/login");
    };

    const HeaderRightDiv = styled.div`
        position:absolute;
        right:55px;
    `;
    
    const username = (user.getUserInfor() as UserInfo).username;
    return <HeaderRightDiv>
        <Dropdown overlay={menu}>
            <a className="ant-dropdown-link" href="#">
                <Avatar icon="user" style={{marginRight:"5px"}} /> {username} <Icon type="down" />
            </a>
        </Dropdown>
        <Button type="danger" onClick={logout} icon="logout" style={{marginLeft:"15px"}} >
            退出登录
        </Button>
    </HeaderRightDiv>
};

export default  withRouter(HeaderRight);