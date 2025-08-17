import type { Person } from "@/shared/api";

export interface ProcessPerson extends Person {
  id: number;
}

export interface DirectResponse {
  name?: string;
  title?: string;
}
