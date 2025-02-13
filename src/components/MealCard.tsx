
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Surface, Text, IconButton } from 'react-native-paper';
import { AddFoodDialog } from './AddFoodDialog';

interface MealCardProps {
  title: string;
  calories: number;
  time: string;
}

interface FoodItem {
  name: string;
  calories: number;
  proteins: number;
  carbs: number;
  fats: number;
}

const NutrientIndicator = ({ label, value, color }: { label: string; value: number; color: string }) => (
  <View style={styles.nutrientContainer}>
    <Text style={[styles.nutrientLabel, { color }]}>{label}</Text>
    <Text style={styles.nutrientValue}>{value}g</Text>
  </View>
);

const MealCard = ({ title, time }: MealCardProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [foods, setFoods] = useState<FoodItem[]>([]);

  const handleAddFood = (food: FoodItem) => {
    setFoods([...foods, food]);
  };

  const totals = foods.reduce(
    (acc, food) => ({
      calories: acc.calories + food.calories,
      proteins: acc.proteins + food.proteins,
      carbs: acc.carbs + food.carbs,
      fats: acc.fats + food.fats,
    }),
    { calories: 0, proteins: 0, carbs: 0, fats: 0 }
  );

  return (
    <>
      <Surface style={styles.card}>
        <View style={styles.header}>
          <View>
            <Text variant="bodySmall" style={styles.time}>{time}</Text>
            <Text variant="titleMedium" style={styles.title}>{title}</Text>
          </View>
          <IconButton
            icon="plus"
            size={24}
            onPress={() => setIsDialogOpen(true)}
          />
        </View>

        {foods.length > 0 ? (
          <View>
            {foods.map((food, index) => (
              <View key={index} style={styles.foodItem}>
                <View style={styles.foodHeader}>
                  <Text>{food.name}</Text>
                  <Text>{food.calories} kcal</Text>
                </View>
                <View style={styles.nutrients}>
                  <NutrientIndicator label="P" value={food.proteins} color="#0FA0CE" />
                  <NutrientIndicator label="G" value={food.carbs} color="#ea384c" />
                  <NutrientIndicator label="L" value={food.fats} color="#F97316" />
                </View>
              </View>
            ))}

            <View style={styles.totalContainer}>
              <View style={styles.totalHeader}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalCalories}>{totals.calories} kcal</Text>
              </View>
              <View style={styles.nutrients}>
                <NutrientIndicator label="P" value={totals.proteins} color="#0FA0CE" />
                <NutrientIndicator label="G" value={totals.carbs} color="#ea384c" />
                <NutrientIndicator label="L" value={totals.fats} color="#F97316" />
              </View>
            </View>
          </View>
        ) : (
          <Text style={styles.emptyText}>Aucun aliment ajouté</Text>
        )}
      </Surface>

      <AddFoodDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onAddFood={handleAddFood}
      />
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  time: {
    color: '#666',
  },
  title: {
    fontWeight: 'bold',
  },
  foodItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  foodHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  nutrients: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 4,
  },
  nutrientContainer: {
    alignItems: 'center',
  },
  nutrientLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  nutrientValue: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  totalContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 2,
    borderTopColor: '#e0e0e0',
  },
  totalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  totalLabel: {
    fontWeight: 'bold',
  },
  totalCalories: {
    fontWeight: 'bold',
  },
  emptyText: {
    color: '#666',
    marginTop: 8,
  },
});

export default MealCard;
