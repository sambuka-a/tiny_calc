import React from 'react';

const Reports = ({ offers, incomeReport, incomeReportTotal }) => {
  return (
    <div className="reports">
      <div>
        <h2>Report Cash</h2>
      </div>
      <div className="report">
        <div className="reportItems">
          <p>Plate</p>
          <span>{incomeReport[3].totalCash}</span>
        </div>
        <div className="reportItems">
          <p>Candles</p>
          <span>{incomeReport[0].totalCash}</span>
        </div>
        <div className="reportItems">
          <p>Prosfory + Other</p>
          <span>{incomeReport[1].totalCash + incomeReport[2].totalCash}</span>
        </div>
        <div className="reportItems">
          <p>
            <strong>Total (Report)</strong>
          </p>
          <span>{incomeReportTotal}</span>
        </div>
        <div className="reportItems helper">
          <p>To safe (-150 Charity)</p>
          <span>{incomeReportTotal - 150}</span>
        </div>
      </div>
      <div className="report">
        <div className="reportItems">
          <p>
            {offers[1].name.slice(0, 1).toUpperCase() +
              offers[1].name.slice(1, offers[1].name.length)}
          </p>
          <span>{offers[1].totalCash}</span>
        </div>
      </div>
    </div>
  );
};

export default Reports;
