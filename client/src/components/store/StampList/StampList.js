import React from 'react';
import StampCard from 'components/common/StampCard';
import StampInfo from 'components/common/StampInfo';
import NoStamp from 'components/store/NoStamp';
import SwipeableViews from 'react-swipeable-views';
import './StampList.scss';

const StampList = ({ stampList }) => {
  if (!stampList || stampList.length <= 0) {
    return <NoStamp />;
  }

  const newStampList = stampList.map(stampInfo => (
    <div key={stampInfo.stampId} className="StampWrap">
      <StampCard
        stampMaximum={stampInfo.stampMaximum}
        couponConfig={stampInfo.couponConfig}
      />
      <StampInfo stampInfo={stampInfo} />
    </div>
  ));
  return (
    <SwipeableViews
      resistance
      enableMouseEvents
      className="StampList"
      slideClassName="swipe"
    >
      {newStampList}
    </SwipeableViews>
  );
};

export default StampList;
