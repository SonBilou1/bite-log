
import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { useState } from "react";
import { AddFoodDialog } from "./AddFoodDialog";

interface MealCardProps {
  title: string;
  calories: number;
  time: string;
}

const MealCard = ({ title, calories, time }: MealCardProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddFood = (food: any) => {
    console.log("Adding food to", title, ":", food);
    // Ici, vous pourrez ajouter la logique pour sauvegarder l'aliment dans la base de données
  };

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
        <div className="mt-2">
          <span className="text-sm text-muted-foreground">{calories} calories</span>
        </div>
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
