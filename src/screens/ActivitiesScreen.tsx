import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Card, Chip, Button, Modal, Portal } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

import { RootState } from '../store';
import { theme, spacing } from '../utils/theme';
import { ExerciseContent } from '../types';

const ActivitiesScreen: React.FC = () => {
  const { exercises } = useSelector((state: RootState) => state.content);
  const [selectedCategory, setSelectedCategory] = useState<string>('todas');
  const [showExerciseModal, setShowExerciseModal] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<ExerciseContent | null>(null);

  const categories = [
    { key: 'todas', label: 'Todas', icon: 'apps' },
    { key: 'alongamento', label: 'Alongamento', icon: 'accessibility' },
    { key: 'funcional', label: 'Funcional', icon: 'fitness-center' },
    { key: 'mobilidade', label: 'Mobilidade', icon: 'directions-walk' },
    { key: 'meditacao', label: 'Meditação', icon: 'self-improvement' },
  ];

  const filteredExercises = selectedCategory === 'todas' 
    ? exercises 
    : exercises.filter(exercise => exercise.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'iniciante': return theme.colors.success;
      case 'intermediario': return theme.colors.warning;
      case 'avancado': return theme.colors.notification;
      default: return theme.colors.placeholder;
    }
  };

  const openExerciseModal = (exercise: ExerciseContent) => {
    setSelectedExercise(exercise);
    setShowExerciseModal(true);
  };

  const closeExerciseModal = () => {
    setShowExerciseModal(false);
    setSelectedExercise(null);
  };

  // Sample exercises data
  const sampleExercises: ExerciseContent[] = [
    {
      id: '1',
      title: 'Alongamento Matinal',
      description: 'Série suave de alongamentos para começar o dia com energia',
      duration: 5,
      difficulty: 'iniciante',
      category: 'alongamento',
      instructions: [
        'Levante os braços acima da cabeça e estique-se',
        'Incline-se para os lados, mantendo a postura',
        'Gire o pescoço suavemente para ambos os lados',
        'Toque os dedos dos pés mantendo as pernas retas'
      ],
      equipment: []
    },
    {
      id: '2',
      title: 'Exercícios Funcionais Básicos',
      description: 'Movimentos funcionais para o dia a dia',
      duration: 10,
      difficulty: 'iniciante',
      category: 'funcional',
      instructions: [
        'Agachamentos com peso corporal (10 repetições)',
        'Flexões na parede (10 repetições)',
        'Prancha por 30 segundos',
        'Marcha estacionária por 1 minuto'
      ],
      equipment: []
    },
    {
      id: '3',
      title: 'Meditação Respiratória',
      description: 'Técnica simples de respiração consciente',
      duration: 5,
      difficulty: 'iniciante',
      category: 'meditacao',
      instructions: [
        'Sente-se confortavelmente com a coluna reta',
        'Feche os olhos e respire naturalmente',
        'Conte as respirações de 1 a 10',
        'Quando chegar a 10, volte ao 1'
      ],
      equipment: []
    },
    {
      id: '4',
      title: 'Mobilidade Articular',
      description: 'Exercícios para manter as articulações saudáveis',
      duration: 8,
      difficulty: 'iniciante',
      category: 'mobilidade',
      instructions: [
        'Rotação dos ombros (10 para frente, 10 para trás)',
        'Círculos com os braços',
        'Rotação dos quadris',
        'Flexão e extensão dos tornozelos'
      ],
      equipment: []
    }
  ];

  const displayExercises = filteredExercises.length > 0 ? filteredExercises : sampleExercises;

  return (
    <View style={styles.container}>
      {/* Categories */}
      <View style={styles.categoriesContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((category) => (
            <Chip
              key={category.key}
              mode={selectedCategory === category.key ? 'flat' : 'outlined'}
              selected={selectedCategory === category.key}
              onPress={() => setSelectedCategory(category.key)}
              style={styles.categoryChip}
              icon={category.icon}
            >
              {category.label}
            </Chip>
          ))}
        </ScrollView>
      </View>

      {/* Exercises List */}
      <ScrollView style={styles.exercisesList}>
        {displayExercises.map((exercise) => (
          <Card key={exercise.id} style={styles.exerciseCard}>
            <TouchableOpacity onPress={() => openExerciseModal(exercise)}>
              <Card.Content>
                <View style={styles.exerciseHeader}>
                  <View style={styles.exerciseInfo}>
                    <Text style={styles.exerciseTitle}>{exercise.title}</Text>
                    <Text style={styles.exerciseDescription}>
                      {exercise.description}
                    </Text>
                  </View>
                  <View style={styles.exerciseMetrics}>
                    <View style={styles.metric}>
                      <MaterialIcons name="schedule" size={16} color={theme.colors.placeholder} />
                      <Text style={styles.metricText}>{exercise.duration} min</Text>
                    </View>
                    <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(exercise.difficulty) + '20' }]}>
                      <Text style={[styles.difficultyText, { color: getDifficultyColor(exercise.difficulty) }]}>
                        {exercise.difficulty}
                      </Text>
                    </View>
                  </View>
                </View>
              </Card.Content>
            </TouchableOpacity>
          </Card>
        ))}
      </ScrollView>

      {/* Exercise Detail Modal */}
      <Portal>
        <Modal
          visible={showExerciseModal}
          onDismiss={closeExerciseModal}
          contentContainerStyle={styles.modalContainer}
        >
          {selectedExercise && (
            <ScrollView>
              <Text style={styles.modalTitle}>{selectedExercise.title}</Text>
              <Text style={styles.modalDescription}>{selectedExercise.description}</Text>
              
              <View style={styles.modalMetrics}>
                <View style={styles.modalMetric}>
                  <MaterialIcons name="schedule" size={20} color={theme.colors.primary} />
                  <Text style={styles.modalMetricText}>{selectedExercise.duration} minutos</Text>
                </View>
                <View style={styles.modalMetric}>
                  <MaterialIcons name="trending-up" size={20} color={theme.colors.primary} />
                  <Text style={styles.modalMetricText}>{selectedExercise.difficulty}</Text>
                </View>
              </View>

              <Text style={styles.instructionsTitle}>Instruções:</Text>
              {selectedExercise.instructions.map((instruction, index) => (
                <View key={index} style={styles.instructionItem}>
                  <View style={styles.instructionNumber}>
                    <Text style={styles.instructionNumberText}>{index + 1}</Text>
                  </View>
                  <Text style={styles.instructionText}>{instruction}</Text>
                </View>
              ))}

              {selectedExercise.equipment && selectedExercise.equipment.length > 0 && (
                <>
                  <Text style={styles.equipmentTitle}>Equipamentos necessários:</Text>
                  {selectedExercise.equipment.map((item, index) => (
                    <Text key={index} style={styles.equipmentItem}>• {item}</Text>
                  ))}
                </>
              )}

              <View style={styles.modalActions}>
                <Button mode="outlined" onPress={closeExerciseModal} style={styles.modalButton}>
                  Fechar
                </Button>
                <Button mode="contained" onPress={closeExerciseModal} style={styles.modalButton}>
                  Iniciar Exercício
                </Button>
              </View>
            </ScrollView>
          )}
        </Modal>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  categoriesContainer: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.backdrop,
  },
  categoryChip: {
    marginRight: spacing.xs,
  },
  exercisesList: {
    flex: 1,
    padding: spacing.md,
  },
  exerciseCard: {
    marginBottom: spacing.md,
    elevation: 2,
  },
  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  exerciseInfo: {
    flex: 1,
    marginRight: spacing.md,
  },
  exerciseTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: spacing.xs,
  },
  exerciseDescription: {
    fontSize: 14,
    color: theme.colors.placeholder,
    lineHeight: 20,
  },
  exerciseMetrics: {
    alignItems: 'flex-end',
  },
  metric: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  metricText: {
    fontSize: 12,
    color: theme.colors.placeholder,
    marginLeft: 4,
  },
  difficultyBadge: {
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '600',
  },
  modalContainer: {
    backgroundColor: theme.colors.surface,
    margin: spacing.lg,
    borderRadius: 12,
    padding: spacing.lg,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: spacing.sm,
  },
  modalDescription: {
    fontSize: 16,
    color: theme.colors.placeholder,
    marginBottom: spacing.lg,
    lineHeight: 22,
  },
  modalMetrics: {
    flexDirection: 'row',
    marginBottom: spacing.lg,
  },
  modalMetric: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.lg,
  },
  modalMetricText: {
    fontSize: 14,
    color: theme.colors.text,
    marginLeft: spacing.xs,
    fontWeight: '500',
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: spacing.md,
  },
  instructionItem: {
    flexDirection: 'row',
    marginBottom: spacing.md,
    alignItems: 'flex-start',
  },
  instructionNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
    marginTop: 2,
  },
  instructionNumberText: {
    fontSize: 12,
    color: 'white',
    fontWeight: '600',
  },
  instructionText: {
    fontSize: 14,
    color: theme.colors.text,
    flex: 1,
    lineHeight: 20,
  },
  equipmentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  equipmentItem: {
    fontSize: 14,
    color: theme.colors.placeholder,
    marginBottom: spacing.xs,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.xl,
  },
  modalButton: {
    flex: 1,
    marginHorizontal: spacing.xs,
  },
});

export default ActivitiesScreen;
