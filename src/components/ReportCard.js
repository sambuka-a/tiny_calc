import React from 'react';

const ReportCard = ({ offers, incomeReport, incomeReportTotal }) => {
  return (
    <div className="reports">
      <div>
        <h2>Report Card</h2>
      </div>
      <div className="report">
        <div className="reportItems">
          <p>Candles</p>
          <span>{incomeReport[0].totalCard}</span>
        </div>
        <div className="reportItems">
          <p>Prosfory + Other</p>
          <span>{incomeReport[1].totalCard + incomeReport[2].totalCard}</span>
        </div>
        <div className="reportItems">
          <p>
            <strong>Total (Report)</strong>
          </p>
          <span>{incomeReportTotal}</span>
        </div>
      </div>
      <div className="report">
        <div className="reportItems">
          <p>
            {offers[1].name.slice(0, 1).toUpperCase() +
              offers[1].name.slice(1, offers[1].name.length)}
          </p>
          <span>{offers[1].totalCard}</span>
        </div>
      </div>
    </div>
  );
};

export default ReportCard;
