export type PublicEnv = {
  SITE_NAME: string;
  USE_MOCK_DATA: boolean;
};

const env: PublicEnv = {
  SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME || "NPS Tool",
  USE_MOCK_DATA: process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true",
};

export default env