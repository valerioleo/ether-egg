import React from 'react';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import {hot} from 'react-hot-loader/root';
import Layout from '../common/layout';
import StickyNotification from '../common/StickyNotification';
import links from './links';
import Home from '../home';
import MyBasket from '../MyBasket';
import LayEggs from '../LayEggs';
import Web3Guard from './Web3Guard';

const AppRouter = () => (
  <Router>
    <Web3Guard>
      <Switch>
        <Layout id='routers-container' style={{height: '100%'}} menuItems={links}>
          <Route exact path='/' component={Home} />
          <Route exact path='/my-basket' component={MyBasket}/>
          <Route exact path='/lay-egg' component={LayEggs}/>
        </Layout>
      </Switch>

      <StickyNotification/>
    </Web3Guard>
  </Router>
);

export default hot(AppRouter);
