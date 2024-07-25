import React from 'react';

interface Props {
  total: number;
}

const Checkout: React.FC<Props> = ({total}) => {
  return (
    <div className="card mb-3">
      <div className="card-body d-flex align-items-center justify-content-between">
        <strong>Order total: <span className="fw-medium">{total - 150} KGS</span></strong>
        <button className="btn btn-primary" type="button">Checkout</button>
      </div>
    </div>
  );
};

export default Checkout;