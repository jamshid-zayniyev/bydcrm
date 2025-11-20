import { api } from "./axios";

export interface CallCenter {
  id: 0;
  customer_name: "string";
  customer_phone: "string";
  operator: 0;
  call_type: "o";
  condition: "p";
  grade: 10;
  recorded_conversation: "string";
  notes: "string";
}

export const getCallCenter = async (): Promise<CallCenter[]> => {
  const response = await api.get(`/cpntact-center/calls/`);
  return response.data;
};
