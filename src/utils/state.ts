import { create } from "zustand";

type UserStore = {
  id: string | null;
  isPartner: boolean;
  setId: (id: string | null) => void;
  setIsPartner: (isPartner: boolean) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  id: null,
  isPartner: false,
  setId: () => set((state) => ({ id: state.id })),
  setIsPartner: () => set((state) => ({ isPartner: state.isPartner })),
}));

type PlanStore = {
  id: string | null;
  toFlight: string | null;
  accommodation: string | null;
  fromFlight: string | null;
  eventId: string;
  setId: (id: string | null) => void;
  setToFlight: (toFlight: string | null) => void;
  setAccommodation: (accommodation: string | null) => void;
  setFromFlight: (fromFlight: string | null) => void;
  setEventId: (eventId: string) => void;
};

export const usePlanStore = create<PlanStore>((set) => ({
  id: null,
  toFlight: null,
  accommodation: null,
  fromFlight: null,
  eventId: "",
  setId: (id) => set({ id }),
  setToFlight: (toFlight) => set({ toFlight }),
  setAccommodation: (accommodation) => set({ accommodation }),
  setFromFlight: (fromFlight) => set({ fromFlight }),
  setEventId: (eventId) => set({ eventId }),
}));
