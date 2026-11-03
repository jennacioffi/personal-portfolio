export type Project = {
  id: number;
  name: string;
  description: string;
  start_date: string | null;
  end_date: string | null;
  career_id: number;
  link: string | null;
  skills: string[] | null;
};
