import "./search.css";
import { useState } from "react";
export default function SearchComponent({ data }) {
  const myOptions = data.myOptions; 
  const searchVisible = data.searchVisible;
  console.log("myOptions == ", myOptions);
  return (
    <div className="searchDataList">
      {searchVisible && myOptions !== 0 
        ? myOptions.map((option) => <div key={option} className="searchDataItem">
          {option}
        </div>)
        : null}
    </div>
  );
}
