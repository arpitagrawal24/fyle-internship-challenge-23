export interface Repo {
  id: number;
  repoName: string;
  description: string | null;
  topics: Array<string>;
  url: string;
}
