import { $client } from "../client";
import type { GetPersonParams, Person } from "./types";

export const getPerson = ({ id }: GetPersonParams) => {
  return $client.get<Person>(`/people/${id}`);
};
