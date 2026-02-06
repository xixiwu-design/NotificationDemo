import React from 'react';
import { View, Button, PermissionsAndroid, Platform } from 'react-native';
import notifee, { AndroidImportance } from '@notifee/react-native';

export default function App() {

  async function requestPermission() {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      );
    }
  }

  async function showHeadsUp() {
    await requestPermission();

    // Crea un canal de notificación
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH, 
      sound: 'default',
      vibration: true,
    });

    // mostrar notificacion
    await notifee.displayNotification({
      title: 'Notification heads-up',
      body: 'This is a notification you received.',
      android: {
        channelId,
        pressAction: { id: 'default' },
        smallIcon: 'ic_launcher_round', 
      },
    });
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Enter notification" onPress={showHeadsUp} />
    </View>
  );
}
