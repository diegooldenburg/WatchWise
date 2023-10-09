import React, { useState, useEffect } from "react";

export interface Media {
  title?: string;
  name?: string;
  id: number;
  poster_path: string | null;
  release_date: string;
  first_air_date?: string;
}

interface ListComponentProps {
  listName: string;
  list: Media[];
  addItemToList: (item: Media) => void;
}

const ListComponent: React.FC<ListComponentProps> = ({
  listName,
  list,
  addItemToList,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
  const [suggestions, setSuggestions] = useState<Media[]>([]);

  useEffect(() => {
    if (searchTerm === "") {
      setSuggestions([]);
      return;
    }

    const search = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/multi?query=${searchTerm}&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        );
        const data = await response.json();

        let results = data.results
          .filter((item: any) => item.media_type !== "person")
          .map((item: any) => ({
            title: item.title || item.name,
            id: item.id,
            poster_path: item.poster_path,
            release_date: item.release_date || item.first_air_date,
          }));

        results = results.filter(
          (item: Media) =>
            (item.title || item.name) &&
            (item.title || item.name || "").trim() !== ""
        );

        // Limit the results to 5 and update the suggestions
        setSuggestions(results.slice(0, 5));
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    search();
  }, [searchTerm]);

  const addToTheList = () => {
    if (selectedMedia) {
      addItemToList(selectedMedia);
      setSearchTerm("");
      setSelectedMedia(null);
    }
  };

  const selectSuggestion = (media: Media) => {
    setSearchTerm(media.title || media.name || "");
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
                className="px-4 py-2 cursor-pointer hover:bg-gray-200 flex items-center"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  alt={item.title || item.name || ""}
                  className="w-10 h-10 object-cover mr-2"
                />
                {item.title || item.name || ""}{" "}
                <span className="text-gray-500">
                  (
                  {(item.release_date || item.first_air_date || "").substring(
                    0,
                    4
                  )}
                  )
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="grid grid-cols-3 gap-4 mt-8">
        {list.map((item, index) => (
          <div key={index} className="card">
            <img
              src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
              alt={item.title || item.name || ""}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h2 className="font-bold">{item.title || item.name}</h2>
              <p className="text-sm text-gray-500">
                {(item.release_date || item.first_air_date || "").substring(
                  0,
                  4
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListComponent;
