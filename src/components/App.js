import React from 'react';
import HistoricalTimeline from './HistoricalTimeline';
import data from '../config/historicalData';

function App() {
  return (
    <HistoricalTimeline
      data={data}
    />
  );
}

export default App;
