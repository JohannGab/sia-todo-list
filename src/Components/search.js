import React from 'react';
import { Input } from 'antd';

const Search = ({onSearch}) => {
    return (
        <Input 
            onChange={(e) => onSearch(e.target.value)}
            placeholder="search Todo" 
        />
    )
}

export default Search;