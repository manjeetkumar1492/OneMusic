import { createContext, useReducer } from "react";
export const Store = createContext();

const initialState = {
  playlist: {
    playlistItems: localStorage.getItem("playlistItems")
      ? JSON.parse(localStorage.getItem("playlistItems"))
      : [],
  },
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  currentTrack: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "PLAYLIST_ADD_ITEM":
  const newItem = action.payload;
  const updatedPlaylistItems = [...state.playlist.playlistItems, newItem];

  localStorage.setItem("playlistItems", JSON.stringify(updatedPlaylistItems));
  return { ...state, playlist: { ...state.playlist, playlistItems: updatedPlaylistItems } };


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
    case "USER_SIGNIN": {
      return { ...state, userInfo: action.payload };
    }
    case "USER_SIGNOUT": {
      return {
        ...state,
        userInfo: null,
        playlist: {
          playlistItems: localStorage.getItem("playlistItems")
            ? JSON.parse(localStorage.getItem("playlistItems"))
            : [],
        },
      };
    }
    case 'SET_CURRENT_TRACK': {
      const updatedState = { ...state, currentTrack: action.payload };
      localStorage.setItem('musicPlayerState', JSON.stringify(updatedState));
      return updatedState;
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
