import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as storeActions from 'store/modules/store';
import Tab from 'components/common/Tab';

class TabContainer extends Component {
  handleSelect = tab => {
    const { StoreActions } = this.props;
    StoreActions.tabSelect(tab);
  };

  render() {
    const { stampList, visible, selected } = this.props;
    if (!visible) return null;
    return (
      <Tab
        selected={selected}
        stampList={stampList}
        onSelect={this.handleSelect}
      />
    );
  }
}

export default connect(
  ({ base }) => ({
    visible: base.tab,
  }),
  dispatch => ({
    StoreActions: bindActionCreators(storeActions, dispatch),
  })
)(TabContainer);
