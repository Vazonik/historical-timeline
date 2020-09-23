import React, { createRef, useState } from 'react';

function Periods({ periods, width, height, fullLength, getUnitsOnFocus}) {
  let rootDivRef = createRef();

  let [zoomMultiplier, setZoomMultiplier] = useState(1);
  let [focusPosition, setFocusPosition] = useState(0);
  let [offset, setOffset] = useState(0);

  const timelineWidth = width * zoomMultiplier;
  const unitsPerPixel = fullLength / timelineWidth;

  let mouseClick = e => {
    const newFocusPosition = e.pageX - rootDivRef.current.getBoundingClientRect().left;
    setFocusPosition(newFocusPosition);
    getUnitsOnFocus(unitsPerPixel * (newFocusPosition - offset));
  }

  let zoom = e => {
    const zoomExplanation = 0.05;

    let newZoom = zoomMultiplier + e.deltaY * -zoomExplanation;

    if (newZoom < 1) {
      newZoom = 1;
    }
    
    const zoomSnippet = zoomExplanation * focusPosition * e.deltaY;
    let newOffset = (focusPosition - offset - zoomSnippet) * ((zoomMultiplier / newZoom) - 1) + offset;
    
    if(newOffset > 0) {
      newOffset = 0;
    }

    if(newOffset > timelineWidth) {
      newOffset = timelineWidth
    }

    setOffset(newOffset);
    setZoomMultiplier(newZoom);
  }

  return (
    <div
      style={{
        width: width,
        height: height=80,
        border: '1px solid black', 
        overflow: 'hidden',
        position: 'relative',
        cursor: 'pointer'
      }}
      ref={rootDivRef}
      onMouseMove={mouseClick}
      onWheel={zoom}
    >
      <div
        style={{
          whiteSpace: 'nowrap',
          position: 'relative',
          left: offset
        }}
      >
      {
        periods.map((periodsGroup, groupIndex) => 
        <div
          style={{height: height / 2, width: timelineWidth}}
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
      <div style={{position: 'absolute', width: 1, backgroundColor: 'black', top: -5, bottom: -5, left: focusPosition}}></div>
    </div>
  );
}

export default Periods;