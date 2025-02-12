
import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface MealCardProps {
  title: string;
  calories: number;
  time: string;
}

const MealCard = ({ title, calories, time }: MealCardProps) => {
  return (
    <Card className="p-4 mb-4 bg-white/80 backdrop-blur-sm border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in">
      <div className="flex items-center justify-between mb-2">
        <div>
          <span className="text-xs text-gray-500">{time}</span>
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        </div>
        <Button variant="ghost" size="icon" className="hover:bg-primary/10">
          <Plus className="h-5 w-5 text-primary" />
        </Button>
      </div>
      <div className="mt-2">
        <span className="text-sm text-gray-600">{calories} calories</span>
      </div>
    </Card>
  );
};

export default MealCard;
