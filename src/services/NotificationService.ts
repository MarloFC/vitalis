import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Configure notification handling
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

class NotificationService {
  static async init(): Promise<void> {
    try {
      // Request permissions
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        console.warn('Failed to get push token for push notification!');
        return;
      }

      // Configure notification channel for Android
      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'Vitalis Notifications',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#6B9BD2',
        });
      }
    } catch (error) {
      console.error('Error initializing notifications:', error);
    }
  }

  static async scheduleHydrationReminder(
    title: string = 'Hora de se hidratar! 💧',
    body: string = 'Que tal beber um copo de água agora?',
    intervalMinutes: number = 120
  ): Promise<string | null> {
    try {
      const identifier = await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          sound: 'default',
        },
        trigger: {
          seconds: intervalMinutes * 60,
          repeats: true,
        },
      });
      return identifier;
    } catch (error) {
      console.error('Error scheduling hydration reminder:', error);
      return null;
    }
  }

  static async scheduleExerciseReminder(
    title: string = 'Hora de se mexer! 🏃‍♀️',
    body: string = 'Que tal fazer uma pausa para se exercitar?',
    hour: number = 9,
    minute: number = 0
  ): Promise<string | null> {
    try {
      const identifier = await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          sound: 'default',
        },
        trigger: {
          hour,
          minute,
          repeats: true,
        },
      });
      return identifier;
    } catch (error) {
      console.error('Error scheduling exercise reminder:', error);
      return null;
    }
  }

  static async scheduleMeditationReminder(
    title: string = 'Momento de relaxar 🧘‍♀️',
    body: string = 'Que tal uma pausa para respirar e meditar?',
    hour: number = 18,
    minute: number = 0
  ): Promise<string | null> {
    try {
      const identifier = await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          sound: 'default',
        },
        trigger: {
          hour,
          minute,
          repeats: true,
        },
      });
      return identifier;
    } catch (error) {
      console.error('Error scheduling meditation reminder:', error);
      return null;
    }
  }

  static async scheduleAchievementNotification(
    title: string,
    body: string
  ): Promise<string | null> {
    try {
      const identifier = await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          sound: 'default',
        },
        trigger: null, // Show immediately
      });
      return identifier;
    } catch (error) {
      console.error('Error scheduling achievement notification:', error);
      return null;
    }
  }

  static async cancelNotification(identifier: string): Promise<void> {
    try {
      await Notifications.cancelScheduledNotificationAsync(identifier);
    } catch (error) {
      console.error('Error canceling notification:', error);
    }
  }

  static async cancelAllNotifications(): Promise<void> {
    try {
      await Notifications.cancelAllScheduledNotificationsAsync();
    } catch (error) {
      console.error('Error canceling all notifications:', error);
    }
  }

  static async getScheduledNotifications(): Promise<Notifications.NotificationRequest[]> {
    try {
      return await Notifications.getAllScheduledNotificationsAsync();
    } catch (error) {
      console.error('Error getting scheduled notifications:', error);
      return [];
    }
  }
}

export default NotificationService;
