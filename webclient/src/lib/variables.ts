import packageJson from "../../package.json";

export const NAVBAR_HEIGHT = 52; // in pixels

export const APP_VERSION = packageJson.version;
export const APP_NAME = packageJson.displayName;

export const BASE_API = process.env.NEXT_PUBLIC_BASE_API;
