import React from 'react';

const RealTimeBigListComponent = ({ list }) => (
  <div>{list.map(i => <div key={i.id}>{i.nome}</div>)}</div>
);

export default RealTimeBigListComponent;
