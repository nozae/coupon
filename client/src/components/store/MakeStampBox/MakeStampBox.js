import React from 'react';
import Button from 'components/common/Button';
import './MakeStampBox.scss';
import MakeStampCard from 'components/store/MakeStampCard';
import ItemImgList from 'components/store/ItemImgList';
import MakeStampCoupon from 'components/store/MakeStampCoupon';

const MakeStampBox = ({
  itemImgList,
  itemImgView,
  makeStamp,
  imgSelect,
  onChange,
  onSelect,
  onClose,
  onKeyPress,
  onSubmit,
  setCoupon,
  delCoupon,
}) => {
  const optionArr = () => {
    const options = [];
    for (let i = 10; i <= 30; i++) {
      options.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return options;
  };

  const stampMaximumSelect = optionArr();

  let couponList = [];
  if (!makeStamp.couponConfig.isEmpty()) {
    couponList = makeStamp.couponConfig.map(coupon => (
      <MakeStampCoupon
        key={coupon}
        coupon={coupon}
        delCoupon={delCoupon}
        makeStamp={makeStamp}
      />
    ));
  }

  return (
    <div className="MakeStampBox">
      {itemImgView ? (
        <ItemImgList
          makeStamp={makeStamp}
          itemImgList={itemImgList}
          imgSelect={imgSelect}
          onClose={onClose}
          onChange={onChange}
          onKeyPress={onKeyPress}
          setCoupon={setCoupon}
        />
      ) : null}

      {/* 스탬프 적립 기준 입력 */}
      <input
        type="text"
        id="stampTerm"
        name="stampTerm"
        placeholder="스탬프 적립 기준 ex) 음료 1잔당 적립"
        onChange={onChange}
      />

      {/* 스탬프 최대 개수 선택 */}
      <select name="stampMaximum" onChange={onChange}>
        {stampMaximumSelect}
      </select>

      <MakeStampCard onSelect={onSelect} makeStamp={makeStamp} />

      {couponList}

      <Button theme="highlight w100" onClick={onSubmit}>
        스탬프카드 만들기
      </Button>
    </div>
  );
};

export default MakeStampBox;
