import * as React from "react";
import HeaderRight from "@/components/Layout/HeaderRight";
import HeaderLeft from "@/components/Layout/HeaderLeft";
import MainRouter from "@/components/Router/Main";
import {Layout as AntdLayout} from "antd";
import MyMenu from "@/components/Layout/MyMenu";
import styled from "styled-components";
import {observer, inject} from 'mobx-react';
import { RootStore } from "@/stores";
import Common from "@/stores/Common";


@observer
class Layout extends React.Component<{Common:Common}> {

    render() {
        return <AntdLayout style={{ minHeight: '100vh' }}>
            <AntdLayout.Sider>
                <ImgWrap>
                    <Img src={require("@/assets/img/logo.png")} />
                    <LogoTitle>过磅管理软件</LogoTitle>
                </ImgWrap>
                <MyMenu />
            </AntdLayout.Sider>
            <AntdLayout>
                <AntdLayout.Header style={{ background: '#fff', padding: 0, display:'flex' }} >
                    <HeaderLeft />
                    <HeaderRight />
                </AntdLayout.Header>
                <AntdLayout.Content style={{padding:"15px",marginTop:"10px",width:this.props.Common.MainWidth}}>
                    <MainRouter />
                </AntdLayout.Content>
            </AntdLayout>
        </AntdLayout>
    }
}
export default inject<RootStore,any,any,any>(stores => ({
    Common:stores.Common
}))(Layout)

const Img = styled.img`
    height:50px;
`;

const ImgWrap = styled.div`
    height:100px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom:1px solid #2d2d2d;
`;

const LogoTitle = styled.div`
    color: #d11f22;
    font-size: 18px;
    font-weight: bold;
    /* box-shadow: 0px 0px 80px #999; */
    text-shadow: 0 0px 60px #fff;
    background: transparent;
`