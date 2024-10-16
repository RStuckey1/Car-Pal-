import { useState } from 'react';
import Navbar from './Navbar';

function MpgCalculator() {
  const [milesDriven, setMilesDriven] = useState(0);
  const [gallonsUsed, setGallonsUsed] = useState(0);
  const [mpg, setMpg] = useState(0);

  const calculateMpg = () => {
    if (gallonsUsed > 0) {
      setMpg(milesDriven / gallonsUsed);
    }
  };

  return (
    <div>
      <Navbar />
      <h2>MPG Calculator</h2>
      <label>
        Miles Driven: 
        <input 
          type="number" 
          value={milesDriven} 
          onChange={(e) => setMilesDriven(parseFloat(e.target.value))} 
        />
      </label>
      <label>
        Gallons Used: 
        <input 
          type="number" 
          value={gallonsUsed} 
          onChange={(e) => setGallonsUsed(parseFloat(e.target.value))} 
        />
      </label>
      <button onClick={calculateMpg}>Calculate MPG</button>
      {mpg > 0 && <p>MPG: {mpg.toFixed(2)}</p>}
    </div>
  );
}

export default MpgCalculator;