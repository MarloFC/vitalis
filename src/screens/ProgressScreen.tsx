import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Card } from 'react-native-paper';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';
import { MaterialIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

import { RootState } from '../store';
import { theme, spacing } from '../utils/theme';

const { width: screenWidth } = Dimensions.get('window');

const ProgressScreen: React.FC = () => {
  const { activities } = useSelector((state: RootState) => state.activities);
  const { goals } = useSelector((state: RootState) => state.goals);

  // Sample data for charts
  const weeklyData = {
    labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
    datasets: [{
      data: [3, 5, 4, 6, 8, 7, 5],
      color: (opacity = 1) => `rgba(107, 155, 210, ${opacity})`,
      strokeWidth: 2,
    }],
  };

  const activityData = [
    {
      name: 'Exercícios',
      population: 35,
      color: '#81C784',
      legendFontColor: theme.colors.text,
      legendFontSize: 12,
    },
    {
      name: 'Hidratação',
      population: 30,
      color: '#64B5F6',
      legendFontColor: theme.colors.text,
      legendFontSize: 12,
    },
    {
      name: 'Meditação',
      population: 20,
      color: '#BA68C8',
      legendFontColor: theme.colors.text,
      legendFontSize: 12,
    },
    {
      name: 'Sol',
      population: 15,
      color: '#FFB74D',
      legendFontColor: theme.colors.text,
      legendFontSize: 12,
    },
  ];

  const monthlyGoalsData = {
    labels: ['Água', 'Exerc.', 'Medit.', 'Sol'],
    datasets: [{
      data: [85, 70, 60, 75],
    }],
  };

  const chartConfig = {
    backgroundColor: theme.colors.surface,
    backgroundGradientFrom: theme.colors.surface,
    backgroundGradientTo: theme.colors.surface,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(107, 155, 210, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(44, 62, 80, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '4',
      strokeWidth: '2',
      stroke: theme.colors.primary,
    },
  };

  const achievements = [
    { icon: 'local-drink', title: 'Hidratação Constante', description: '7 dias seguidos bebendo 8 copos de água', color: '#64B5F6' },
    { icon: 'fitness-center', title: 'Primeira Semana', description: 'Completou 7 dias de exercícios', color: '#81C784' },
    { icon: 'self-improvement', title: 'Mente Zen', description: '10 sessões de meditação completadas', color: '#BA68C8' },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Weekly Activity Chart */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Atividades desta Semana</Text>
          <LineChart
            data={weeklyData}
            width={screenWidth - 64}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
          <Text style={styles.chartDescription}>
            Número total de atividades completadas por dia
          </Text>
        </Card.Content>
      </Card>

      {/* Activity Distribution */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Distribuição de Atividades</Text>
          <PieChart
            data={activityData}
            width={screenWidth - 64}
            height={200}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            center={[10, 10]}
            absolute
          />
          <Text style={styles.chartDescription}>
            Porcentagem de cada tipo de atividade no último mês
          </Text>
        </Card.Content>
      </Card>

      {/* Monthly Goals Progress */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Progresso das Metas Mensais</Text>
          <BarChart
            data={monthlyGoalsData}
            width={screenWidth - 64}
            height={200}
            chartConfig={chartConfig}
            style={styles.chart}
            verticalLabelRotation={0}
            showValuesOnTopOfBars
          />
          <Text style={styles.chartDescription}>
            Porcentagem de conclusão das metas mensais
          </Text>
        </Card.Content>
      </Card>

      {/* Achievements */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Conquistas Recentes</Text>
          {achievements.map((achievement, index) => (
            <View key={index} style={styles.achievementItem}>
              <View style={[styles.achievementIcon, { backgroundColor: achievement.color + '20' }]}>
                <MaterialIcons 
                  name={achievement.icon as any} 
                  size={24} 
                  color={achievement.color} 
                />
              </View>
              <View style={styles.achievementContent}>
                <Text style={styles.achievementTitle}>{achievement.title}</Text>
                <Text style={styles.achievementDescription}>{achievement.description}</Text>
              </View>
              <MaterialIcons name="verified" size={20} color={theme.colors.success} />
            </View>
          ))}
        </Card.Content>
      </Card>

      {/* Statistics */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Estatísticas</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>23</Text>
              <Text style={styles.statLabel}>Dias Ativos</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>156</Text>
              <Text style={styles.statLabel}>Atividades</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>7</Text>
              <Text style={styles.statLabel}>Sequência</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Conquistas</Text>
            </View>
          </View>
        </Card.Content>
      </Card>
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: spacing.md,
  },
  chart: {
    marginVertical: spacing.sm,
    borderRadius: 16,
  },
  chartDescription: {
    fontSize: 12,
    color: theme.colors.placeholder,
    textAlign: 'center',
    marginTop: spacing.sm,
    fontStyle: 'italic',
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.backdrop,
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 2,
  },
  achievementDescription: {
    fontSize: 14,
    color: theme.colors.placeholder,
    lineHeight: 18,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    width: '48%',
    alignItems: 'center',
    paddingVertical: spacing.md,
    backgroundColor: theme.colors.primary + '10',
    borderRadius: 12,
    marginBottom: spacing.sm,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: theme.colors.text,
    fontWeight: '500',
  },
});

export default ProgressScreen;
