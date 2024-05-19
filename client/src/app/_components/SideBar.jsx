import React, { useEffect, useState } from "react";
import WatchlistTabs from "./WatchlistTabs";
import { Input, message } from "antd";

import { PlusOutlined } from "@ant-design/icons";
import {
  addNewWatchList,
  fetchWatchLists,
} from "../../../zustand/useWatchlistStore";

const SideBar = () => {
  const [showAddInput, setShowAddInput] = useState(false);
  const [newWatchListTitle, setNewWatchListTitle] = useState("");

  useEffect(() => {
    fetchWatchLists();
  }, []);

  const handleAddClick = () => {
    setShowAddInput(true);
    if (newWatchListTitle) {
      addNewWatchList({ title: newWatchListTitle });
      setNewWatchListTitle("");
      setShowAddInput(false);
    } else {
      if (showAddInput) {
        message.error("Watchlist name should not blank");
        setShowAddInput(false);
      }
    }
  };

  return (
    <div className="h-full  bg-slate-50 flex flex-col">
      <div className="flex justify-between items-center min-h-9 bg-gradient-to-b from-slate-200 to-slate-100  p-2 pt-5 pb-5">
        <div className="text-lg font-semibold font-sans">Watchlist</div>
        <div className="flex gap-1 w-1/2 justify-end items-center">
          <div className="">
            <Input
              className={`${!showAddInput && "hidden"}`}
              placeholder="Name"
              value={newWatchListTitle}
              onChange={(e) => setNewWatchListTitle(e.target.value)}
            />
          </div>
          <div className="cursor-pointer" onClick={handleAddClick}>
            <PlusOutlined />
          </div>
        </div>
      </div>
      <WatchlistTabs />
    </div>
  );
};

export default SideBar;
