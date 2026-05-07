import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { SignedIn, SignedOut } from '@clerk/clerk-expo';

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Speakwise</Text>
      <Text style={styles.tag}>Learn Italian with an AI tutor that remembers you.</Text>

      <SignedOut>
        <Link href="/sign-in" asChild>
          <Pressable style={styles.cta}><Text style={styles.ctaText}>Sign in</Text></Pressable>
        </Link>
      </SignedOut>
      <SignedIn>
        <Link href="/(app)/command-center" asChild>
          <Pressable style={styles.cta}><Text style={styles.ctaText}>Open Speakwise</Text></Pressable>
        </Link>
      </SignedIn>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f6f3', padding: 24, justifyContent: 'center' },
  title: { fontSize: 40, fontWeight: '600' },
  tag: { fontSize: 16, color: '#4d4c43', marginTop: 12, marginBottom: 32 },
  cta: { backgroundColor: '#ed7d09', borderRadius: 999, paddingVertical: 14, alignItems: 'center' },
  ctaText: { color: 'white', fontSize: 16, fontWeight: '600' },
});
