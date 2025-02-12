
import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { useState } from "react";
import { AddFoodDialog } from "./AddFoodDialog";
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from "./ui/table";

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

const MealCard = ({ title, calories: initialCalories, time }: MealCardProps) => {
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
      <Card className="p-4 mb-4 bg-card/80 backdrop-blur-sm border-border/50 shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in">
        <div className="flex items-center justify-between mb-2">
          <div>
            <span className="text-xs text-muted-foreground">{time}</span>
            <h3 className="text-lg font-semibold">{title}</h3>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-primary/10"
            onClick={() => setIsDialogOpen(true)}
          >
            <Plus className="h-5 w-5 text-primary" />
          </Button>
        </div>

        {foods.length > 0 ? (
          <div className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Aliment</TableHead>
                  <TableHead className="text-right">Calories</TableHead>
                  <TableHead className="text-right hidden sm:table-cell">Prot.</TableHead>
                  <TableHead className="text-right hidden sm:table-cell">Gluc.</TableHead>
                  <TableHead className="text-right hidden sm:table-cell">Lip.</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {foods.map((food, index) => (
                  <TableRow key={index}>
                    <TableCell>{food.name}</TableCell>
                    <TableCell className="text-right">{food.calories} kcal</TableCell>
                    <TableCell className="text-right hidden sm:table-cell">{food.proteins}g</TableCell>
                    <TableCell className="text-right hidden sm:table-cell">{food.carbs}g</TableCell>
                    <TableCell className="text-right hidden sm:table-cell">{food.fats}g</TableCell>
                  </TableRow>
                ))}
                <TableRow className="border-t-2">
                  <TableCell className="font-medium">Total</TableCell>
                  <TableCell className="text-right font-medium">{totals.calories} kcal</TableCell>
                  <TableCell className="text-right font-medium hidden sm:table-cell">{totals.proteins}g</TableCell>
                  <TableCell className="text-right font-medium hidden sm:table-cell">{totals.carbs}g</TableCell>
                  <TableCell className="text-right font-medium hidden sm:table-cell">{totals.fats}g</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="mt-2">
            <span className="text-sm text-muted-foreground">Aucun aliment ajouté</span>
          </div>
        )}
      </Card>

      <AddFoodDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onAddFood={handleAddFood}
      />
    </>
  );
};

export default MealCard;
