import * as React from 'react'
import { Button, Row, Form, Input, message } from 'antd'
// import {GlobalFooter} from 'ant-design-pro'
import styled from "styled-components";
import { observer } from "mobx-react";
import user from "@/utils/user";
import { FormComponentProps } from 'antd/lib/form';
import { RouteComponentProps } from 'react-router';
import SettingApi from '@/components/SettingApi';
import { observable } from 'mobx';
import storage from '@/utils/storage';
import { STORE_KEY_APIURL } from '@/config/constans';
import hotkeys from 'hotkeys-js';
import User from '@/api/user';
import IcCard from '@/hardware/iccard';

const FormItem = Form.Item;

interface LoginFormProps extends RouteComponentProps,FormComponentProps {
    
}

@observer
class Login extends React.Component<LoginFormProps> {

    state = {
        loading: false
    }

    iccard:IcCard = new IcCard();

    @observable ApiurlModal:{
        visible:boolean;
        close: () => void | undefined;
    }={
        visible:false,
        close:() => {
            this.ApiurlModal.visible = false;
        }
    }

    componentDidMount(){
        if(!storage.get(STORE_KEY_APIURL)){
            this.ApiurlModal.visible = true;
        }
        hotkeys("ctrl+s", () => {
            this.ApiurlModal.visible = !this.ApiurlModal.visible;
        })
        

    }

    handleOk = async (e:React.FormEvent) => {
        e.preventDefault();
        let cardno = this.iccard.readCardNumber();
        console.log(cardno,"cardno");
        this.props.form.validateFieldsAndScroll(async (err, values) => {
            if (!err) {
                this.setState({ loading: true });
                try {
                    // let {username, password} = values;
                    let result = await User.login(values);
                    if (result.status) {
                        message.success("登录成功");
                        await user.login(result.data);
                        this.props.history.replace("/home")
                    } else {
                        message.error(result.info);
                    }
                    this.setState({ loading: false });
                } catch (e) {
                    this.setState({ loading: false });
                }
            }
        })
    };


    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <LoginContainer> 
                <LoginWrap>
                    <LoginLogo>
                        <span>过磅管理软件过磅端112255667</span>
                    </LoginLogo>
                    <Form onSubmit={this.handleOk}>
                        <FormItem>
                            {getFieldDecorator('username', {
                                rules: [
                                    {
                                        required: true,
                                        message: "用户名必须存在"
                                    },
                                ]
                            })(
                                <Input
                                    onPressEnter={this.handleOk}
                                    placeholder="请输入用户名"
                                />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [
                                    {
                                        required: true,
                                        message: "密码必须存在"
                                    },
                                ],
                            })(
                                <Input
                                    type="password"
                                    onPressEnter={this.handleOk}
                                    placeholder="请输入密码"
                                />
                            )}
                        </FormItem>
                        <Row>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={this.state.loading}
                            >
                                登陆
                            </Button>
                        </Row>
                    </Form>
                </LoginWrap>
                <SettingApi
                    visible={this.ApiurlModal.visible}
                    close={this.ApiurlModal.close}
                />
                <Footer>
                    {/*<GlobalFooter copyright={"@2018-2019 技术支持：XXX技术有限公司"}/>*/}
                </Footer>
            </LoginContainer>
        )
    }
}

export default Form.create()(Login);

const LoginContainer = styled.div`
    height:100%;
    background: linear-gradient(#a29cd2,#4c4c77,#f9c6c6);
`;

const LoginWrap = styled.div`
    position: absolute;
    top: 45%;
    left: 50%;
    margin: -160px 0 0 -160px;
    width: 420px;
    height: 320px;
    padding: 36px;
    box-shadow: 0 0 100px rgba(0, 0, 0, 0.08);
    background-color:#eee;
    border-radius:5px;
    button {
      width: 100%;
    }
  
    p {
      color: rgb(204, 204, 204);
      text-align: center;
      margin-top: 16px;
      font-size: 12px;
      display: flex;
      justify-content: space-between;
    }
`;

const LoginLogo = styled.div`
    text-align: center;
    cursor: pointer;
    margin-bottom: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
  
    img {
      width: 40px;
      margin-right: 8px;
    }
  
    span {
      vertical-align: text-bottom;
      font-size: 16px;
      text-transform: uppercase;
      display: inline-block;
      font-weight: 700;
      color: #74839b;
    }
`;

const Footer = styled.div`
    position: absolute;
    width: 100%;
    bottom: 0;
`;