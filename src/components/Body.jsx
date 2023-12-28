import { useEffect, useRef, useState } from 'react';
import SideBar from './SideBar';

const Body = () => {
  const [open, setOpen] = useState(false);
  const bodyRef = useRef();

  useEffect(() => {
    if (open) bodyRef.current.style.backgroundColor = 'rgba(0,0,0,0.3)';
    else bodyRef.current.style.backgroundColor = 'rgba(0,0,0,0)';
  }, [open]);

  return (
    <section ref={bodyRef} className="body">
      <button onClick={() => setOpen(p => !p)}>Save Segment</button>
      <SideBar isOpen={open} bodyRef={bodyRef} />
    </section>
  );
};

export default Body;
