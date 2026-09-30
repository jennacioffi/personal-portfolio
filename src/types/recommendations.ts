export type Recommendation = {
  title: string;
  company: string;
  CompanySocialsURL: string;
  contactURL: string;
  quote: string;
  originalData: string[];
};

export type RecommendationRow = {
  id: number;
  name: string;
  title: string;
  company: string;
  company_socials_url: string;
  contact_url: string;
  quote: string;
  original_data: string[];
};

export type SelectedRecommendation = {
  name: string;
  recommendation: Recommendation;
};
