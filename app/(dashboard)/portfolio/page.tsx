import React from "react";

import { BillboardPortfolio } from "./components/BillboardPortfolio";
const POrtfolioPage = () => {
  return (
    <div className="container">
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <BillboardPortfolio />
        </div>
      </div>
    </div>
  );
};

export default POrtfolioPage;
