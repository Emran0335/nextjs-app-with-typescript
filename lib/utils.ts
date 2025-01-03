import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import qs from "qs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ERROR HANDlER
export const handleError = (error: unknown) => {
  if (error instanceof Error) {
    console.log(error.message);
    throw new Error(`Error: ${error.message}`);
  } else if (typeof error === "string") {
    console.log(error);
    throw new Error(`Error: ${error}`);
  } else {
    console.log(error);
    throw new Error(`Unknown error: ${JSON.stringify(error)}`);
  }
};

// PLACEHOLDER LOADER - while image is transforming
const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#7986ac" offset="20%" />
      <stop stop-color="#68769e" offset="50%" />
      <stop stop-color="#7986ac" offset="100%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#7986ac" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite" /> 
</svg>`;

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);
export const dataUrl = `data:image/svg+xml;base64,${toBase64(
  shimmer(1000, 1000)
)}`;

// FORM URL QUERY
export const formUrlQuery = ({
  searchParams,
  key,
  value,
}: FormUrlQueryParams) => {
  const params = { ...qs.parse(searchParams.toString()), [key]: value };
  return `${window.location.pathname}?${qs.stringify(params, {
    skipNulls: true,
  })}}`;
};