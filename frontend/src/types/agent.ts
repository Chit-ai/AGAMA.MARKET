export interface Agent {
  id?: number;
  name: string;
  version?: string;
  goal: string;
  domain?: string[];
  role: string;
  is_verified?: boolean;
  sattva_hash?: string;
  description?: string;
  repository?: string;
  agama_json?: {
    sattva?: {
      name?: string;
      version?: string;
      hash?: string;
      description?: string;
      repository?: string;
    };
    sankalpa?: {
      goal?: string;
      domain?: string[];
      role?: string;
    };
    karma?: Record<string, unknown>;
    prakriti?: Record<string, unknown>;
  };
  sattva?: {
    name: string;
    version: string;
    hash?: string;
    description?: string;
  };
  sankalpa?: {
    goal: string;
    domain?: string[];
    role: string;
  };
  karma?: Record<string, unknown>;
  prakriti?: Record<string, unknown>;
}
