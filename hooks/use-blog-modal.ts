import { create } from 'zustand';

interface Props{
  isOpen: boolean;
  venues: any;
  onOpen: () => void;
  onClose: () => void;
  setVenues: (venues:any) => void;
}

const useBlogModal = create<Props>((set) => ({
  isOpen: false,
  venues: '',
  setVenues: (venues) => set({venues: venues}),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));

export default useBlogModal;