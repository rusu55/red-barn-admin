import React from "react";
import prisma from "@/prisma/prisma";
import { format } from "date-fns";
import { UserNav } from "@/components/nav/UserNav";
import _ from "lodash";
import { BoardVenues } from "./components/BoardVenues";
export const dynamic = "force-dynamic";

const VenuesPage = async () => {
  const venues = await prisma.venue.findMany({});

  return (
    <div className="container">
      <div className="pt-10 flex justify-end">
        <UserNav label="blogs" />
      </div>
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <BoardVenues data={venues} />
        </div>
      </div>
    </div>
  );
};

export default VenuesPage;
