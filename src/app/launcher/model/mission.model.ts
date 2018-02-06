export class Mission {
<<<<<<< HEAD
  description: string;
  id: string;
  suggested?: boolean;
  runtimes: string[];
  name: string;
  url?: string;
=======
  constructor(
    public id: string,
    public name: string,
    public suggested: boolean,
    public runtimes: string[],
    public description: string = null
  ) {}
>>>>>>> changes the mission mock data with the actual mock data from backend
}
