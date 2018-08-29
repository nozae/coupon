import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import * as baseActions from 'store/modules/base';
import * as storeActions from 'store/modules/store';
import LoginBox from 'components/login/LoginBox';
import { isEmpty } from 'validator';

class LoginContainer extends Component {
  handleLogin = async () => {
    const { BaseActions, StoreActions, email, password, history } = this.props;

    if (isEmpty(email, { ignore_whitespace: true })) {
      return alert('아이디를 입력하세요.');
    }

    if (isEmpty(password, { ignore_whitespace: true })) {
      return alert('패스워드를 입력하세요.');
    }

    try {
      const auth = await BaseActions.login(email, password);

      if (auth.data.isErr) {
        return alert(auth.data.msg);
      }

      await BaseActions.setUser(auth.data);
      localStorage.logged = 'true';

      if (auth.data.data.userType === 1) {
        await StoreActions.getStampInfo(auth.data.data.storeInfo.storeId);
      }
      history.push(`/`);

      return true;
    } catch (err) {
      return console.log(err);
    }
  };

  handleChange = e => {
    const { name, value } = e.target;
    const { BaseActions } = this.props;
    const input = {
      name,
      value,
    };
    BaseActions.changeInput(input);
  };

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.handleLogin();
    }
  };

  render() {
    const { handleLogin, handleChange, handleKeyPress } = this;
    return (
      <LoginBox
        onLogin={handleLogin}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
    );
  }
}

// 컴포넌트에 리덕스 스토어를 연동해줄 때에는 connect 함수 사용
export default compose(
  withRouter,
  connect(
    ({ base }) => ({
      email: base.email,
      password: base.password,
    }),
    dispatch => ({
      BaseActions: bindActionCreators(baseActions, dispatch),
      StoreActions: bindActionCreators(storeActions, dispatch),
    })
  )
)(LoginContainer);
