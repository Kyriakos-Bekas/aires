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
