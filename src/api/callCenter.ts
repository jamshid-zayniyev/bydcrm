import { api } from "./axios";

export interface CallCenter {
  id: 0;
  customer_id: string;
  customer_name: string;
  type: string;
  duration: string;
  timestamp: string;
  agent_id: number;
  agent_name: string;
  recorded: boolean;
  sentiment: string;
  ai_score: number;
  ai_notes: string;
}

export interface CallStatistics {
  general_calls: number;
  average_duration: string;
  positives: number;
  average_ai_score: number;
}

export const getCallCenter = async (): Promise<CallCenter[]> => {
  const response = await api.get(`/contact-center/calls/`);
  return response.data;
};

export const getCallStatistics = async (): Promise<CallStatistics> => {
  const response = await api.get(`/contact-center/call-statistics/`);
  return response.data;
};
