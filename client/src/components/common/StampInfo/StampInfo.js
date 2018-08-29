import React from 'react';
import { Link } from 'react-router-dom';
import './StampInfo.scss';
import { FiSettings } from 'react-icons/fi';

const StampInfo = ({ stampInfo }) => {
  const configArr = stampInfo.couponConfig.map(coupon => (
    <li key={coupon.couponId}>
      스탬프 적립 {coupon.couponPublishTerm}개 - {coupon.couponItemName}
    </li>
  ));
  return (
    <div className="StampInfo">
      <ul className="StampInfoList">
        <li>적립기준 - {stampInfo.stampTerm}</li>
        {configArr}
      </ul>
      <Link
        to={`/store/makestamp/${stampInfo.stampId}`}
        className="StampModify"
      >
        <FiSettings />
      </Link>
    </div>
  );
};

export default StampInfo;
