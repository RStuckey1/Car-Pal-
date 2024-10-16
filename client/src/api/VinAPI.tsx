import { useEffect, useState } from "react";
import axios from "axios";

const Carinfo = () => {
  interface Car {
    make: string;
    model: string;
    year: number;
  }
 
const apiKey = 'g5cv45t3z_dvjx3rpqu_jj7v19fdj';
const vin = 'WBAFR7C57CC811956';
  const [car, setCar] = useState<Car | null>(null);

  useEffect(() => {
    const fetchCarInfo = async () => {
      try {
        const { data } = await axios.get('https://api.carsxe.com/specs', {
          params: {
            key: apiKey,
            vin: vin
          }
        });
        setCar(data);
        console.log(data); // Use the data variable
      } catch (e) {
        console.error(e);
      }
    };

    fetchCarInfo();
  }, []);

  return (
    <div>
      {car ? (
        <div>
          <h1>{car.make} {car.model}</h1>
          <p>Year: {car.year}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Carinfo;