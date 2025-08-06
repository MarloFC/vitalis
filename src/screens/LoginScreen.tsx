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
} from 'react-native-paper'; // Added Card and Divider
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';

// Import Firebase Auth
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import firebaseApp from '../../firebaseConfig'; // Assuming you have firebaseConfig.ts in your project root

import * as Google from 'expo-auth-session/providers/google';
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

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: 'YOUR_WEB_CLIENT_ID', // Replace with your Web client ID from Firebase
    iosClientId: 'YOUR_IOS_CLIENT_ID', // Replace with your iOS client ID from Firebase
    androidClientId: 'YOUR_ANDROID_CLIENT_ID', // Replace with your Android client ID from Firebase
  });
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    const auth = getAuth(firebaseApp);
    setIsLoading(true);

    try {
      let userCredential;
      if (isRegistering) {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      }

      const firebaseUser = userCredential.user;
      const user: User = {
        id: firebaseUser?.uid || '',
        name: isRegistering && name ? name : (firebaseUser?.displayName || 'Usuário Vitalis'),
        email: firebaseUser?.email || '',
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

      // In a real application, you would likely fetch or create additional user data in your backend or a database like Firestore here

      dispatch(loginSuccess(user));

      if (isRegistering) {
        navigation.navigate('Onboarding');
      }

      // Navigate to the main app after successful login (and not registration)
      if (!isRegistering) {
          // Assuming your main app navigation is set up after login
          // You might need to adjust this based on your overall navigation structure
          // For example, you might navigate to a 'Home' screen
           navigation.navigate('Home'); // Replace 'Home' with your actual home screen route
      }

    } catch (error: any) { // Explicitly type error as any
      Alert.alert('Erro', error.message || 'Falha na autenticação. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const response = await promptAsync();
      if (response?.type === 'success') {
        const { id_token } = response.params;
        const auth = getAuth(firebaseApp);
        const credential = GoogleAuthProvider.credential(id_token);
        const userCredential = await signInWithCredential(auth, credential);
        const firebaseUser = userCredential.user;

        const user: User = {
          id: firebaseUser?.uid || '',
          name: firebaseUser?.displayName || 'Usuário Google',
          email: firebaseUser?.email || '',
          preferences: { /* default preferences */ },
          goals: [], achievements: [], createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
        };
        dispatch(loginSuccess(user));
    } catch (error) {
      Alert.alert('Erro', error.message || 'Falha na autenticação. Tente novamente.');
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
                mode="outlined"
                onPress={handleGoogleSignIn}
                style={styles.switchButton} // Reuse the style for now
                disabled={!request} // Disable button if request is not loaded
              >
                Entrar com Google
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
