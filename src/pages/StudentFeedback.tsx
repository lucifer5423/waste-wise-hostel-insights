
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import { LogOut } from "lucide-react";
import { toast } from "sonner";

type MealType = "breakfast" | "lunch" | "dinner" | "snacks";
type Rating = 1 | 2 | 3 | 4 | 5;

const StudentFeedback = () => {
  const navigate = useNavigate();
  const { logout, userInfo } = useAuth();
  const [selectedMeal, setSelectedMeal] = useState<MealType>("breakfast");
  const [rating, setRating] = useState<Rating | null>(null);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!rating) {
      toast.error("Please select a rating");
      return;
    }
    
    setSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Feedback submitted successfully!");
      setRating(null);
      setComment("");
      setSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b p-4 flex justify-between items-center">
        <div className="text-xl font-bold text-wastewise-green-600">WasteWise Student</div>
        <div className="flex items-center gap-4">
          <div className="text-sm">
            Logged in as <span className="font-medium">{userInfo?.username}</span>
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={handleLogout}
            className="text-red-500 hover:bg-red-500/10"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </header>
      
      <main className="flex-1 p-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Meal Feedback</h1>
          
          <Card>
            <CardHeader>
              <CardTitle>Submit Your Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Select Meal</label>
                  <Tabs 
                    defaultValue="breakfast" 
                    value={selectedMeal}
                    onValueChange={(value) => setSelectedMeal(value as MealType)}
                    className="w-full"
                  >
                    <TabsList className="grid grid-cols-4 w-full">
                      <TabsTrigger value="breakfast">Breakfast</TabsTrigger>
                      <TabsTrigger value="lunch">Lunch</TabsTrigger>
                      <TabsTrigger value="dinner">Dinner</TabsTrigger>
                      <TabsTrigger value="snacks">Snacks</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setRating(value as Rating)}
                        className={`h-10 w-10 rounded-full flex items-center justify-center text-lg ${
                          rating === value
                            ? "bg-wastewise-green-600 text-white"
                            : "bg-gray-100 hover:bg-gray-200"
                        }`}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                  <div className="mt-1 text-sm text-gray-500">
                    {rating === 1 && "Poor"}
                    {rating === 2 && "Fair"}
                    {rating === 3 && "Good"}
                    {rating === 4 && "Very Good"}
                    {rating === 5 && "Excellent"}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="comment" className="block text-sm font-medium mb-2">Comments (Optional)</label>
                  <textarea
                    id="comment"
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Please share your thoughts about the meal..."
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-wastewise-green-600 hover:bg-wastewise-green-700"
                  disabled={submitting}
                >
                  {submitting ? "Submitting..." : "Submit Feedback"}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="text-sm text-gray-500 border-t pt-4">
              Your feedback helps us improve the quality of our meals and reduce food waste.
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default StudentFeedback;
