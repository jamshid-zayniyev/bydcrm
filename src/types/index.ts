export type UserRole = 'admin' | 'callcenter' | 'marketing' | 'sales' | 'service' | 'support';

export type LeadSource = 'walk-in' | 'phone' | 'online' | 'referral';

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'negotiation' | 'won' | 'lost';

export type CallType = 'incoming' | 'outgoing';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  department: string;
  avatar?: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  source: LeadSource;
  status: LeadStatus;
  interestedIn: string;
  location: string;
  assignedTo: string;
  createdAt: string;
  lastContact?: string;
  notes?: string;
  sentiment?: 'positive' | 'neutral' | 'negative';
}

export interface Call {
  id: string;
  customerId: string;
  customerName: string;
  type: CallType;
  duration: number;
  timestamp: string;
  agentId: string;
  agentName: string;
  recorded: boolean;
  transcription?: string;
  sentiment?: 'positive' | 'neutral' | 'negative';
  aiScore?: number;
  aiNotes?: string;
}

export interface Sale {
  id: string;
  customerId: string;
  customerName: string;
  vehicle: string;
  amount: number;
  date: string;
  salesPerson: string;
  status: 'pending' | 'completed' | 'cancelled';
}

export interface ServiceRequest {
  id: string;
  customerId: string;
  customerName: string;
  vehicle: string;
  serviceType: string;
  date: string;
  status: 'scheduled' | 'in-progress' | 'completed';
  technician: string;
  rating?: number;
}

export interface KPI {
  employeeId: string;
  employeeName: string;
  department: string;
  callsMade?: number;
  callsTarget?: number;
  leadsGenerated?: number;
  salesClosed?: number;
  averageCallDuration?: number;
  customerSatisfaction?: number;
}

export interface AIRecommendation {
  id: string;
  type: 'lead-scoring' | 'sales-strategy' | 'call-quality' | 'best-time' | 'upsell';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  targetCustomerId?: string;
  targetCustomerName?: string;
  confidence: number;
  createdAt: string;
}
