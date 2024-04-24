import React from "react";
import { UserNav } from "@/components/nav/UserNav";
import { BillboardPortfolio } from "./components/BillboardPortfolio";
const POrtfolioPage = () => {
  return (
    <div className="container">
      <div className="pt-10 flex justify-end">
        <UserNav label="portfolio" />
      </div>
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <BillboardPortfolio />
        </div>
      </div>
    </div>
  );
};

export default POrtfolioPage;
