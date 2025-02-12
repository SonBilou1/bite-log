
import Header from "@/components/Header";
import MealCard from "@/components/MealCard";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-16 animate-fade-in">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-sm text-gray-500">Aujourd'hui</span>
              <h2 className="text-2xl font-bold text-gray-800">Journal alimentaire</h2>
            </div>
            <div className="text-right">
              <span className="text-sm text-gray-500">Total</span>
              <p className="text-xl font-semibold text-primary">1200 cal</p>
            </div>
          </div>

          <div className="space-y-6">
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
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
