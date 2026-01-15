export interface AiRecommendation {
  daily_analyses: number;
  forecast_accuracy: number;
  active_recommendations: number;
  accepted_recommendations: number;
  conversion_growth: number;
  calculated_at: string;
}

export interface getAiRecommendation {
  id: number;
  type: string;
  full_name: string;
  related_object_id: number;
  probability: string;
  label: string;
  payload: {
    probability: number;
    stage: string;
    recommendation: string;
    potential_items: string;
    estimated_revenue: string;
  };
  is_accepted: number | null;
  created_at: string;
}

export interface Effectiveness {
  acceptance_rate: number;
  conversion_rate: number;
  prediction_accuracy: number;
}
