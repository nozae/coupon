import React from 'react';
import { FiTrash } from 'react-icons/fi';
import './MakeStampCoupon.scss';
import Button from '../../common/Button';

const MakeStampCoupon = ({ coupon, delCoupon, makeStamp }) => {
  const couponIndex = obj => obj.couponPublishTerm === coupon.couponPublishTerm;

  const couponId = makeStamp.couponConfig.findIndex(couponIndex);
  return (
    <div className="MakeStampCoupon">
      <Button theme="icon trash" onClick={() => delCoupon(couponId)}>
        <FiTrash />
      </Button>
      <div className="couponImg">
        <i className={`icon-${coupon.itemImg}`} />
      </div>
      <div className="couponItem">
        <p>{coupon.couponItemName} 쿠폰</p>
        <span className="marker">{coupon.couponPublishTerm}개 적립 시</span>
      </div>
    </div>
  );
};

export default MakeStampCoupon;
