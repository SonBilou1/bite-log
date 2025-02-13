
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Surface, Text, DataTable, IconButton } from 'react-native-paper';
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
          <DataTable style={styles.table}>
            <DataTable.Header>
              <DataTable.Title>Aliment</DataTable.Title>
              <DataTable.Title numeric>Calories</DataTable.Title>
              <DataTable.Title numeric>Prot.</DataTable.Title>
              <DataTable.Title numeric>Gluc.</DataTable.Title>
              <DataTable.Title numeric>Lip.</DataTable.Title>
            </DataTable.Header>

            {foods.map((food, index) => (
              <DataTable.Row key={index}>
                <DataTable.Cell>{food.name}</DataTable.Cell>
                <DataTable.Cell numeric>{food.calories} kcal</DataTable.Cell>
                <DataTable.Cell numeric>{food.proteins}g</DataTable.Cell>
                <DataTable.Cell numeric>{food.carbs}g</DataTable.Cell>
                <DataTable.Cell numeric>{food.fats}g</DataTable.Cell>
              </DataTable.Row>
            ))}

            <DataTable.Row style={styles.totalRow}>
              <DataTable.Cell>Total</DataTable.Cell>
              <DataTable.Cell numeric>{totals.calories} kcal</DataTable.Cell>
              <DataTable.Cell numeric>{totals.proteins}g</DataTable.Cell>
              <DataTable.Cell numeric>{totals.carbs}g</DataTable.Cell>
              <DataTable.Cell numeric>{totals.fats}g</DataTable.Cell>
            </DataTable.Row>
          </DataTable>
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
  table: {
    marginTop: 16,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  emptyText: {
    color: '#666',
    marginTop: 8,
  },
});

export default MealCard;
