import { createContext, useReducer } from "react";
export const Store = createContext();

const initialState = {
  playlist: {
    playlistItems: localStorage.getItem("playlistItems")
      ? JSON.parse(localStorage.getItem("playlistItems"))
      : [{"_id":"65ad98c3cd1ebc0d22242316","name":"Satranga","slug":"satranga","image":"https://c.saavncdn.com/092/ANIMAL-Hindi-2023-20231124191036-","artist":"Arijit Singh","audio":"https://aac.saavncdn.com/092/d678d7ca0a158567bbddc6a10eb2f490_160.mp4","createdAt":"2024-01-21T22:20:51.869Z","updatedAt":"2024-01-21T22:20:51.869Z","__v":0},{"_id":"65ad98aecd1ebc0d22242314","name":"O Soniye","slug":"o-soniye","image":"https://c.saavncdn.com/996/Titoo-M-B-A--Hindi-2018-20201102152542-","artist":"Arijit Singh","audio":"https://aac.saavncdn.com/996/6040818922819fb01e305a90a2a93be8_160.mp4","createdAt":"2024-01-21T22:20:30.617Z","updatedAt":"2024-01-21T22:20:30.617Z","__v":0},{"_id":"65ad9953cd1ebc0d2224231e","name":"Mere Humsafar","slug":"mere-humsafar","image":"https://c.saavncdn.com/352/Mere-Humsafar-Original-Score-Female-Version--Urdu-2022-20220108184735-","artist":"Yashal Shahid","audio":"https://aac.saavncdn.com/352/57a0d82600b13121d9f0392aed4346e0_160.mp4","createdAt":"2024-01-21T22:23:15.407Z","updatedAt":"2024-01-21T22:23:15.407Z","__v":0},{"_id":"65ad98ebcd1ebc0d2224231a","name":"Ram Siya Ram","slug":"ram-siya-ram","image":"https://c.saavncdn.com/972/Adipurush-Hindi-2023-20230607184755-","artist":"Sachet Tandon","audio":"https://aac.saavncdn.com/972/b3c1747f9507110bf6ba8f11d6705ec5_160.mp4","createdAt":"2024-01-21T22:21:31.733Z","updatedAt":"2024-01-21T22:21:31.733Z","__v":0},{"_id":"65ad97decd1ebc0d2224230a","name":"Kesariya","slug":"kesariya","image":"https://c.saavncdn.com/871/Brahmastra-Original-Motion-Picture-Soundtrack-Hindi-2022-20221006155213-","artist":"Arijit Singh","audio":"https://aac.saavncdn.com/871/c2febd353f3a076a406fa37510f31f9f_160.mp4","createdAt":"2024-01-21T22:17:02.593Z","updatedAt":"2024-01-21T22:17:02.593Z","__v":0},{"_id":"65b04bdb0989a01fde4f2bba","name":"Rasiya","slug":"rasiya","image":"https://c.saavncdn.com/721/Rasiya-Arijit-Singh-Trending-Version-Hindi-2023-20230510123323-","artist":"Pritam, Arijit Singh, Amitabh Bhattacharya","audio":"https://aac.saavncdn.com/871/adc852f9b398ef7c6c406199611f20fd_160.mp4","createdAt":"2024-01-23T23:29:31.730Z","updatedAt":"2024-01-23T23:29:31.730Z","__v":0}],
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


    case "PLAYLIST_REMOVE_ITEM": 
      const playlistItems = state.playlist.playlistItems.filter(
        (item) => item._id !== action.payload._id
      );
      localStorage.setItem("playlistItems", JSON.stringify(playlistItems));
      return { ...state, playlist: { ...state.playlist, playlistItems } };
    
    // case "PLAYLIST_CLEAR": 
    //   return { ...state, playlist: { ...state.playlist, playlistItems: [] } };
    
    case "USER_SIGNIN": 
      // console.log(`action.payload = ${JSON.stringify(action.payload)}`);
      return { ...state, userInfo: action.payload };
    
    case "USER_SIGNOUT": 
      return {
        ...state,
        userInfo: null,
        playlist: {
          playlistItems: localStorage.getItem("playlistItems")
            ? JSON.parse(localStorage.getItem("playlistItems"))
            : [],
        },
      };
    
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
