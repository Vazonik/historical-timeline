import React, { useState } from 'react';
import Periods from './Periods';

function HistoricalTimeline({ data, width=1000 }) {

  let [focus, setFocus] = useState(0);

  return (
    <div>
      <div
        style={{width: width, height: 40, border: '1px solid black', overflow: 'hidden'}}      
      >
        <Periods
          periods={data.periods}
          width={width}
          fullLength={data.length}
          getUnitsOnFocus={units => setFocus(units)}
        />
      </div>
      <div style={{padding: 10}}>{data.length - Math.round(focus)} mln lat temu</div>
    </div>
    
  );
}

export default HistoricalTimeline;