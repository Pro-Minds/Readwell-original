import React, { useEffect, useState } from 'react';
import { fetchData } from './apiService';

const App = () => {
  const [data, setData] = useState('');

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchData();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getData();
  }, []);

  return (
      <div>
        <h1>Data from Spring Boot:</h1>
        <p>{data}</p>
      </div>
  );
};

export default App;