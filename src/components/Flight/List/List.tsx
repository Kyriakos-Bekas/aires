import { memo, useEffect, useState } from "react";
import { SelectableItem } from "~/components";
import { X } from "lucide-react";
import { api } from "~/utils/api";
import { usePlanStore } from "~/utils/state";
import { type UserData } from "~/components/Steps/Forms/ToEventFlightStepForm";
import { FlightListItem } from "./Item";
import { type FlightSimplified } from "~/utils/types";

const ToEventFlightListWrapper = ({ userData }: { userData: UserData }) => {
  const [selectedFlight, setSelectedFlight] = useState<string | null>(
    userData.userLocation === userData.postLocation
      ? JSON.stringify({ id: "location-match" })
      : null
  );
  const { data, isLoading } = api.flight.getToFlights.useQuery(userData);
  const setToEventFlight = usePlanStore((state) => state.setToFlight);

  useEffect(() => {
    setToEventFlight(selectedFlight);
  }, [selectedFlight, setToEventFlight]);

  if (isLoading)
    return (
      <div className="my-8 text-center text-sm md:text-base">Loading...</div>
    );
  if (!data) return null;

  const { flights, message } = data;

  if (!flights.length)
    return (
      <div className="my-8 text-center md:text-lg">
        <p>{message}</p>
      </div>
    );

  if (userData.postLocation === userData.userLocation) {
    return (
      <div className="my-8 text-center">
        <p>{`You are already in ${userData.postLocation}. No need to fly!`}</p>
      </div>
    );
  }

  return (
    <FlightListMemoized
      flights={flights}
      selectedFlight={selectedFlight}
      onSelected={(flightAsJson) => setSelectedFlight(flightAsJson)}
      onClearSelection={() => setSelectedFlight(null)}
    />
  );
};

const FromEventFlightListWrapper = ({ userData }: { userData: UserData }) => {
  const [selectedFlight, setSelectedFlight] = useState<string | null>(
    userData.userLocation === userData.postLocation
      ? JSON.stringify({ id: "location-match" })
      : null
  );
  const { data, isLoading } = api.flight.getToFlights.useQuery(userData);
  const setFromEventFlight = usePlanStore((state) => state.setFromFlight);

  useEffect(() => {
    setFromEventFlight(selectedFlight);
  }, [selectedFlight, setFromEventFlight]);

  if (isLoading)
    return (
      <div className="my-8 text-center text-sm md:text-base">Loading...</div>
    );
  if (!data) return null;

  const { flights, message } = data;

  if (!flights.length)
    return (
      <div className="my-8 text-center md:text-lg">
        <p>{message}</p>
      </div>
    );

  if (userData.postLocation === userData.userLocation) {
    setSelectedFlight("location-match");
    return (
      <div className="my-8 text-center">
        <p>{`You are already in ${userData.postLocation}. No need to fly!`}</p>
      </div>
    );
  }

  return (
    <FlightListMemoized
      flights={flights}
      selectedFlight={selectedFlight}
      onSelected={(flightAsJson) => setSelectedFlight(flightAsJson)}
      onClearSelection={() => setSelectedFlight(null)}
    />
  );
};

const FlightList = ({
  flights,
  selectedFlight,
  onSelected,
  onClearSelection,
}: {
  flights: FlightSimplified[];
  selectedFlight: string | null;
  onSelected: (flightAsJson: string) => void;
  onClearSelection: () => void;
}) => {
  return (
    <div>
      <div className="flex items-end justify-between gap-6">
        <h2 className="shrink-0 text-lg font-medium">Flight List</h2>

        {selectedFlight && (
          <button
            className="mb-1 flex items-center gap-1 text-slate-400 transition-colors hover:text-slate-800"
            onClick={onClearSelection}
          >
            <X size={16} />
            <span className="text-xs">Clear selection</span>
          </button>
        )}
      </div>
      <ul>
        {flights.map((flight) => (
          <li key={flight.id}>
            <SelectableItem
              selected={
                flight.id ===
                (
                  JSON.parse(
                    selectedFlight ?? JSON.stringify({ id: "" })
                  ) as FlightSimplified
                ).id
              }
              onSelected={() => onSelected(JSON.stringify(flight))}
            >
              <FlightListItem flight={flight} />
            </SelectableItem>
          </li>
        ))}
      </ul>
    </div>
  );
};

const FlightListMemoized = memo(FlightList);

export {
  ToEventFlightListWrapper as ToEventFlightList,
  FromEventFlightListWrapper as FromEventFlightList,
};
