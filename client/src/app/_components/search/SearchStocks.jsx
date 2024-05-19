import { AutoComplete, Spin } from "antd";
import axios from "axios";
import React, { useState } from "react";
import {
  addNewStock,
  useWatchListStore,
} from "../../../../zustand/useWatchlistStore";

const searchStocks = ({}) => {
  const [value, setValue] = useState("");
  const [options, setOptions] = useState([]);
  const [searchedStocks, setSearchedStocks] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const { activeWatchList } = useWatchListStore();

  const handleSelect = (value) => {
    console.log("select", value);
    const selectedStock = searchedStocks?.find((stock) => stock._id === value);
    console.log("SELECTED STOCK", selectedStock);
    addNewStock({
      watchlist: activeWatchList,
      stock: selectedStock?._source?.name,
    });

    setOptions([]);
    setValue("");
  };

  const handleSearch = async (searchText) => {
    if (searchText?.length > 2) {
      setIsSearching(true);
      const stocks = await getSearchedStocks(searchText);
      setIsSearching(false);
      const stocksName = stocks?.map((stock) => ({
        value: stock?._id,
        label: (
          <div>
            <div>{stock?._source?.name}</div>
            {/* <div>{stock?._id}</div> */}
            <div className="text-sm text-gray-600">
              {stock?._source?.exchange}
            </div>
          </div>
        ),
      }));
      console.log(stocksName);
      setOptions(stocksName);
    }

    setValue(searchText);
  };

  const getSearchedStocks = async (searchText) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_STOCKS_SEARCH}/search?q=${searchText}`
      );
      console.log(res.data);
      setSearchedStocks(res.data);
      return res.data;
    } catch (error) {
      console.error("Error while searching the stocks: ", error.message);
    }
  };
  const handleBlur = () => {
    setOptions([]); // Reset options when blurred
  };

  const loadComponent = {
    value: (
      <div className="text-center">
        <Spin size="small" />
      </div>
    ),
  };
  return (
    <div>
      <AutoComplete
        value={value}
        options={isSearching ? [loadComponent] : options}
        style={{ width: "100%" }}
        onSelect={handleSelect}
        onSearch={handleSearch}
        onBlur={handleBlur}
        // size="large"
        placeholder="Add Stocks"
      />
    </div>
  );
};

export default searchStocks;
