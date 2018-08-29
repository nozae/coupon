import React from 'react';
import './Tab.scss';

const TabItem = ({ children, tab, count, selected, onSelect }) => (
  <div
    className={`TabItem ${tab === selected ? 'active' : ''}`}
    onClick={() => onSelect(tab)}
  >
    <p>{children}</p>
    <h3>
      {!count ? '0' : count.length}
      <span>{tab === 'stamp' ? '개' : '명'}</span>
    </h3>
  </div>
);

const Tab = ({ stampList, selected, onSelect }) => (
  <div className="Tab">
    <TabItem
      tab="Stamp"
      selected={selected}
      count={stampList}
      onSelect={onSelect}
    >
      우리매장 스탬프
    </TabItem>
    <TabItem tab="Guest" selected={selected} onSelect={onSelect}>
      적립중인 회원
    </TabItem>
  </div>
);

export default Tab;
