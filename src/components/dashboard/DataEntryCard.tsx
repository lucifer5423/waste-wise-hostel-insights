
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snacks"];
const foodItems = ["Rice", "Bread", "Vegetables", "Meat", "Fruits", "Soup", "Dessert"];

const DataEntryCard = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [mealType, setMealType] = useState("");
  const [foodItem, setFoodItem] = useState("");
  const [quantity, setQuantity] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!date || !mealType || !foodItem || !quantity) {
      toast({
        title: "Missing information",
        description: "Please fill in all the required fields",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, this would send data to an API
    toast({
      title: "Data submitted successfully",
      description: `Added ${quantity}kg of ${foodItem} waste for ${mealType} on ${format(date, "PPP")}`,
    });
    
    // Clear form
    setMealType("");
    setFoodItem("");
    setQuantity("");
  };

  return (
    <Card className="dashboard-card">
      <CardHeader>
        <CardTitle>Record Food Wastage</CardTitle>
        <CardDescription>Enter details about wasted food items</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="meal-type">Meal Type</Label>
            <Select value={mealType} onValueChange={setMealType}>
              <SelectTrigger>
                <SelectValue placeholder="Select meal type" />
              </SelectTrigger>
              <SelectContent>
                {mealTypes.map((meal) => (
                  <SelectItem key={meal} value={meal}>{meal}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="food-item">Food Item</Label>
            <Select value={foodItem} onValueChange={setFoodItem}>
              <SelectTrigger>
                <SelectValue placeholder="Select food item" />
              </SelectTrigger>
              <SelectContent>
                {foodItems.map((item) => (
                  <SelectItem key={item} value={item}>{item}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity (kg)</Label>
            <Input
              id="quantity"
              type="number"
              step="0.1"
              min="0"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Enter quantity in kg"
            />
          </div>
          
          <Button type="submit" className="w-full">Submit Data</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default DataEntryCard;
