
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Login = () => {
  const [loginType, setLoginType] = useState<"admin" | "student">("admin");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated, userInfo, login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const success = await login(
      loginType === "admin" ? "Admin" : username, 
      password
    );
    
    setIsLoading(false);
    
    if (success) {
      // Navigation will happen automatically via the auth check
    }
  };

  if (isAuthenticated) {
    if (userInfo?.role === "admin") {
      return <Navigate to="/" />;
    } else {
      return <Navigate to="/student-feedback" />;
    }
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-4">
        <Card>
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold text-wastewise-green-600">WasteWise</CardTitle>
            <CardDescription>Enter your credentials to log in</CardDescription>
          </CardHeader>
          
          <Tabs value={loginType} onValueChange={(v) => setLoginType(v as "admin" | "student")}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="admin">Admin</TabsTrigger>
              <TabsTrigger value="student">Student</TabsTrigger>
            </TabsList>
            
            <form onSubmit={handleSubmit}>
              <TabsContent value="admin">
                <CardContent className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <label htmlFor="admin-username" className="text-sm font-medium">Username</label>
                    <Input
                      id="admin-username"
                      value="Admin"
                      readOnly
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="admin-password" className="text-sm font-medium">Password</label>
                    <Input
                      id="admin-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="Enter admin password"
                    />
                  </div>
                </CardContent>
              </TabsContent>
              
              <TabsContent value="student">
                <CardContent className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <label htmlFor="student-username" className="text-sm font-medium">Username</label>
                    <Input
                      id="student-username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      placeholder="student"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="student-password" className="text-sm font-medium">Password</label>
                    <Input
                      id="student-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="student123"
                    />
                  </div>
                </CardContent>
              </TabsContent>
              
              <CardFooter className="px-6 pb-6">
                <Button 
                  type="submit"
                  className="w-full bg-wastewise-green-600 hover:bg-wastewise-green-700" 
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Log in"}
                </Button>
              </CardFooter>
            </form>
          </Tabs>
          
          {loginType === "student" && (
            <div className="px-6 pb-6 text-center text-sm text-gray-500">
              Default student login: username "student", password "student123"
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Login;
