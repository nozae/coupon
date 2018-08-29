import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import * as baseActions from 'store/modules/base';
import Header from 'components/common/Header';

class HeaderContainer extends Component {
  shouldComponentUpdate(nextProps) {
    const { base } = this.props;
    return nextProps.base !== base;
  }

  handleLogout = async () => {
    const { BaseActions, history } = this.props;
    try {
      await BaseActions.logout();
      localStorage.logged = 'false';
      history.push('/');
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { logged } = this.props;
    return <Header logged={logged} onLogout={this.handleLogout} />;
  }
}

export default compose(
  withRouter,
  connect(
    ({ base }) => ({
      base,
      logged: base.logged,
    }),
    dispatch => ({
      BaseActions: bindActionCreators(baseActions, dispatch),
    })
  )
)(HeaderContainer);
