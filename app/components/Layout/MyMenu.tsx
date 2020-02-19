import * as React from "react";
import {Menu} from 'antd';
import {NavLink,withRouter, RouteComponentProps} from "react-router-dom";
import storage from "@/utils/storage";
// import user from "@/utils/user";
// import _ from "lodash";


const SubMenu = Menu.SubMenu;


// const AuthMenuItem = WrapAuth(class extends React.Component{
//     // 构造
//     constructor(props) {
//         super(props);
//         // 初始状态
//     }
//     render(){
//         return (
//             <Menu.Item {...this.props} ></Menu.Item>
//         );
//     }
// });

class MyMenu extends React.Component<RouteComponentProps> {

    state = {
        openKeys:[],
        currMenu:''
    };

    componentDidMount() {
        let path = this.props.location.pathname;
        let openKeys = storage.get('openkeys', []);
        this.setState({
            openKeys:openKeys,
            currMenu:path
        });
    }

    componentWillUnmount(){
        storage.remove('openkeys');
    }

    onOpenChange = (e:any) => {
        storage.set('openkeys',e);
        this.setState({
            openKeys: e,
        });
    };

    handleClick = (e:any) => {
        this.setState({
            currMenu: e.key,
        });
    };



    render() {
        return <Menu
            onClick={this.handleClick}
            selectedKeys={[this.state.currMenu]}
            openKeys={this.state.openKeys}
            onOpenChange={this.onOpenChange}
            theme="dark"
            mode="inline"
        >
            <SubMenu key='sale' title={<span>出料（销售出库）</span>}>
                <Menu.Item key='/sale/in-order'>
                    <NavLink to='/sale/in-order'>
                        入厂登记
                    </NavLink>
                </Menu.Item>
                <Menu.Item key='/sale/out-order'>
                    <NavLink to='/sale/out-order'>
                        出厂结算
                    </NavLink>
                </Menu.Item>
                <Menu.Item key='/sale/card-change'>
                    <NavLink to='/sale/card-change'>
                        持卡修改
                    </NavLink>
                </Menu.Item>
                <Menu.Item key='/sale/order-list'>
                    <NavLink to='/sale/order-list'>
                        销售列表
                    </NavLink>
                </Menu.Item>
                <Menu.Item key='/sale/report'>
                    <NavLink to='/sale/report'>
                        销售统计
                    </NavLink>
                </Menu.Item>
                <Menu.Item key='/sale/customer'>
                    <NavLink to='/sale/customer'>
                        销售客户
                    </NavLink>
                </Menu.Item>
            </SubMenu>
            <SubMenu key='product' title={<span>设备管理</span>}>
                <Menu.Item key='/device-cate'>
                    <NavLink to='/device-cate'>
                        设备类别
                    </NavLink>
                </Menu.Item>
                <Menu.Item key='/device'>
                    <NavLink to='/device'>
                        设备管理
                    </NavLink>
                </Menu.Item>
                <Menu.Item key='/device-variable'>
                    <NavLink to='/device-variable'>
                        设备变量
                    </NavLink>
                </Menu.Item>
            </SubMenu>
            <Menu.Item key='/user'>
                <NavLink to='/user'>
                    用户管理
                </NavLink>
            </Menu.Item>
            <Menu.Item key='/setting'>
                <NavLink to='/setting'>
                    系统配置
                </NavLink>
            </Menu.Item>
        </Menu>
    }
}

export default withRouter(MyMenu);