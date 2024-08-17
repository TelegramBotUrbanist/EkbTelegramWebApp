import React, { ChangeEvent } from 'react';
import './Search.scss';
interface SearchBarProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}
const SearchBar: React.FC = ({ value, onChange, placeholder = 'Поиск' }) => {
  return (
    <div className="search-bar--container">
      <div className="search-bar">
        <img className={"search-bar--img"} src={'public/search.svg'}/>
        <input type="text"  value={value}
               onChange={onChange}
               placeholder={placeholder} />
      </div>
    </div>
  );
};

export default SearchBar;
