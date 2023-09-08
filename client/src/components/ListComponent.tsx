import React, { useState, useEffect } from "react";

interface Media {
  title: string;
  id: number;
}

interface ListComponentProps {
  listName: string;
}

const ListComponent: React.FC<ListComponentProps> = ({ listName }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
  const [list, setList] = useState<Media[]>([]);
  const [suggestions, setSuggestions] = useState<Media[]>([]);

  useEffect(() => {
    // Fetch the items of the list here
  }, [listName]);

  useEffect(() => {
    if (searchTerm === "") {
      setSuggestions([]);
      return;
    }

    const search = async () => {
      // Call the TMDB API to search for the movie
      const movieResponse = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&api_key=${process.env.REACT_APP_TMDB_API_KEY}`
      );
      const movieData = await movieResponse.json();

      // Call the TMDB API to search for the TV show
      const tvResponse = await fetch(
        `https://api.themoviedb.org/3/search/tv?query=${searchTerm}&api_key=${process.env.REACT_APP_TMDB_API_KEY}`
      );
      const tvData = await tvResponse.json();

      // Combine the results
      const results = [...movieData.results, ...tvData.results];

      // Update the suggestions
      setSuggestions(results);
    };

    search();
  }, [searchTerm]);

  const addToTheList = () => {
    if (selectedMedia) {
      setList((prevList) => [...prevList, selectedMedia]);
      setSearchTerm("");
      setSelectedMedia(null);
    }
  };

  const selectSuggestion = (media: Media) => {
    setSearchTerm(media.title);
    setSelectedMedia(media);
    setSuggestions([]);
  };

  return (
    <div className="flex items-center">
      <div className="absolute top-[120px] left-1/2 transform -translate-x-1/2 w-96">
        <input
          className="px-2 py-1 border rounded"
          placeholder="Search"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={addToTheList}
          className="text-sm px-4 py-2 leading-none border rounded text-black bg-primary-button border-transparent hover:bg-primary-button-hover mt-4 lg:mt-0 ml-2"
        >
          Add to list
        </button>
        {suggestions.length > 0 && (
          <ul className="absolute bg-white w-full rounded mt-2 border border-gray-200 divide-y divide-gray-100">
            {suggestions.map((item, index) => (
              <li
                key={index}
                onClick={() => selectSuggestion(item)}
                className="px-4 py-2 cursor-pointer hover:bg-gray-200"
              >
                {item.title}
              </li>
            ))}
          </ul>
        )}
      </div>
      <ul>
        {list.map((item, index) => (
          <li key={index}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default ListComponent;
