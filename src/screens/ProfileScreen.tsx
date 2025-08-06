import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import {
  Card,
  Button,
  Switch,
  List,
  Avatar,
  Divider,
  Dialog,
  Portal,
  TextInput,
} from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../store';
import { updateUserPreferences, logout } from '../store/slices/userSlice';
import { theme, spacing } from '../utils/theme';
import NotificationService from '../services/NotificationService';

const ProfileScreen: React.FC = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [showNameDialog, setShowNameDialog] = useState(false);
  const [newName, setNewName] = useState(currentUser?.name || '');

  const handleNotificationToggle = async (type: string, value: boolean) => {
    dispatch(updateUserPreferences({
      [`${type}Reminders`]: value,
    }));

    if (value) {
      // Schedule notifications based on type
      switch (type) {
        case 'hydration':
          await NotificationService.scheduleHydrationReminder();
          break;
        case 'exercise':
          await NotificationService.scheduleExerciseReminder();
          break;
        case 'meditation':
          await NotificationService.scheduleMeditationReminder();
          break;
      }
    } else {
      // Cancel notifications
      await NotificationService.cancelAllNotifications();
    }
  };

  const handleReminderToneChange = (tone: string) => {
    dispatch(updateUserPreferences({
      reminderTone: tone as any,
    }));
  };

  const handleLogout = () => {
    Alert.alert(
      'Sair da conta',
      'Tem certeza que deseja sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: () => dispatch(logout()),
        },
      ]
    );
  };

  const handleNameUpdate = () => {
    if (newName.trim()) {
      dispatch(updateUserPreferences({
        // This would normally update the user profile
      }));
      setShowNameDialog(false);
    }
  };

  const reminderTones = [
    { key: 'motivacional', label: 'Motivacional', description: 'Mensagens energizantes' },
    { key: 'divertido', label: 'Divertido', description: 'Tom descontraído e alegre' },
    { key: 'tecnico', label: 'Técnico', description: 'Informações diretas e precisas' },
    { key: 'gentil', label: 'Gentil', description: 'Abordagem suave e acolhedora' },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <Card style={styles.card}>
        <Card.Content style={styles.profileHeader}>
          <Avatar.Text 
            size={80} 
            label={currentUser?.name?.charAt(0) || 'V'} 
            style={styles.avatar}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>{currentUser?.name || 'Usuário'}</Text>
            <Text style={styles.userEmail}>{currentUser?.email || 'email@exemplo.com'}</Text>
            <Button 
              mode="outlined" 
              onPress={() => setShowNameDialog(true)}
              style={styles.editButton}
              compact
            >
              Editar Perfil
            </Button>
          </View>
        </Card.Content>
      </Card>

      {/* Notification Settings */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Notificações</Text>
          
          <List.Item
            title="Lembretes de Exercício"
            description="Receber lembretes para se exercitar"
            left={() => <MaterialIcons name="fitness-center" size={24} color={theme.colors.primary} />}
            right={() => (
              <Switch
                value={currentUser?.preferences?.exerciseReminders ?? true}
                onValueChange={(value) => handleNotificationToggle('exercise', value)}
              />
            )}
          />
          
          <List.Item
            title="Lembretes de Hidratação"
            description="Receber lembretes para beber água"
            left={() => <MaterialIcons name="local-drink" size={24} color={theme.colors.primary} />}
            right={() => (
              <Switch
                value={currentUser?.preferences?.hydrationReminders ?? true}
                onValueChange={(value) => handleNotificationToggle('hydration', value)}
              />
            )}
          />
          
          <List.Item
            title="Lembretes de Meditação"
            description="Receber lembretes para meditar"
            left={() => <MaterialIcons name="self-improvement" size={24} color={theme.colors.primary} />}
            right={() => (
              <Switch
                value={currentUser?.preferences?.meditationReminders ?? true}
                onValueChange={(value) => handleNotificationToggle('meditation', value)}
              />
            )}
          />
        </Card.Content>
      </Card>

      {/* Reminder Tone */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Tom dos Lembretes</Text>
          {reminderTones.map((tone) => (
            <List.Item
              key={tone.key}
              title={tone.label}
              description={tone.description}
              left={() => (
                <MaterialIcons 
                  name={currentUser?.preferences?.reminderTone === tone.key ? 'radio-button-checked' : 'radio-button-unchecked'} 
                  size={24} 
                  color={theme.colors.primary} 
                />
              )}
              onPress={() => handleReminderToneChange(tone.key)}
            />
          ))}
        </Card.Content>
      </Card>

      {/* App Info */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Sobre o App</Text>
          
          <List.Item
            title="Versão"
            description="1.0.0"
            left={() => <MaterialIcons name="info" size={24} color={theme.colors.primary} />}
          />
          
          <List.Item
            title="Política de Privacidade"
            left={() => <MaterialIcons name="privacy-tip" size={24} color={theme.colors.primary} />}
            right={() => <MaterialIcons name="chevron-right" size={24} color={theme.colors.placeholder} />}
          />
          
          <List.Item
            title="Termos de Uso"
            left={() => <MaterialIcons name="article" size={24} color={theme.colors.primary} />}
            right={() => <MaterialIcons name="chevron-right" size={24} color={theme.colors.placeholder} />}
          />
          
          <List.Item
            title="Suporte"
            left={() => <MaterialIcons name="help" size={24} color={theme.colors.primary} />}
            right={() => <MaterialIcons name="chevron-right" size={24} color={theme.colors.placeholder} />}
          />
        </Card.Content>
      </Card>

      {/* Logout */}
      <Card style={styles.card}>
        <Card.Content>
          <Button 
            mode="outlined" 
            onPress={handleLogout}
            style={styles.logoutButton}
            textColor={theme.colors.notification}
          >
            Sair da Conta
          </Button>
        </Card.Content>
      </Card>

      {/* Name Edit Dialog */}
      <Portal>
        <Dialog visible={showNameDialog} onDismiss={() => setShowNameDialog(false)}>
          <Dialog.Title>Editar Nome</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Nome"
              value={newName}
              onChangeText={setNewName}
              mode="outlined"
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowNameDialog(false)}>Cancelar</Button>
            <Button onPress={handleNameUpdate}>Salvar</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: theme.colors.primary,
  },
  profileInfo: {
    marginLeft: spacing.md,
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 14,
    color: theme.colors.placeholder,
    marginBottom: spacing.sm,
  },
  editButton: {
    alignSelf: 'flex-start',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: spacing.md,
  },
  logoutButton: {
    borderColor: theme.colors.notification,
  },
});

export default ProfileScreen;
