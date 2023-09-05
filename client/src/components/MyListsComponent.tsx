import React from "react";
import Link from "next/link";

const MyListsComponent = () => {
  const currentMonth = new Date().getMonth();
  const nextMonth = (currentMonth + 1) % 12;
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const lists = [monthNames[nextMonth]];

  return (
    <div className="flex justify-between bg-primary p-6 fixed">
      <ul className="">
        {lists.map((list, index) => (
          <li
            key={index}
            className="flex justify-between items-center bg-secondary text-white rounded-lg m-2 p-2 h-16 w-screen"
          >
            <Link href={`/list/${list}`}>{list}</Link>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 12 12"
              fill="white"
              className="h-8 w-8"
            >
              <path d="M6,3 C6.27614237,3 6.5,2.77614237 6.5,2.5 C6.5,2.22385763 6.27614237,2 6,2 C5.72385763,2 5.5,2.22385763 5.5,2.5 C5.5,2.77614237 5.72385763,3 6,3 Z" />
              <path d="M6,6.5 C6.27614237,6.5 6.5,6.27614237 6.5,6 C6.5,5.72385763 6.27614237,5.5 6,5.5 C5.72385763,5.5 5.5,5.72385763 5.5,6 C5.5,6.27614237 5.72385763,6.5 6,6.5 Z" />
              <path d="M6,10 C6.27614237,10 6.5,9.77614237 6.5,9.5 C6.5,9.22385763 6.27614237,9 6,9 C5.72385763,9 5.5,9.22385763 5.5,9.5 C5.5,9.77614237 5.72385763,10 6,10 Z" />
            </svg>
          </li>
        ))}
        <li className="flex items-center bg-secondary text-white rounded-lg m-2 p-2 h-16 w-16">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-8 w-8 ml-2"
          >
            <line x1="12" y1="16" x2="12" y2="8" />
            <line x1="8" y1="12" x2="16" y2="12" />
          </svg>
        </li>
      </ul>
    </div>
  );
};

export default MyListsComponent;
