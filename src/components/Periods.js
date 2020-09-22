import React, { createRef, useState } from 'react';

function Periods({ periods, width, fullLength, getUnitsOnFocus}) {
  let rootDivRef = createRef();

  let [zoomMultiplier, setZoomMultiplier] = useState(1);
  let [focusPosition, setFocusPosition] = useState(0);

  const timelineWidth = width * zoomMultiplier;
  const unitsPerPixel = fullLength / timelineWidth;

  let mouseClick = e => {
    const newFocusPosition = e.pageX - rootDivRef.current.getBoundingClientRect().left;
    setFocusPosition(newFocusPosition);
    getUnitsOnFocus(unitsPerPixel * newFocusPosition);
    console.log(newFocusPosition);
  }

  let zoom = e => {
    let newZoom = zoomMultiplier + e.deltaY * -0.001;
    if (newZoom < 1) {
      newZoom = 1;
    }
    setZoomMultiplier(newZoom);
  }

  return (
    <div
      ref={rootDivRef}
      onClick={mouseClick}
      onWheel={zoom}
      style={{
        whiteSpace: 'nowrap',
        position: 'relative',
        cursor: 'pointer'
      }}
    >
      <div style={{position: 'absolute', width: 1, backgroundColor: 'black', top: -5, bottom: -5, left: focusPosition}}></div>
    {
      periods.map((periodsGroup, groupIndex) => 
      <div
        style={{height: 20, width: timelineWidth}}
        key={`pg-${groupIndex}`}
      >
      {
        periodsGroup.map(period =>
        <div
        style={{
          height: '100%',
          width: `${period.length / fullLength * 100}%`,
          backgroundColor: period.color,
          display: 'inline-block',
        }}
          key={period.key}
        ></div>
        )
      }
      </div>
      )}
    </div>
  );
}

export default Periods;