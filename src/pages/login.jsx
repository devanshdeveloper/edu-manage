import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { School } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { Card, CardBody } from "@heroui/card";
import { Input } from "@heroui/input";
import { Checkbox } from "@heroui/checkbox";
import { Button } from "@heroui/button";
import { Logo } from "../components/Logo";

export function LoginPage() {
  const navigate = useNavigate();
  const { login, isLoading, error } = useAuth();
  const [credentials, setCredentials] = useState({
    email: "admin@admin.com",
    password: "12345678",
    remember: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(credentials);
    navigate("/app/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center">
          <Logo />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Please sign in to your account
          </p>
        </div>

        <Card className="shadow-xl">
          <CardBody className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Email address"
                type="email"
                variant="bordered"
                value={credentials.email}
                onChange={(e) =>
                  setCredentials((prev) => ({ ...prev, email: e.target.value }))
                }
                required
              />

              <Input
                label="Password"
                type="password"
                variant="bordered"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                required
              />

              {error && (
                <div className="p-3 bg-danger-50 border border-danger-200 rounded-lg">
                  <p className="text-danger text-sm">{error}</p>
                </div>
              )}

              <div className="flex items-center justify-between">
                <Checkbox
                  isSelected={credentials.remember}
                  onValueChange={(checked) =>
                    setCredentials((prev) => ({ ...prev, remember: checked }))
                  }
                >
                  Remember me
                </Checkbox>
                <Link href="#" size="sm">
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                color="primary"
                fullWidth
                size="lg"
                isLoading={isLoading}
              >
                Sign in
              </Button>
            </form>
          </CardBody>
        </Card>

        <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link href="#" className="font-semibold">
            Contact your administrator
          </Link>
        </p>
      </div>
    </div>
  );
}
