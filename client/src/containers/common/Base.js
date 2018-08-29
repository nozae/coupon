import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import * as baseActions from 'store/modules/base';
import * as storeActions from 'store/modules/store';

class Base extends Component {
  componentDidMount() {
    this.initialize().then(() => {
      const { StoreActions, userType, storeInfo } = this.props;
      if (userType === 1) {
        StoreActions.getStampInfo(storeInfo.storeId);
      }
    });
  }

  initialize = async () => {
    const { BaseActions, history } = this.props;
    try {
      if (localStorage.logged === 'true') {
        BaseActions.tempLogin();
      }
      const auth = await BaseActions.checkLogin();
      if (auth.data.isErr) {
        localStorage.logged = 'false';
        history.push('/');
        return false;
      }
      const sessionData = JSON.parse(JSON.stringify(auth.data));
      return await BaseActions.setUser(sessionData);
    } catch (err) {
      return console.log(err);
    }
  };

  render() {
    return <div />;
  }
}

export default compose(
  withRouter,
  connect(
    ({ base }) => ({
      userType: base.data.userType,
      storeInfo: base.storeInfo,
    }),
    dispatch => ({
      BaseActions: bindActionCreators(baseActions, dispatch),
      StoreActions: bindActionCreators(storeActions, dispatch),
    })
  )
)(Base);
