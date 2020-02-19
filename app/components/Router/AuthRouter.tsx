import * as React from 'react';
import {Route, withRouter, Redirect} from 'react-router-dom';
import user from "@/utils/user";
import {Spin} from "antd";

interface State{
    isAuthenticated:boolean;
    fetching:boolean
}

class AuthRouter extends React.Component<any, State> {
    constructor(props:any) {
        super(props);
        this.state = {
            isAuthenticated: false,
            fetching:true
        }
    }

    async componentWillMount() {
        try {
            let isAuthenticated = user.isLogin();
            this.setState({
                isAuthenticated,
                fetching: false
            })
        }catch (e) {
            this.setState({
                isAuthenticated: false,
                fetching: false
            })
        }
    }

    render() {
        if(this.state.fetching){
            return <Spin tip="正在加载" />
        }
        let { component: Component, ...rest} = this.props;
        return  <Route {...rest} render={(props) => (
            this.state.isAuthenticated ?
                (<Component {...props} />) :
                (<Redirect to={{pathname: '/login'}} /> )
        )}
        />
    }
}

export default  withRouter(AuthRouter);