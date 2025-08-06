import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  TextInput,
  Button,
  Card,
  Divider,
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';

import { loginSuccess } from '../store/slices/userSlice';
import { theme, spacing } from '../utils/theme';
import { User } from '../types';

interface LoginScreenProps {
  navigation: any;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create mock user
      const user: User = {
        id: '1',
        name: isRegistering ? name : 'Usuário Demo',
        email: email,
        preferences: {
          reminderTone: 'gentil',
          notificationsEnabled: true,
          exerciseReminders: true,
          hydrationReminders: true,
          sunExposureReminders: true,
          meditationReminders: true,
          preferredExerciseTime: '09:00',
          preferredReminderFrequency: 2,
        },
        goals: [],
        achievements: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      dispatch(loginSuccess(user));
      
      if (isRegistering) {
        navigation.navigate('Onboarding');
      }
    } catch (error) {
      Alert.alert('Erro', 'Falha ao fazer login. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestLogin = () => {
    const guestUser: User = {
      id: 'guest',
      name: 'Visitante',
      email: 'guest@vitalis.app',
      preferences: {
        reminderTone: 'gentil',
        notificationsEnabled: true,
        exerciseReminders: true,
        hydrationReminders: true,
        sunExposureReminders: true,
        meditationReminders: true,
        preferredExerciseTime: '09:00',
        preferredReminderFrequency: 2,
      },
      goals: [],
      achievements: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    dispatch(loginSuccess(guestUser));
  };

  return (
    <LinearGradient
      colors={[theme.colors.primary, '#A8D5BA']}
      style={styles.container}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Vitalis</Text>
            <Text style={styles.subtitle}>Seu Guia Pessoal de Bem-Estar</Text>
          </View>

          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.cardTitle}>
                {isRegistering ? 'Criar Conta' : 'Entrar'}
              </Text>

              {isRegistering && (
                <TextInput
                  label="Nome"
                  value={name}
                  onChangeText={setName}
                  mode="outlined"
                  style={styles.input}
                  left={<TextInput.Icon icon="account" />}
                />
              )}

              <TextInput
                label="Email"
                value={email}
                onChangeText={setEmail}
                mode="outlined"
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
                left={<TextInput.Icon icon="email" />}
              />

              <TextInput
                label="Senha"
                value={password}
                onChangeText={setPassword}
                mode="outlined"
                secureTextEntry
                style={styles.input}
                left={<TextInput.Icon icon="lock" />}
              />

              <Button
                mode="contained"
                onPress={handleLogin}
                loading={isLoading}
                style={styles.button}
                disabled={isLoading}
              >
                {isRegistering ? 'Criar Conta' : 'Entrar'}
              </Button>

              <Divider style={styles.divider} />

              <Button
                mode="outlined"
                onPress={() => setIsRegistering(!isRegistering)}
                style={styles.switchButton}
              >
                {isRegistering 
                  ? 'Já tem uma conta? Entre' 
                  : 'Não tem conta? Registre-se'
                }
              </Button>

              <Button
                mode="text"
                onPress={handleGuestLogin}
                style={styles.guestButton}
                textColor={theme.colors.placeholder}
              >
                Continuar como visitante
              </Button>
            </Card.Content>
          </Card>

          <Text style={styles.footer}>
            Desenvolva hábitos saudáveis de forma natural e sustentável
          </Text>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: 42,
    fontWeight: '700',
    color: 'white',
    marginBottom: spacing.xs,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    fontWeight: '300',
  },
  card: {
    marginBottom: spacing.lg,
    elevation: 8,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  input: {
    marginBottom: spacing.md,
  },
  button: {
    marginTop: spacing.md,
    paddingVertical: spacing.xs,
  },
  divider: {
    marginVertical: spacing.lg,
  },
  switchButton: {
    marginBottom: spacing.sm,
  },
  guestButton: {
    marginTop: spacing.sm,
  },
  footer: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: 20,
    fontStyle: 'italic',
  },
});

export default LoginScreen;
