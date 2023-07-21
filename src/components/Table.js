import React, { useState } from 'react';
import '../App.css';
import { FiArrowUpCircle, FiArrowDownCircle } from 'react-icons/fi';
import * as Constant from '../utils/Constant';

const Table = (props) => {
    const {data, setData} = props;
    const [sortCol, setSortCol] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);

    function customSort(a, b) {
        return Constant.nameOrder[b] - Constant.nameOrder[a];
    };

    const handleClick = (col) => {
        setSortCol(col)
        if (col === sortCol)
            setSortOrder((sortOrder === 'asc' || sortOrder === null) ? 'desc' : 'asc');
        else
            setSortOrder('asc');
        const sortedData = data.sort((a, b) => {
            if(col === 'assetClass') 
                return sortOrder === 'asc' ? customSort(a.assetClass, b.assetClass) : customSort(b.assetClass, a.assetClass);
            else if(col === 'ticker')
                return sortOrder === 'asc' ? b[col].localeCompare(a[col]) : a[col].localeCompare(b[col]);
            else  
                return sortOrder === 'asc' ? b[col] - a[col] : a[col] - b[col];
        });
        setData([...sortedData]);
    };

    const getSortArrow = (col) => {
        if (col === sortCol) {
          return sortOrder === 'asc' ? <FiArrowUpCircle /> : <FiArrowDownCircle />;
        }
        return null;
    };

    return (
    <div className="table-container">
        <table>
            <thead>
                <tr>
                    <th onClick={() => handleClick('ticker')}>Ticker&nbsp;{getSortArrow('ticker')}</th>
                    <th onClick={() => handleClick('price')}>Price&nbsp;{getSortArrow('price')}</th>
                    <th onClick={() => handleClick('assetClass')}>Asset Class&nbsp;{getSortArrow('assetClass')}</th>
                </tr>
            </thead>
            <tbody>
                {data.map((a) => (
                <tr key={a.ticker} 
                style={a.assetClass === "Credit" ? {backgroundColor: "#97c294"} 
                : a.assetClass === "Equities" ? {backgroundColor : "#74b3e3"} 
                : {backgroundColor: "#ffffff"}}>
                    <td>{a.ticker}</td>
                    <td style={a.price < 0 ? {color: 'red'} : {color: 'black'}}>{a.price}</td>
                    <td>{a.assetClass}</td>
                </tr>
                ))}
            </tbody>
        </table>
    </div>
    );
}

export default Table;
