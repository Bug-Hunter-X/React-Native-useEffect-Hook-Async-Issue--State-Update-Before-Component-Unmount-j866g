```javascript
import React, { useState, useEffect } from 'react';

const MyComponent = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  let controller = null;

  useEffect(() => {
    controller = new AbortController();
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.example.com/data', {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        if (error.name !== 'AbortError') {
          setError(error);
        }
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, []);

  if (error) {
    return <p>Error: {error.message}</p>;
  }
  if (data === null) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {/* Render data here */}
    </div>
  );
};

export default MyComponent;
```