interface VinDecodeResult {
  make: string;
  model: string;
  year: number | null;
}

interface VinApiResult {
  Variable: string;
  Value: string | null;
}

interface VinApiResponse {
  Results: VinApiResult[];
}

const decodeVin = async (vin: string): Promise<VinDecodeResult> => {
  const normalizedVin = vin.trim().toUpperCase();

  if (!/^[A-HJ-NPR-Z0-9]{17}$/.test(normalizedVin)) {
    throw new Error('Enter a valid 17-character VIN.');
  }

  const response = await fetch(
    `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/${encodeURIComponent(normalizedVin)}?format=json`,
  );

  if (!response.ok) {
    throw new Error(`VIN lookup failed (${response.status}).`);
  }

  const data = (await response.json()) as VinApiResponse;
  const getValue = (variable: string) =>
    data.Results.find((result) => result.Variable === variable)?.Value?.trim() ?? '';
  const make = getValue('Make');
  const model = getValue('Model');
  const yearValue = getValue('Model Year');
  const year = yearValue && /^\d{4}$/.test(yearValue) ? Number(yearValue) : null;

  if (!make || !model) {
    throw new Error('The VIN lookup did not return a make and model.');
  }

  return { make, model, year };
};

export default decodeVin;
