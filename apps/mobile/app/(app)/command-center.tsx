import { useEffect, useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { useApi } from '@/lib/api';

interface Turn { role: 'user' | 'wise'; text: string }

export default function CommandCenter() {
  const api = useApi();
  const [turns, setTurns] = useState<Turn[]>([]);
  const [message, setMessage] = useState('');
  const [pending, setPending] = useState(false);

  useEffect(() => {
    api<{ user: { name: string } }>('/api/me').then((d) => {
      setTurns([{ role: 'wise', text: `Welcome back, ${d.user.name}. What shall we work on today?` }]);
    }).catch(() => {});
  }, []);

  async function send() {
    if (!message.trim()) return;
    const txt = message;
    setTurns((t) => [...t, { role: 'user', text: txt }]);
    setMessage('');
    setPending(true);
    try {
      const res = await api<{ wiseMessage: string }>('/api/wise/message', {
        method: 'POST',
        body: JSON.stringify({ mode: 'text', message: txt }),
      });
      setTurns((t) => [...t, { role: 'wise', text: res.wiseMessage }]);
    } finally {
      setPending(false);
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll} contentContainerStyle={{ padding: 16 }}>
        {turns.map((t, i) => (
          <View key={i} style={styles.turn}>
            <Text style={styles.turnRole}>{t.role === 'user' ? 'You' : 'Wise'}</Text>
            <Text style={styles.turnText}>{t.text}</Text>
          </View>
        ))}
        {pending && <ActivityIndicator />}
      </ScrollView>
      <View style={styles.composer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Talk to Wise…"
        />
        <Pressable onPress={send} style={styles.send}><Text style={styles.sendText}>Send</Text></Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f6f3' },
  scroll: { flex: 1 },
  turn: { marginBottom: 12 },
  turnRole: { fontWeight: '600', marginBottom: 2 },
  turnText: { fontSize: 16, lineHeight: 22 },
  composer: { flexDirection: 'row', padding: 12, gap: 8, borderTopWidth: 1, borderTopColor: '#ecebe6' },
  input: { flex: 1, backgroundColor: 'white', borderRadius: 999, paddingHorizontal: 16, paddingVertical: 10 },
  send: { backgroundColor: '#ed7d09', borderRadius: 999, paddingHorizontal: 18, justifyContent: 'center' },
  sendText: { color: 'white', fontWeight: '600' },
});
