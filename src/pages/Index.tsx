
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import MealCard from '@/components/MealCard';

const Index = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View>
            <Text variant="bodySmall" style={styles.dateText}>Aujourd'hui</Text>
            <Text variant="headlineMedium" style={styles.title}>Journal alimentaire</Text>
          </View>
          <View>
            <Text variant="bodySmall" style={styles.totalLabel}>Total</Text>
            <Text variant="titleLarge" style={styles.totalCalories}>1200 cal</Text>
          </View>
        </View>

        <View style={styles.mealsContainer}>
          <MealCard
            title="Petit-déjeuner"
            calories={300}
            time="07:00 - 09:00"
          />
          <MealCard
            title="Déjeuner"
            calories={500}
            time="12:00 - 14:00"
          />
          <MealCard
            title="Dîner"
            calories={400}
            time="19:00 - 21:00"
          />
          <MealCard
            title="Collations"
            calories={0}
            time="Toute la journée"
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
    marginTop: 60, // Pour éviter le notch sur iOS
  },
  dateText: {
    color: '#666',
  },
  title: {
    fontWeight: 'bold',
  },
  totalLabel: {
    color: '#666',
    textAlign: 'right',
  },
  totalCalories: {
    fontWeight: 'bold',
    color: '#10b981',
  },
  mealsContainer: {
    gap: 16,
  },
});

export default Index;
