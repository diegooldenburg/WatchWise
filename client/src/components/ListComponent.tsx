import React, { useState } from "react";

interface Media {
  title: string;
  id: number;
}

const ListComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [list, setList] = useState<Media[]>([]);

  const search = async () => {
    // Call the TMDB API to search for the movie
    const movieResponse = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${searchTerm}`
    );
    const movieData = await movieResponse.json();

    // Call the TMDB API to search for the TV show
    const tvResponse = await fetch(
      `https://api.themoviedb.org/3/search/tv?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${searchTerm}`
    );
    const tvData = await tvResponse.json();

    // Combine the results
    const results = [...movieData.results, ...tvData.results];

    // Add the first result to the list
    if (results.length > 0) {
      setList((prevList) => [...prevList, results[0]]);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={search}>Add to list</button>
      <ul>
        {list.map((item, index) => (
          <li key={index}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default ListComponent;
