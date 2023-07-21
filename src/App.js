import React, { useEffect, useState } from 'react';
import Table from './components/Table';
import dataSet from './sampleData.json';
import "./App.css";

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await new Promise((resolve) => {setTimeout(() => resolve(dataSet), 1000);});
        console.log(response)
        setData(response);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="loader">Loading Table...</div>
      ) : (data ?
        <Table data={data} setData={setData} /> : null
      )}
    </div>
  );
}

export default App;
