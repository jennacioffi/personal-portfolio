export type Recommendation = {
  id: number;
  title: string;
  company: string;
  CompanySocialsURL: string;
  contactURL: string;
  quote: string;
  originalData: string[];
};

export type SelectedRecommendation = {
  name: string;
  recommendation: Recommendation;
};
