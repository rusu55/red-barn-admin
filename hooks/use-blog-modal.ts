import { create } from 'zustand';

const useBlogModal = create((set) => ({
  isOpen: true,
  onOpen: () => set((state) => ({ isOpen: true })),
  onClose: () => set((state) =>({ isOpen: false }))
}));

export default useBlogModal;