export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  preferences: UserPreferences;
  goals: Goal[];
  achievements: Achievement[];
  createdAt: string;
  updatedAt: string;
}

export interface UserPreferences {
  reminderTone: 'motivacional' | 'divertido' | 'tecnico' | 'gentil';
  notificationsEnabled: boolean;
  exerciseReminders: boolean;
  hydrationReminders: boolean;
  sunExposureReminders: boolean;
  meditationReminders: boolean;
  preferredExerciseTime: string;
  preferredReminderFrequency: number; // em horas
}

export interface Activity {
  id: string;
  userId: string;
  type: ActivityType;
  duration?: number; // em minutos
  completed: boolean;
  timestamp: string;
  notes?: string;
  moodBefore?: number; // 1-10
  moodAfter?: number; // 1-10
  energyLevel?: number; // 1-10
}

export type ActivityType = 
  | 'exercise'
  | 'hydration'
  | 'sunExposure'
  | 'meditation'
  | 'moodCheck'
  | 'stretching'
  | 'walking';

export interface Goal {
  id: string;
  userId: string;
  type: ActivityType;
  target: number; // meta (ex: 8 copos de água, 30 min de exercício)
  period: 'daily' | 'weekly' | 'monthly';
  currentProgress: number;
  isActive: boolean;
  createdAt: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  iconName: string;
  unlockedAt?: string;
  category: 'consistency' | 'milestone' | 'special';
  requirement: {
    type: ActivityType;
    count: number;
    period: 'days' | 'weeks';
  };
}

export interface ExerciseContent {
  id: string;
  title: string;
  description: string;
  duration: number; // em minutos
  difficulty: 'iniciante' | 'intermediario' | 'avancado';
  category: 'alongamento' | 'funcional' | 'mobilidade' | 'meditacao';
  videoUrl?: string;
  thumbnailUrl?: string;
  instructions: string[];
  equipment?: string[];
}

export interface DailyProgress {
  date: string;
  activities: Activity[];
  goalsCompleted: number;
  totalGoals: number;
  moodAverage?: number;
  energyAverage?: number;
}

export interface WeeklyChallenge {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  activities: ActivityType[];
  targetCount: number;
  participants: number;
  rewards: Achievement[];
}
