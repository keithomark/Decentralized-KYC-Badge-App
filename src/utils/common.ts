import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const shortenAddress = (address: string, startLength = 6, endLength = 4) => {
  return `${address.slice(0, startLength)}...${address.slice(-endLength)}`;
};

export const cardStyles = "w-full max-w-md mx-auto border-web3-border bg-card/50 backdrop-blur-sm";
export const buttonStyles = "w-full bg-gradient-to-r from-web3-primary to-web3-secondary hover:from-web3-primary/90 hover:to-web3-secondary/90 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-105";
export const outlineButtonStyles = "w-full border-web3-border hover:bg-web3-primary/10"; 