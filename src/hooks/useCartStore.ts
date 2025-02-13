import { useStore } from "zustand";
import cartStore from "@/store/cartStore";

const useCartStore = (p0: (state: any) => any) => useStore(cartStore);

export default useCartStore;
