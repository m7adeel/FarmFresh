import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2940&auto=format&fit=crop' }}
        style={StyleSheet.absoluteFill}
      />
      <LinearGradient
        colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.8)']}
        style={StyleSheet.absoluteFill}
      />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>FarmFresh Market</Text>
          <Text style={styles.subtitle}>Fresh From Farm To Your Table</Text>
        </View>

        <View style={styles.features}>
          <FeatureItem
            title="Local Markets"
            description="Discover fresh produce from local farmers markets"
          />
          <FeatureItem
            title="Direct Support"
            description="Support local farmers and artisans directly"
          />
          <FeatureItem
            title="Quality Assured"
            description="Get the freshest, highest quality products"
          />
        </View>

        <View style={styles.buttons}>
          <Link href="/sign-in" asChild>
            <TouchableOpacity style={styles.signInButton}>
              <Text style={styles.signInText}>Sign In</Text>
            </TouchableOpacity>
          </Link>
          
          <Link href="/sign-up" asChild>
            <TouchableOpacity style={styles.signUpButton}>
              <Text style={styles.signUpText}>Create Account</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </View>
  );
}

function FeatureItem({ title, description }: { title: string; description: string }) {
  return (
    <View style={styles.featureItem}>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureDescription}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 24,
    paddingBottom: 48,
  },
  header: {
    marginTop: 120,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 40,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
    opacity: 0.9,
  },
  features: {
    gap: 24,
  },
  featureItem: {
    alignItems: 'center',
  },
  featureTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: '#ffffff',
    marginBottom: 8,
  },
  featureDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#ffffff',
    opacity: 0.8,
    textAlign: 'center',
  },
  buttons: {
    gap: 16,
  },
  signInButton: {
    backgroundColor: '#16a34a',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  signInText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#ffffff',
  },
  signUpButton: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  signUpText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#ffffff',
  },
});