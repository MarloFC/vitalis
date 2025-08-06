import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import {
  Button,
  Card,
  Chip,
  RadioButton,
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';

import { updateUserPreferences } from '../store/slices/userSlice';
import { addGoal } from '../store/slices/goalsSlice';
import { theme, spacing } from '../utils/theme';
import { Goal, ActivityType } from '../types';

const { width: screenWidth } = Dimensions.get('window');

interface OnboardingScreenProps {
  navigation: any;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedGoals, setSelectedGoals] = useState<ActivityType[]>([]);
  const [reminderTone, setReminderTone] = useState('gentil');
  const [exerciseTime, setExerciseTime] = useState('09:00');

  const steps = [
    'Bem-vindo',
    'Escolha suas metas',
    'Configure lembretes',
    'Finalize o setup'
  ];

  const goalOptions = [
    {
      type: 'hydration' as ActivityType,
      title: 'Hidratação',
      description: 'Beber mais água durante o dia',
      icon: 'local-drink',
      color: '#64B5F6',
      target: 8,
    },
    {
      type: 'exercise' as ActivityType,
      title: 'Exercícios',
      description: 'Manter-se ativo fisicamente',
      icon: 'fitness-center',
      color: '#81C784',
      target: 1,
    },
    {
      type: 'meditation' as ActivityType,
      title: 'Meditação',
      description: 'Praticar mindfulness e relaxamento',
      icon: 'self-improvement',
      color: '#BA68C8',
      target: 1,
    },
    {
      type: 'sunExposure' as ActivityType,
      title: 'Exposição ao Sol',
      description: 'Tomar sol de forma saudável',
      icon: 'wb-sunny',
      color: '#FFB74D',
      target: 1,
    },
  ];

  const reminderTones = [
    { key: 'motivacional', label: 'Motivacional', emoji: '💪' },
    { key: 'divertido', label: 'Divertido', emoji: '😄' },
    { key: 'tecnico', label: 'Técnico', emoji: '📊' },
    { key: 'gentil', label: 'Gentil', emoji: '🌸' },
  ];

  const timeOptions = [
    { value: '07:00', label: '7:00 - Cedo' },
    { value: '09:00', label: '9:00 - Manhã' },
    { value: '12:00', label: '12:00 - Almoço' },
    { value: '18:00', label: '18:00 - Tarde' },
  ];

  const handleGoalToggle = (type: ActivityType) => {
    if (selectedGoals.includes(type)) {
      setSelectedGoals(selectedGoals.filter(goal => goal !== type));
    } else {
      setSelectedGoals([...selectedGoals, type]);
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      finishOnboarding();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const finishOnboarding = () => {
    // Save user preferences
    dispatch(updateUserPreferences({
      reminderTone: reminderTone as any,
      preferredExerciseTime: exerciseTime,
    }));

    // Create initial goals
    selectedGoals.forEach(goalType => {
      const goalOption = goalOptions.find(opt => opt.type === goalType);
      if (goalOption) {
        const goal: Goal = {
          id: Date.now().toString() + goalType,
          userId: '1', // This should be the actual user ID
          type: goalType,
          target: goalOption.target,
          period: 'daily',
          currentProgress: 0,
          isActive: true,
          createdAt: new Date().toISOString(),
        };
        dispatch(addGoal(goal));
      }
    });

    // Navigate to main app
    navigation.navigate('Main');
  };

  const renderWelcomeStep = () => (
    <View style={styles.stepContainer}>
      <MaterialIcons name="favorite" size={80} color="white" style={styles.welcomeIcon} />
      <Text style={styles.welcomeTitle}>Bem-vindo ao Vitalis!</Text>
      <Text style={styles.welcomeSubtitle}>
        Vamos configurar seu aplicativo para criar uma experiência personalizada de bem-estar.
      </Text>
      <Text style={styles.welcomeDescription}>
        Em apenas alguns passos, você terá um guia pessoal para desenvolver hábitos saudáveis de forma natural e sustentável.
      </Text>
    </View>
  );

  const renderGoalsStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Quais são seus objetivos?</Text>
      <Text style={styles.stepSubtitle}>
        Escolha as áreas em que você gostaria de focar. Você pode alterar isso depois.
      </Text>
      
      <View style={styles.goalsGrid}>
        {goalOptions.map((goal) => (
          <Card
            key={goal.type}
            style={[
              styles.goalCard,
              selectedGoals.includes(goal.type) && styles.goalCardSelected
            ]}
          >
            <Card.Content style={styles.goalCardContent}>
              <MaterialIcons
                name={goal.icon as any}
                size={32}
                color={selectedGoals.includes(goal.type) ? 'white' : goal.color}
              />
              <Text style={[
                styles.goalTitle,
                selectedGoals.includes(goal.type) && styles.goalTitleSelected
              ]}>
                {goal.title}
              </Text>
              <Text style={[
                styles.goalDescription,
                selectedGoals.includes(goal.type) && styles.goalDescriptionSelected
              ]}>
                {goal.description}
              </Text>
              <Chip
                mode={selectedGoals.includes(goal.type) ? 'flat' : 'outlined'}
                selected={selectedGoals.includes(goal.type)}
                onPress={() => handleGoalToggle(goal.type)}
                style={styles.goalChip}
              >
                {selectedGoals.includes(goal.type) ? 'Selecionado' : 'Selecionar'}
              </Chip>
            </Card.Content>
          </Card>
        ))}
      </View>
    </View>
  );

  const renderRemindersStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Configure seus lembretes</Text>
      <Text style={styles.stepSubtitle}>
        Personalize o tom das mensagens e o melhor horário para exercícios.
      </Text>

      <Card style={styles.configCard}>
        <Card.Content>
          <Text style={styles.configTitle}>Tom dos lembretes:</Text>
          {reminderTones.map((tone) => (
            <View key={tone.key} style={styles.radioOption}>
              <RadioButton
                value={tone.key}
                status={reminderTone === tone.key ? 'checked' : 'unchecked'}
                onPress={() => setReminderTone(tone.key)}
              />
              <Text style={styles.radioLabel}>
                {tone.emoji} {tone.label}
              </Text>
            </View>
          ))}
        </Card.Content>
      </Card>

      <Card style={styles.configCard}>
        <Card.Content>
          <Text style={styles.configTitle}>Horário preferido para exercícios:</Text>
          {timeOptions.map((time) => (
            <View key={time.value} style={styles.radioOption}>
              <RadioButton
                value={time.value}
                status={exerciseTime === time.value ? 'checked' : 'unchecked'}
                onPress={() => setExerciseTime(time.value)}
              />
              <Text style={styles.radioLabel}>{time.label}</Text>
            </View>
          ))}
        </Card.Content>
      </Card>
    </View>
  );

  const renderFinishStep = () => (
    <View style={styles.stepContainer}>
      <MaterialIcons name="check-circle" size={80} color="white" style={styles.finishIcon} />
      <Text style={styles.finishTitle}>Tudo pronto!</Text>
      <Text style={styles.finishSubtitle}>
        Seu Vitalis está configurado e pronto para uso.
      </Text>
      
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Resumo das configurações:</Text>
        <Text style={styles.summaryItem}>• {selectedGoals.length} metas selecionadas</Text>
        <Text style={styles.summaryItem}>• Tom {reminderTone} para lembretes</Text>
        <Text style={styles.summaryItem}>• Exercícios às {exerciseTime}</Text>
      </View>

      <Text style={styles.finishDescription}>
        Comece devagar e seja consistente. Pequenos passos levam a grandes transformações! 🌟
      </Text>
    </View>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0: return renderWelcomeStep();
      case 1: return renderGoalsStep();
      case 2: return renderRemindersStep();
      case 3: return renderFinishStep();
      default: return renderWelcomeStep();
    }
  };

  return (
    <LinearGradient
      colors={[theme.colors.primary, '#A8D5BA']}
      style={styles.container}
    >
      <View style={styles.header}>
        <View style={styles.progressContainer}>
          {steps.map((_, index) => (
            <View
              key={index}
              style={[
                styles.progressDot,
                index <= currentStep && styles.progressDotActive
              ]}
            />
          ))}
        </View>
        <Text style={styles.stepIndicator}>
          {currentStep + 1} de {steps.length}
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderCurrentStep()}
      </ScrollView>

      <View style={styles.footer}>
        {currentStep > 0 && (
          <Button
            mode="outlined"
            onPress={handleBack}
            style={styles.backButton}
            textColor="white"
          >
            Voltar
          </Button>
        )}
        
        <Button
          mode="contained"
          onPress={handleNext}
          style={[styles.nextButton, currentStep === 0 && styles.nextButtonFull]}
          disabled={currentStep === 1 && selectedGoals.length === 0}
        >
          {currentStep === steps.length - 1 ? 'Começar!' : 'Próximo'}
        </Button>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingBottom: spacing.lg,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
  },
  progressContainer: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 4,
  },
  progressDotActive: {
    backgroundColor: 'white',
  },
  stepIndicator: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  stepContainer: {
    alignItems: 'center',
    paddingBottom: spacing.xl,
  },
  welcomeIcon: {
    marginBottom: spacing.lg,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: 'white',
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  welcomeSubtitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: spacing.lg,
    lineHeight: 24,
  },
  welcomeDescription: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: 22,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: 'white',
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  stepSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: spacing.lg,
    lineHeight: 22,
  },
  goalsGrid: {
    width: '100%',
  },
  goalCard: {
    marginBottom: spacing.md,
    elevation: 4,
  },
  goalCardSelected: {
    backgroundColor: theme.colors.primary,
  },
  goalCardContent: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
  },
  goalTitleSelected: {
    color: 'white',
  },
  goalDescription: {
    fontSize: 14,
    color: theme.colors.placeholder,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  goalDescriptionSelected: {
    color: 'rgba(255, 255, 255, 0.9)',
  },
  goalChip: {
    marginTop: spacing.xs,
  },
  configCard: {
    width: '100%',
    marginBottom: spacing.md,
    elevation: 4,
  },
  configTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: spacing.md,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  radioLabel: {
    fontSize: 16,
    color: theme.colors.text,
    marginLeft: spacing.sm,
  },
  finishIcon: {
    marginBottom: spacing.lg,
  },
  finishTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: 'white',
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  finishSubtitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: spacing.lg,
    lineHeight: 24,
  },
  summaryCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    padding: spacing.lg,
    borderRadius: 12,
    marginBottom: spacing.lg,
    width: '100%',
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginBottom: spacing.sm,
  },
  summaryItem: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: spacing.xs,
  },
  finishDescription: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: 22,
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    paddingBottom: 40,
    paddingTop: spacing.lg,
  },
  backButton: {
    flex: 1,
    marginRight: spacing.sm,
    borderColor: 'white',
  },
  nextButton: {
    flex: 1,
    marginLeft: spacing.sm,
  },
  nextButtonFull: {
    marginLeft: 0,
  },
});

export default OnboardingScreen;
