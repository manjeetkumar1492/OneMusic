import { createContext, useReducer } from "react";
export const Store = createContext();

const initialState = {
  playlist: {
    playlistItems: localStorage.getItem("playlistItems")
      ? JSON.parse(localStorage.getItem("playlistItems"))
      : [],
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "PLAYLIST_ADD_ITEM":
  const newItem = action.payload;
  const playlistItems = [...state.playlist.playlistItems, newItem];
  localStorage.setItem("playlistItems", JSON.stringify(playlistItems));
  return { ...state, playlist: { ...state.playlist, playlistItems } };

    case "PLAYLIST_REMOVE_ITEM": {
      const playlistItems = state.playlist.playlistItems.filter(
        (item) => item._id !== action.payload._id
      );
      localStorage.setItem("playlistItems", JSON.stringify(playlistItems));
      return { ...state, playlist: { ...state.playlist, playlistItems } };
    }
    case "PLAYLIST_CLEAR": {
      return { ...state, playlist: { ...state.playlist, playlistItems: [] } };
    }
    default:
      return state;
  }
};

export const StoreProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // console.log(state);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children} </Store.Provider>;
};
