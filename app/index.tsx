import * as React from 'react';
import * as ReactDOM from 'react-dom';
import "react-router-dom";
import './index.global.css';
import App from './App';
import { AppContainer } from 'react-hot-loader';
import stores from '@/stores/index';
import { createHashHistory } from "history";
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';

const routingStore = new RouterStore();
const hashHistory = createHashHistory();
const history = syncHistoryWithStore(hashHistory, routingStore);
stores["routing"] = routingStore;

ReactDOM.render(<AppContainer><App stores={stores} history={history} /></AppContainer>, document.getElementById('root'));

if ((module as any).hot) {
    // console.log((module as any).hot);
  (module as any).hot.accept('./App', () => {
    // eslint-disable-next-line global-require
    const NextApp = require('./App').default;
    ReactDOM.render(<AppContainer ><NextApp stores={stores} history={history} /></AppContainer>,document.getElementById('root'));
  });
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
