import React from "react";
import Link from "next/link";

const MyListsComponent = () => {
  const lists = ["September", "October", "November"]; // Replace this with actual data

  return (
    <div>
      <h1>My Lists</h1>
      <ul>
        {lists.map((list, index) => (
          <li key={index}>
            <Link href={`/list/${list}`}>{list}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyListsComponent;
