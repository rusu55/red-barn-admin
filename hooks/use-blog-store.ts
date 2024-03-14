import { create } from 'zustand';

interface Props{
  info: []; 
  images: [];
  addInfo: () => void; 
}

const useBlogStore = create((set) => ({
  info: [],  
  images: [],
  addInfo: (data: any) => set({ info: [{
        title: data.title,
        description: data.description
  }]}),
  addImages: (data: any) => set((state) =>{
    images: [
        ...state.images,
        {data} 
    ]
  })
}));

export default useBlogStore;