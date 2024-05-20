import React, { useEffect, useRef, useState } from "react";
import { Divider, Tabs } from "antd";
import StocksList from "./StocksList";
import { useWatchListStore } from "../../../zustand/useWatchlistStore";
import SearchStocks from "@/app/_components/search/SearchStocks";

const WatchlistTabs = ({}) => {
  const { watchLists, activeWatchList, updateActiveWatchList } =
    useWatchListStore();

  const [activeKey, setActiveKey] = useState(watchLists[0]?.title);
  const [items, setItems] = useState([]);
  const newTabIndex = useRef(0);

  useEffect(() => {
    const watch = watchLists?.map((watchlist, i) => {
      return {
        label: watchlist?.title ?? "",
        children: (
          <div className="flex flex-col gap-2">
            <div className="p-1">
              <SearchStocks />
            </div>
            <StocksList stocks={watchlist.stocks} />
          </div>
        ),
        key: watchlist?.title ?? "",
      };
    });
    if (watchLists && !activeKey) {
      updateActiveWatchList(watchLists[0]?.title);
    }
    setItems(watch);
  }, [watchLists]);

  const onChange = (key) => {
    setActiveKey(key);
    updateActiveWatchList(key);
  };
  const add = () => {
    const newActiveKey = `newTab${newTabIndex.current++}`;
    setItems([
      ...items,
      {
        label: "New Tab",
        children: <StocksList />,
        key: newActiveKey,
      },
    ]);
    setActiveKey(newActiveKey);
  };
  const remove = (targetKey) => {
    const targetIndex = items.findIndex((pane) => pane.key === targetKey);
    const newPanes = items.filter((pane) => pane.key !== targetKey);
    if (newPanes.length && targetKey === activeKey) {
      const { key } =
        newPanes[
          targetIndex === newPanes.length ? targetIndex - 1 : targetIndex
        ];
      setActiveKey(key);
    }
    setItems(newPanes);
  };
  const onEdit = (targetKey, action) => {
    if (action === "add") {
      add();
    } else {
      remove(targetKey);
    }
  };
  return (
    <div>
      <Tabs
        // hideAdd
        onChange={onChange}
        activeKey={activeKey}
        // type="editable-card"
        onEdit={onEdit}
        items={items}
      />
    </div>
  );
};
export default WatchlistTabs;
