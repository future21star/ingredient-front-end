/* eslint-disable import/no-named-as-default */
import React from 'react';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import { HashRouter, Switch, NavLink, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import LoadingBar from 'react-redux-loading-bar'
import { toast } from 'react-toastify';
import { setPusherClient } from 'react-pusher';
import Pusher from 'pusher-js';

import IngredientsSelection from './scene/ingredients_selection';
// import NotFoundPage from './components/NotFoundPage';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.
// 

Pusher.logToConsole = true;

var pusher = new Pusher('a0de568def4dc361bf5e', {
  cluster: 'mt1',
  encrypted: true
});

setPusherClient(pusher);

class Container extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    $(window).resize();
    setTimeout(() => {
      document.getElementById("spinner").style.display = "none";
      document.getElementById("overlay").style.display = "none";        
    }, 1000);
  }

  componentWillReceiveProps(nextProps) {

  }

  render() {

    return (
      <div className="theme-deep-orange">
        <section className="content">
          <Switch>            
            <Route exact path="/" component={IngredientsSelection} />
          </Switch>
        </section>
      </div>
    );
  }
}


export default withRouter(Container);