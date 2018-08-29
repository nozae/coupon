import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

export default class ColoredScrollbars extends Component {
  // 스크롤바 트랙 스타일 지정
  renderTrack = ({ style, ...props }) => {
    const trackStyle = {
      position: 'absolute',
      width: '2px',
      transition: 'opacity 200ms ease 0s',
      opacity: '1',
      right: '0px',
      bottom: '2px',
      top: '2px',
      borderRadius: '3px',
    };
    return <div style={{ ...style, ...trackStyle }} {...props} />;
  };

  // 스크롤바 스타일 지정
  renderThumb = ({ style, ...props }) => {
    const thumbStyle = {
      backgroundColor: '#6c5cce',
      width: '2px',
    };
    return <div style={{ ...style, ...thumbStyle }} {...props} />;
  };

  render() {
    return (
      <Scrollbars
        renderTrackVertical={this.renderTrack}
        renderThumbVertical={this.renderThumb}
        {...this.props}
      />
    );
  }
}
