import React from 'react';
import './NoStamp.scss';

const NoStamp = () => {
  const arr = () => {
    const el = [];
    for (let i = 0; i < 10; i++) {
      el.push(
        <div key={i} className="Stamp">
          <span />
        </div>
      );
    }
    return el;
  };
  const NoStamp = arr();
  return (
    <div className="NoStamp">
      <div className="NoStampCard">{NoStamp}</div>
      <h2>스탬프가 없습니다</h2>
    </div>
  );
};

export default NoStamp;
