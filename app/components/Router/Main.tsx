import * as React from "react";
import { Route, Switch,Redirect } from "react-router-dom";
import AsyncImport from '@/components/AsyncImport';
import AuthRouter from "@/components/Router/AuthRouter";


export default () => {
    return <Switch>
        <Route exact path="/" render={() => (<Redirect to="/sale/in-order"/>)}/>
        <AuthRouter path="/sale/in-order" component={AsyncImport(() => import('@/pages/sale/in-order'))} /> {/*首页*/}
    </Switch>
}