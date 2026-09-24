export type Career = {
  id: number;
  company: string;
  title: string;
  start_date: string;
  end_date: string | null;
  description: string | null;
  link: string | null;
  skills: string[];
};
