export type PlanType = 'meal' | 'training';

export interface PlanItem {
  id: number;          
  type: PlanType;      
  title: string;       
  kcal: number;        
  tags: string[];      
}

export type SortKey = 'title' | 'type' | 'kcal';
export type SortOrder = 'asc' | 'desc';
