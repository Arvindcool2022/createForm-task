import { useState } from 'react';
import { SEGMENT_OPTIONS } from '../utils/contant';

const SelectSegment = ({ id, handleDelete, selectedCat, setSelectedCat }) => {
  const [circleColor, setCircleColor] = useState('');

  const disabledCat = (obj => {
    const newCategory = { ...obj };
    delete newCategory[id];

    return Object.values(newCategory).reduce((acc, cv) => {
      acc.push(cv.id);
      return acc;
    }, []);
  })(selectedCat);

  return (
    <div className="selection-grp">
      <div className={`circle ${circleColor}`} />
      <select
        onChange={e => {
          if (e.target.selectedIndex) {
            const [selectedObj] = SEGMENT_OPTIONS.filter(x =>
              Object.values(x).includes(e.target.value)
            );

            setSelectedCat(p => ({ ...p, [id]: selectedObj }));

            const color = selectedObj.isGroupTrait ? 'red' : 'green';
            setCircleColor(color);
          } else setCircleColor('');
        }}
      >
        <option key={'default'} value={null}>
          Add schema to segment
        </option>
        {SEGMENT_OPTIONS.map(x => (
          <option
            key={x.id}
            value={x.Value}
            disabled={disabledCat.includes(x.id)}
          >
            {x.Label}
          </option>
        ))}
      </select>
      <button onClick={() => handleDelete(id)}>-</button>
    </div>
  );
};

export default SelectSegment;
