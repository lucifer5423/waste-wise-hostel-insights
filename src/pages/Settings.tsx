
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import CsvImport from "@/components/dashboard/CsvImport";

const Settings = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { isAuthenticated, updatePassword } = useAuth();

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast({
        title: "Error",
        description: "All fields are required",
        variant: "destructive",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const success = await updatePassword(currentPassword, newPassword);
      
      if (success) {
        toast({
          title: "Success",
          description: "Password has been changed successfully",
        });
        
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        toast({
          title: "Error",
          description: "Current password is incorrect",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to change password",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-background to-secondary/30">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-gradient">Settings</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="animate-fade-in glass-card border-primary/10">
                <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent rounded-t-lg">
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5 text-primary" />
                    <span>Change Password</span>
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Update your account password
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleChangePassword}>
                  <CardContent className="space-y-4 pt-6">
                    <div className="space-y-2">
                      <label htmlFor="current-password" className="text-sm font-medium">Current Password</label>
                      <Input
                        id="current-password"
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="bg-background/50 backdrop-blur-sm border-primary/10 focus-visible:ring-primary/30"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="new-password" className="text-sm font-medium">New Password</label>
                      <Input
                        id="new-password"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="bg-background/50 backdrop-blur-sm border-primary/10 focus-visible:ring-primary/30"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="confirm-password" className="text-sm font-medium">Confirm New Password</label>
                      <Input
                        id="confirm-password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="bg-background/50 backdrop-blur-sm border-primary/10 focus-visible:ring-primary/30"
                        required
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="bg-gradient-to-r from-transparent to-primary/5 rounded-b-lg">
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="bg-primary hover:bg-primary/90"
                    >
                      {isSubmitting ? "Updating..." : "Change Password"}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
              
              <CsvImport />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
