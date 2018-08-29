import { Component } from 'react';
import { connect } from 'react-redux';
import { hideTab, showTab } from 'store/modules/base';

class HideTab extends Component {
  constructor(props) {
    super(props);
    props.hideTab();
  }

  componentWillUnmount() {
    this.props.showTab();
  }

  render() {
    return null;
  }
}

export default connect(
  () => ({}),
  {
    hideTab,
    showTab,
  }
)(HideTab);
