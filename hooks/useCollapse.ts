import { create } from "zustand";

interface useCollapseProps {
  isCollapse: boolean;
  setIsCollapse: (status: boolean) => void;
}
const useCollapse = create<useCollapseProps>((set) => ({
  isCollapse: false,
  setIsCollapse: (status: boolean) => set({ isCollapse: status }),
}));

export default useCollapse;
