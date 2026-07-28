import { createContext, useState } from "react";

export const SongContext = createContext();

export const SongContextProvider = ({ children }) => {
  const [song, setSong] = useState({
    url: "https://ik.imagekit.io/aashishOfficial/moodify/songs/Tera_Hone_Laga_Hoon_aTprA_Ebo.mp3",
    posterUrl:
      "https://ik.imagekit.io/aashishOfficial/moodify/posters/Tera_Hone_Laga_Hoon_ibw1gtrD9.jpeg",
    title: "Tera Hone Laga Hoon",
    mood: "happy",
  });

  const [loading, setLoading] = useState(false);

  return (
    <SongContext.Provider value={{song, setSong, loading, setLoading}}>
        {children}
    </SongContext.Provider>
  )
};
