import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Card, Button, Avatar, ProgressBar } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../store';
import { addActivity, completeActivity } from '../store/slices/activitiesSlice';
import { updateGoalProgress } from '../store/slices/goalsSlice';
import { theme, spacing } from '../utils/theme';
import { Activity, ActivityType } from '../types';
import NotificationService from '../services/NotificationService';

const HomeScreen: React.FC = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.user);
  const { goals } = useSelector((state: RootState) => state.goals);
  const { activities } = useSelector((state: RootState) => state.activities);

  const [dailyProgress, setDailyProgress] = useState({
    hydration: 0,
    exercise: 0,
    meditation: 0,
    sunExposure: 0,
  });

  const todayActivities = activities.filter(
    activity => new Date(activity.timestamp).toDateString() === new Date().toDateString()
  );

  useEffect(() => {
    calculateDailyProgress();
  }, [activities]);

  const calculateDailyProgress = () => {
    const today = new Date().toDateString();
    const todayActivities = activities.filter(
      activity => new Date(activity.timestamp).toDateString() === today && activity.completed
    );

    const progress = {
      hydration: todayActivities.filter(a => a.type === 'hydration').length,
      exercise: todayActivities.filter(a => a.type === 'exercise').length,
      meditation: todayActivities.filter(a => a.type === 'meditation').length,
      sunExposure: todayActivities.filter(a => a.type === 'sunExposure').length,
    };

    setDailyProgress(progress);
  };

  const handleQuickActivity = (type: ActivityType, title: string) => {
    const newActivity: Activity = {
      id: Date.now().toString(),
      userId: currentUser?.id || '',
      type,
      completed: true,
      timestamp: new Date().toISOString(),
      notes: `Atividade rápida: ${title}`,
    };

    dispatch(addActivity(newActivity));
    
    // Update related goals
    const relatedGoals = goals.filter(goal => goal.type === type && goal.isActive);
    relatedGoals.forEach(goal => {
      dispatch(updateGoalProgress({
        goalId: goal.id,
        progress: goal.currentProgress + 1
      }));
    });

    // Show achievement notification if goal completed
    const completedGoals = relatedGoals.filter(goal => 
      goal.currentProgress + 1 >= goal.target
    );
    
    if (completedGoals.length > 0) {
      NotificationService.scheduleAchievementNotification(
        '🎉 Meta alcançada!',
        `Parabéns! Você completou sua meta de ${title.toLowerCase()}!`
      );
    }

    Alert.alert(
      'Atividade registrada! ✅',
      `${title} foi adicionado ao seu dia.`,
      [{ text: 'OK' }]
    );
  };

  const quickActivities = [
    {
      type: 'hydration' as ActivityType,
      title: 'Beber Água',
      icon: 'local-drink',
      color: '#64B5F6',
      description: 'Registrar 1 copo de água'
    },
    {
      type: 'exercise' as ActivityType,
      title: 'Exercício',
      icon: 'sports-gymnastics',
      color: '#81C784',
      description: 'Completar exercício'
    },
    {
      type: 'meditation' as ActivityType,
      title: 'Meditação',
      icon: 'spa',
      color: '#BA68C8',
      description: 'Fazer uma pausa mindful'
    },
    {
      type: 'sunExposure' as ActivityType,
      title: 'Sol',
      icon: 'wb-sunny',
      color: '#FFB74D',
      description: 'Tomar um pouco de sol'
    },
  ];

  const getGreeting = () => {
    const hour = new Date().getHours();
    const name = currentUser?.name?.split(' ')[0] || 'amigo';
    
    if (hour < 12) return `Bom dia, ${name}! ☀️`;
    if (hour < 18) return `Boa tarde, ${name}! 🌤️`;
    return `Boa noite, ${name}! 🌙`;
  };

  const getMotivationalMessage = () => {
    const messages = [
      'Cada pequeno passo conta! 💪',
      'Você está no caminho certo! 🌟',
      'Que tal começar com algo simples? 😊',
      'Seu bem-estar é prioridade! 💚',
      'Lembre-se: progresso, não perfeição! ✨',
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={[theme.colors.primary, '#A8D5BA']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.greeting}>
            <Avatar.Text 
              size={50} 
              label={currentUser?.name?.charAt(0) || 'V'} 
              style={styles.avatar}
            />
            <View style={styles.greetingText}>
              <Text style={styles.greetingTitle}>{getGreeting()}</Text>
              <Text style={styles.motivationalText}>{getMotivationalMessage()}</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        {/* Quick Activities */}
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Ações Rápidas</Text>
            <View style={styles.quickActivitiesGrid}>
              {quickActivities.map((activity) => (
                <TouchableOpacity
                  key={activity.type}
                  style={[styles.quickActivityCard, { backgroundColor: activity.color + '20' }]}
                  onPress={() => handleQuickActivity(activity.type, activity.title)}
                >
                  <MaterialIcons 
                    name={activity.icon as any} 
                    size={32} 
                    color={activity.color} 
                  />
                  <Text style={styles.quickActivityTitle}>{activity.title}</Text>
                  <Text style={styles.quickActivityDescription}>
                    {activity.description}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </Card.Content>
        </Card>

        {/* Daily Progress */}
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Progresso de Hoje</Text>
            {quickActivities.map((activity) => {
              const progress = dailyProgress[activity.type as keyof typeof dailyProgress];
              const goal = goals.find(g => g.type === activity.type && g.isActive);
              const target = goal?.target || 8;
              
              return (
                <View key={activity.type} style={styles.progressItem}>
                  <View style={styles.progressHeader}>
                    <MaterialIcons 
                      name={activity.icon as any} 
                      size={20} 
                      color={activity.color} 
                    />
                    <Text style={styles.progressLabel}>{activity.title}</Text>
                    <Text style={styles.progressValue}>{progress}/{target}</Text>
                  </View>
                  <ProgressBar 
                    progress={Math.min(progress / target, 1)} 
                    color={activity.color}
                    style={styles.progressBar}
                  />
                </View>
              );
            })}
          </Card.Content>
        </Card>

        {/* Today's Activities */}
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Atividades de Hoje</Text>
            {todayActivities.length === 0 ? (
              <Text style={styles.emptyText}>
                Nenhuma atividade registrada hoje. Que tal começar agora? 😊
              </Text>
            ) : (
              todayActivities.slice(0, 5).map((activity) => (
                <View key={activity.id} style={styles.activityItem}>
                  <MaterialIcons 
                    name={activity.completed ? 'check-circle' : 'radio-button-unchecked'} 
                    size={20} 
                    color={activity.completed ? theme.colors.success : theme.colors.placeholder} 
                  />
                  <Text style={styles.activityText}>
                    {activity.type === 'hydration' && '💧 Hidratação'}
                    {activity.type === 'exercise' && '🏃‍♀️ Exercício'}
                    {activity.type === 'meditation' && '🧘‍♀️ Meditação'}
                    {activity.type === 'sunExposure' && '☀️ Exposição ao sol'}
                  </Text>
                  <Text style={styles.activityTime}>
                    {new Date(activity.timestamp).toLocaleTimeString('pt-BR', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </Text>
                </View>
              ))
            )}
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  headerContent: {
    flex: 1,
  },
  greeting: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  greetingText: {
    marginLeft: spacing.md,
    flex: 1,
  },
  greetingTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    marginBottom: 4,
  },
  motivationalText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  content: {
    padding: spacing.md,
  },
  card: {
    marginBottom: spacing.md,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: spacing.md,
  },
  quickActivitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActivityCard: {
    width: '48%',
    padding: spacing.md,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  quickActivityTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
  quickActivityDescription: {
    fontSize: 12,
    color: theme.colors.placeholder,
    marginTop: 2,
    textAlign: 'center',
  },
  progressItem: {
    marginBottom: spacing.md,
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  progressLabel: {
    fontSize: 14,
    color: theme.colors.text,
    marginLeft: spacing.xs,
    flex: 1,
  },
  progressValue: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.xs,
  },
  activityText: {
    fontSize: 14,
    color: theme.colors.text,
    marginLeft: spacing.xs,
    flex: 1,
  },
  activityTime: {
    fontSize: 12,
    color: theme.colors.placeholder,
  },
  emptyText: {
    fontSize: 14,
    color: theme.colors.placeholder,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default HomeScreen;
