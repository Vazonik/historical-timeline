import React, { useState } from 'react';

function HistoricalTimeline({ data, width=1000 }) {
  let [zoomMultiplier, setZoomMultiplier] = useState(1);

  let zoom = (e) => {
    let newZoom = zoomMultiplier + zoomMultiplier * e.deltaY * -0.01;
    if(newZoom >= 1) {
      setZoomMultiplier(newZoom)
    } else if (newZoom < 1) {
      setZoomMultiplier(1);
    }
  }

  const unitSize = width / data.length;
  const timelineWidth = width * zoomMultiplier;

  return (
    <div onWheel={zoom} style={{width: width, height: 40, padding: 40, border: '1px solid black', overflow: 'hidden', position: 'relative'}}>
      <div style={{whiteSpace: 'nowrap', position: 'absolute'}}>
      {
      data.periods.map(periodsGroup => 
        <div style={{height: 20, width: timelineWidth}}>
          {
            periodsGroup.map(period =>
              <div
              style={{
                height: '100%',
                width: period.length * unitSize * zoomMultiplier,
                backgroundColor: period.color,
                display: 'inline-block'
              }}
              key={period.key}
              ></div>
            )
          }
        </div>
      )}
      </div>
    </div>
  );
}

export default HistoricalTimeline;