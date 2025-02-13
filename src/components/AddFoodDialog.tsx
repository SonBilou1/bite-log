
import React, { useState } from 'react';
import { View, Modal, TextInput, StyleSheet } from 'react-native';
import { Button, Text, Surface } from 'react-native-paper';

interface AddFoodDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddFood: (food: FoodItem) => void;
}

interface FoodItem {
  name: string;
  calories: number;
  proteins: number;
  carbs: number;
  fats: number;
}

export const AddFoodDialog = ({ isOpen, onClose, onAddFood }: AddFoodDialogProps) => {
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [food, setFood] = useState<FoodItem>({
    name: '',
    calories: 0,
    proteins: 0,
    carbs: 0,
    fats: 0,
  });

  const handleSubmit = () => {
    onAddFood(food);
    setFood({
      name: '',
      calories: 0,
      proteins: 0,
      carbs: 0,
      fats: 0,
    });
    setIsCreatingNew(false);
    onClose();
  };

  return (
    <Modal
      visible={isOpen}
      onDismiss={onClose}
      transparent
      animationType="slide"
    >
      <View style={styles.modalContainer}>
        <Surface style={styles.modalContent}>
          <Text variant="headlineSmall" style={styles.title}>
            {isCreatingNew ? "Créer un nouvel aliment" : "Ajouter un aliment"}
          </Text>

          {!isCreatingNew ? (
            <View style={styles.searchContainer}>
              <TextInput
                placeholder="Rechercher un aliment..."
                style={styles.input}
              />
              <Text style={styles.noResults}>Aucun aliment trouvé</Text>
              <Button
                mode="outlined"
                onPress={() => setIsCreatingNew(true)}
                style={styles.button}
              >
                Créer un nouvel aliment
              </Button>
            </View>
          ) : (
            <View style={styles.form}>
              <TextInput
                placeholder="Nom de l'aliment"
                value={food.name}
                onChangeText={(text) => setFood({ ...food, name: text })}
                style={styles.input}
              />
              <TextInput
                placeholder="Calories (kcal)"
                value={food.calories.toString()}
                onChangeText={(text) => setFood({ ...food, calories: Number(text) || 0 })}
                keyboardType="numeric"
                style={styles.input}
              />
              <View style={styles.macrosContainer}>
                <TextInput
                  placeholder="Protéines (g)"
                  value={food.proteins.toString()}
                  onChangeText={(text) => setFood({ ...food, proteins: Number(text) || 0 })}
                  keyboardType="numeric"
                  style={[styles.input, styles.macroInput]}
                />
                <TextInput
                  placeholder="Glucides (g)"
                  value={food.carbs.toString()}
                  onChangeText={(text) => setFood({ ...food, carbs: Number(text) || 0 })}
                  keyboardType="numeric"
                  style={[styles.input, styles.macroInput]}
                />
                <TextInput
                  placeholder="Lipides (g)"
                  value={food.fats.toString()}
                  onChangeText={(text) => setFood({ ...food, fats: Number(text) || 0 })}
                  keyboardType="numeric"
                  style={[styles.input, styles.macroInput]}
                />
              </View>
              <View style={styles.buttonContainer}>
                <Button
                  mode="outlined"
                  onPress={() => setIsCreatingNew(false)}
                  style={styles.button}
                >
                  Retour
                </Button>
                <Button
                  mode="contained"
                  onPress={handleSubmit}
                  style={styles.button}
                >
                  Ajouter
                </Button>
              </View>
            </View>
          )}
        </Surface>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    padding: 20,
    borderRadius: 10,
  },
  title: {
    marginBottom: 20,
    textAlign: 'center',
  },
  searchContainer: {
    gap: 10,
  },
  form: {
    gap: 15,
  },
  input: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  macrosContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  macroInput: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 10,
  },
  button: {
    marginVertical: 5,
  },
  noResults: {
    textAlign: 'center',
    color: '#666',
    marginVertical: 20,
  },
});
