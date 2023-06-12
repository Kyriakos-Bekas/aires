export type FlightFairResultAirport = {
  time: string;
  code: string;
  tz: string;
  timeZone: string;
  type: string;
  label: string;
  country: {
    label: string;
    code: string;
  };
  city: string;
};

type Baggage = {
  cabin: {
    allowance: number;
    qty: number | string;
    unit: string | null;
    text: string;
  };
  checkIn: {
    allowance: number;
    qty: number | string;
    unit: string | null;
    text: string;
    refNumber: number;
  };
};

export type FlightFairResult = {
  id: string;
  careerCode: string;
  flight_code: string;
  flight_name: string;
  stops: string;
  cabinType: string;
  baggage: Baggage | null;
  currency: string;
  departureAirport: FlightFairResultAirport;
  arrivalAirport: FlightFairResultAirport;
  path: string[];
  duration: {
    text: string;
    value: number;
  };
  stopSummary: Record<
    number,
    {
      stopDuration: number;
      airport: string;
    }
  >;
  totals: {
    currency: string;
    baggage: unknown;
    penalty: unknown;
    total: number;
    tax: number;
    base: number;
  };
};

export type AirportSimplifed = {
  time: string;
  code: string;
  label: string;
  city: string;
  country: string;
};

export type FlightFairResponse = {
  status: number;
  searchData: {
    from: string;
    to: string;
    date: Date;
    type: string;
    adult: number;
    child: number;
    infant: number;
    currency: string;
  };
  results: FlightFairResult[];
};

export type FlightSimplified = {
  id: string;
  flight_code: string;
  flight_name: string;
  stops: string;
  cabinType: string;
  baggage: Baggage | null;
  currency: string;
  departureAirport: AirportSimplifed;
  arrivalAirport: AirportSimplifed;
  duration: string;
  stopSummary: Record<
    number,
    {
      stopDuration: number;
      airport: string;
    }
  >;
  totals: {
    currency: string;
    total: number;
    tax: number;
    base: number;
  };
};
