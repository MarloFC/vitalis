import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Card, Button } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

import { theme, spacing } from '../utils/theme';

interface ExerciseDetailScreenProps {
  route: any;
  navigation: any;
}

const ExerciseDetailScreen: React.FC<ExerciseDetailScreenProps> = ({ route, navigation }) => {
  const { exercise } = route.params || {};

  if (!exercise) {
    return (
      <View style={styles.container}>
        <Text>Exercício não encontrado</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.title}>{exercise.title}</Text>
          <Text style={styles.description}>{exercise.description}</Text>
          
          <View style={styles.metrics}>
            <View style={styles.metric}>
              <MaterialIcons name="schedule" size={20} color={theme.colors.primary} />
              <Text style={styles.metricText}>{exercise.duration} minutos</Text>
            </View>
            <View style={styles.metric}>
              <MaterialIcons name="trending-up" size={20} color={theme.colors.primary} />
              <Text style={styles.metricText}>{exercise.difficulty}</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Instruções</Text>
          {exercise.instructions?.map((instruction: string, index: number) => (
            <View key={index} style={styles.instructionItem}>
              <View style={styles.instructionNumber}>
                <Text style={styles.instructionNumberText}>{index + 1}</Text>
              </View>
              <Text style={styles.instructionText}>{instruction}</Text>
            </View>
          ))}
        </Card.Content>
      </Card>

      <View style={styles.actions}>
        <Button
          mode="contained"
          onPress={() => navigation.goBack()}
          style={styles.button}
        >
          Iniciar Exercício
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: spacing.md,
  },
  card: {
    marginBottom: spacing.md,
    elevation: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: spacing.sm,
  },
  description: {
    fontSize: 16,
    color: theme.colors.placeholder,
    marginBottom: spacing.lg,
    lineHeight: 22,
  },
  metrics: {
    flexDirection: 'row',
    marginBottom: spacing.lg,
  },
  metric: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.lg,
  },
  metricText: {
    fontSize: 14,
    color: theme.colors.text,
    marginLeft: spacing.xs,
    fontWeight: '500',
  },
  sectionTitle: {
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
  actions: {
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
  },
  button: {
    paddingVertical: spacing.xs,
  },
});

export default ExerciseDetailScreen;
