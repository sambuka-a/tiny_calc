import React from 'react';

const Totals = ({ offers, filtered, handleHidePositions }) => {
  return (
    <div className="totals report">
      <div className="card">
        <div className="title">
          <p>Card</p>
        </div>
        <div className="total">
          {offers.map((i) => (
            <p key={i.id}>
              {`${i.name}: `}
              <span>{i.totalCard}</span>
            </p>
          ))}
          <div className="totalsData">
            <span>{offers.reduce((acc, item) => acc + item.totalCard, 0)}</span>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="title">
          <p>Cash</p>
        </div>
        <div className="total">
          {offers.map((i) => (
            <p key={i.id}>
              {`${i.name}: `}
              <span>{i.totalCash}</span>
            </p>
          ))}
          <div className="totalsData">
            <span>{offers.reduce((acc, item) => acc + item.totalCash, 0)}</span>
          </div>
        </div>
      </div>
      {/* <div className="card">
        <div className="title">
          <p>Filters</p>
        </div>
        <div className="total">
          {offers.map((i) => (
            <div key={i.id} className="totalChecks">
              <label>hide</label>
              <input type="checkbox" value={i.id} onChange={() => handleHidePositions(i.id)} />
            </div>
          ))}
          <div className="totalsData">
            <span>{filtered}</span>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Totals;
