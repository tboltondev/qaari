const BASE_URL = 'https://api.carbonintensity.org.uk';

export type CarbonIntensityIndex = 'very low' | 'low' | 'moderate' | 'high' | 'very high';
export type CarbonIntensityResponse = {
    data: {
        from: string;
        to: string;
        intensity: {
            forecast: number;
            actual: number | null;
            index: CarbonIntensityIndex;
        };
    }[];
};

export const carbonIntensityAPI = {
  get: async (path: string): Promise<{ data?: CarbonIntensityResponse, error?: Error }> => {
    try {
      const response = await fetch(`${BASE_URL}${path}`);
      const data = await response.json();
      return { data };
    } catch (error: any) {
      return { error };
    }
  },
};
