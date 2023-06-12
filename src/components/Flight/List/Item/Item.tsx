import { memo } from "react";
import { format } from "date-fns";
import { Briefcase, Dot, Luggage, Plane } from "lucide-react";
import { type FlightSimplified as Flight } from "~/utils/types";

const FlightListItem = ({ flight }: { flight: Flight }) => {
  const {
    stops,
    flight_name,
    flight_code,
    duration,
    departureAirport,
    arrivalAirport,
    totals,
    cabinType,
    baggage,
  } = flight;

  return (
    <div className="text-left">
      <div>
        <div className="mb-6 flex items-center justify-start">
          <div className="flex items-center">
            <h3 className="text-xl font-medium">{`Flight ${flight_code}`}</h3>
            <span className="ml-4">{`by ${flight_name}`}</span>
          </div>

          <span className="ml-auto">
            <span className="text-xl">{totals.total.toFixed(2)}</span>{" "}
            {totals.currency}
          </span>
        </div>

        <div className="after:border-sate-600 relative my-3 flex items-start justify-between gap-2 text-sm after:absolute after:left-0 after:top-3 after:z-0 after:w-full after:border-t-2 after:border-dashed">
          <span className="z-10 flex flex-col gap-1">
            <span className="max-w-max bg-white text-xl font-medium">
              {format(new Date(departureAirport.time), "HH:mm")}
            </span>
            <span className="mt-1">
              {format(new Date(departureAirport.time), "dd MMM yyyy")}
            </span>
            <span>{departureAirport.label}</span>
            <span>{departureAirport.code}</span>
          </span>
          <div className="z-10 grid grid-cols-1 gap-2">
            <span className="flex items-center gap-3 rounded-full bg-slate-500 p-1 px-2 text-slate-100">
              <Plane className="rotate-45" size={20} />
              {!!stops && <span>{stops}</span>}
            </span>
            <span className="text-center">{duration}</span>
          </div>
          <span className="z-10 grid grid-cols-1 gap-1 text-right">
            <span className="ml-auto max-w-max bg-white text-xl font-medium">
              {format(new Date(arrivalAirport.time), "HH:mm")}
            </span>
            <span className="mt-1">
              {format(new Date(arrivalAirport.time), "dd MMM yyyy")}
            </span>
            <span>{arrivalAirport.label}</span>
            <span>{arrivalAirport.code}</span>
          </span>
        </div>

        <div className="mt-2 flex items-center gap-1 text-sm">
          <span className="">{cabinType}</span>
          {!!baggage && (
            <>
              <Dot size={16} />
              <div className="flex items-center gap-2">
                <span>Baggage: </span>
                <span>
                  <Briefcase size={16} className="mr-1 inline-block" />
                  {`${baggage.cabin.qty} x ${baggage.cabin.text}`}
                </span>
                <span>
                  <Luggage size={16} className="mr-1 inline-block" />
                  {baggage.checkIn.text}
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(FlightListItem);
