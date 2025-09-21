
import { http } from "viem";
import { baseSepolia } from "viem/chains";
export const chainArray = [baseSepolia];

export const transportsObject = {
  [baseSepolia.id]: http(),
};
