import React, { useState } from 'react';
import Periods from './Periods';

function HistoricalTimeline({ data, width=1800 }) {

  let [focus, setFocus] = useState(0);

  return (
    <div>
      <Periods
        periods={data.periods}
        width={width}
        fullLength={data.length}
        getUnitsOnFocus={units => setFocus(units)}
      />
      <div style={{padding: 10}}>{Math.round(focus - data.benchmark)} {data.unitName}</div>
    </div>
    
  );
}

export default HistoricalTimeline;