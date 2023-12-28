import { useEffect, useRef, useState } from 'react';
import SelectSegment from './SelectSegment';

const SideBar = ({ isOpen }) => {
  const sideBar = useRef(null);
  const [name, setName] = useState('');
  const [category, setCategory] = useState({ a: 1 });
  const [selectedCat, setSelectedCat] = useState({});

  // useEffect(() => {
  //   console.log(
  //     [...Object.values(selectedCat)].reduce((acc, cv) => {
  //       acc[cv.Value] = cv.Label;
  //       return acc;
  //     }, {})
  //   );
  // }, [selectedCat]);

  useEffect(() => {
    if (isOpen) {
      sideBar.current.style.transform = 'scaleX(1)';
      sideBar.current.style.opacity = '1';
    } else {
      sideBar.current.style.transform = 'scaleX(0)';
      sideBar.current.style.opacity = '0';
    }
  }, [isOpen]);

  const handleClick = e => {
    e.preventDefault();
    function addNewProperty(state) {
      const lastEntries = Math.max(...Object.values(state));
      const theKey = Array(lastEntries + 1)
        .fill('a')
        .join('');

      // console.log({ ...state, [theKey]: lastEntries + 1 });
      return { ...state, [theKey]: lastEntries + 1 };
    }
    setCategory(p => addNewProperty(p));
  };

  const handleDelete = KeyValue => {
    if ([...Object.values(category)].length <= 1) return;

    const deleteProperty = state => {
      const newState = { ...state };
      delete newState[KeyValue];
      return newState;
    };

    setCategory(p => deleteProperty(p));
    setSelectedCat(p => deleteProperty(p));
  };

  const sendData = () => {
    const schema = [...Object.values(selectedCat)].reduce((acc, cv) => {
      acc[cv.Value] = cv.Label;
      return acc;
    }, {});

    const segmentName = name.replaceAll(' ', '_');

    const output = { segment_name: segmentName, schema: schema };

    console.log(JSON.stringify(output));
  };

  return (
    <section ref={sideBar} className="side">
      <div>
        <h2 className="header">Side Bar</h2>
        <div className="form_wrapper">
          <label htmlFor="segment_name">Enter the Name of the Segment</label>
          <input
            type="text"
            id="segment_name"
            placeholder="Name of the segment"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <p>
            To save your segment, you need to add the schemas to build the query
          </p>
          <div className="trait-grp">
            <div className="trait">
              <div className="circle green" /> - User Traits
            </div>
            <div className="trait">
              <div className="circle red" /> - Group Traits
            </div>
          </div>
          <div>
            {[...Object.entries(category)].map(x => (
              <SelectSegment
                key={x[0]}
                id={x[0]}
                handleDelete={handleDelete}
                selectedCat={selectedCat}
                setSelectedCat={setSelectedCat}
              />
            ))}
            <a href="#" onClick={handleClick}>
              + Add new schema
            </a>
          </div>
        </div>
      </div>
      <div className="footer">
        <button className="save" onClick={sendData}>
          Save the Segment
        </button>
        <button>Cancel</button>
      </div>
    </section>
  );
};

export default SideBar;
