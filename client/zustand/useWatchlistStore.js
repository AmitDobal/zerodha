import { message } from "antd";
import axios from "axios";
import { create } from "zustand";

export const useWatchListStore = create((set) => ({
  watchLists: [],
  activeWatchList: "",
  updateWatchLists: (watchLists) => set({ watchLists }),
  updateActiveWatchList: (watchList) => set({ activeWatchList: watchList }),
  addWatchList: (newWatchList) =>
    set((state) => ({
      watchLists: [...state.watchLists, newWatchList],
    })),
  addStock: (title, stock) =>
    set((state) => ({
      watchLists: state.watchLists.map((watchList) =>
        watchList.title === title
          ? { ...watchList, stocks: [...watchList.stocks, stock] }
          : watchList
      ),
    })),
}));

export const fetchWatchLists = async () => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_WATHCLIST_URL}/watchlists/get`
    );
    useWatchListStore.getState().updateWatchLists(res.data);
  } catch (error) {
    console.error("Error while getting watch list data: ", error.message);
  }
};

export const addNewWatchList = async (body) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_WATHCLIST_URL}/watchlists/add`,
      body
    );
    useWatchListStore.getState().addWatchList(res.data);
    message.success("Watchlist added!");
  } catch (error) {
    console.error("Error while saving watch list: ", error.message);
    message.error("Watchlist Not added!");
  }
};

export const addNewStock = async (body) => {
  try {
    console.log("BODUY", body);
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_WATHCLIST_URL}/watchlists/addStock`,
      body
    );
    useWatchListStore.getState().addStock(body.watchlist, body.stock);
    message.success("Stock added!");
  } catch (error) {
    console.error("Error while saving stock: ", error.message);
    message.error("Stock Not added!");
  }
};
