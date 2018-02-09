export class Runtime {
  description: string;
  icon: string;
  id: string;
  missions: Missions[];
  name: string;
  version?: string; // Menu selection
  versions: string[];
  url?: string;
  projectVersion: string;
}

export class Missions {
  id: string;
  versions: any[];
}
