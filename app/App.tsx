import * as React from 'react';
import { Router } from "react-router-dom";
import Layout from "@/pages/layout";
import { Provider, observer } from 'mobx-react';
//import stores from '@/stores/index';
import { ConfigProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import * as moment from 'moment';
import 'moment/locale/zh-cn';
import { Route, Switch } from "react-router-dom";
import AsyncImport from './components/AsyncImport';
import AuthRouter from "./components/Router/AuthRouter";
// import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import './App.global.css';
// import { createHashHistory } from "history";
import hotkeys from "hotkeys-js"; 

// const createHashHistory = require("history").createHashHistory
// const routingStore = new RouterStore();
// const hashHistory = createHashHistory();
// const history = syncHistoryWithStore(hashHistory, routingStore);
// stores["routing"] = routingStore;

moment.locale('zh-cn'); 

class App extends React.Component <any> {

  

  componentDidMount() {
    console.log("ssddd");
    hotkeys("ctrl+d", (event: any, handler: any) => {
      window.require("electron").remote.getCurrentWebContents().openDevTools();
    })
  }
  
  render() {
    return (
      <Provider {...this.props.stores} >
        <Router history={this.props.history}>
          <ConfigProvider locale={zh_CN}>
            <div id="app">
              <Switch>
                <Route path="/login" component={AsyncImport(() => import('@/pages/login/login'))} />
                <AuthRouter path="/" component={Layout} />
              </Switch>
            </div>
          </ConfigProvider>
        </Router>
      </Provider>
    );
  }
}

export default observer(App);
