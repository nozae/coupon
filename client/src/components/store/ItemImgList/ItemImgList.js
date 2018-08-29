import React from 'react';
import './ItemImgList.scss';
import Button from 'components/common/Button';
import CustomScrollbar from 'components/common/CustomScrollbar';
import { FiX } from 'react-icons/fi';

const ItemImgList = ({
  makeStamp,
  itemImgList,
  onClose,
  imgSelect,
  onChange,
  onKeyPress,
  setCoupon,
}) => {
  const couponConfig = makeStamp.couponConfig.find(
    coupon =>
      coupon.couponPublishTerm === makeStamp.currentCoupon.couponPublishTerm
  );

  let itemName = '';
  if (couponConfig) {
    itemName = couponConfig.couponItemName;
  }

  const ItemImgArr = itemImgList.map(item => {
    const itemList = item.imgList.map(img => {
      let active = false;
      if (makeStamp.currentCoupon.itemImgId === img.itemImgId) {
        active = true;
      }
      if (
        couponConfig &&
        couponConfig.itemImgId === img.itemImgId &&
        makeStamp.currentCoupon.itemImgId === null
      ) {
        active = true;
      }

      return (
        <div
          key={img.itemImgId}
          className={`img ${active ? 'active' : ''}`}
          onClick={() => imgSelect(img.itemImgId, img.itemImg)}
        >
          <i className={`icon-${img.itemImg}`} />
        </div>
      );
    });
    return (
      <div key={item.imgCategory} className="category">
        <h3>{item.imgCategory}</h3>
        <div className="imgList">{itemList}</div>
      </div>
    );
  });
  return (
    <div className="ItemImgList">
      <div className="dim" onClick={onClose} />
      <div className="modal">
        <h3>쿠폰 상품 이미지를 선택하세요.</h3>
        <CustomScrollbar
          autoHeight
          autoHeightMin={100}
          autoHeightMax={200}
          autoHide
          autoHideTimeout={1000}
          autoHideDuration={200}
          thumbMinSize={100}
          className="scrollbar"
        >
          <div className="list">{ItemImgArr}</div>
        </CustomScrollbar>
        <h3>쿠폰 상품 이름을 입력하세요.</h3>
        <input
          type="text"
          name="couponItemName"
          onChange={onChange}
          onKeyPress={onKeyPress}
          placeholder={itemName}
        />
        <Button theme="confirm" onClick={setCoupon}>
          확인
        </Button>
        <Button theme="close" onClick={onClose}>
          <FiX />
        </Button>
      </div>
    </div>
  );
};

export default ItemImgList;
