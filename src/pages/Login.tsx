import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Search, Mail, Lock, ArrowLeft, UserPlus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { loginUser } from "@/store/authSlice";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const schema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch<AppDispatch>();
  const user =
    useSelector((state: RootState) => state.auth.user) ||
    JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const onSubmit = async (data: { email: string; password: string }) => {
    setIsLoading(true);
    try {
      const resultAction = await dispatch(loginUser(data));
      if (loginUser.fulfilled.match(resultAction)) {
        toast({
          title: "Welcome back!",
          description:
            "You've been successfully signed in to your HR dashboard.",
        });
        navigate("/dashboard");
        return;
      } else {
        const errorMsg =
          (resultAction.payload as { message?: string })?.message ||
          "Invalid credentials";
        toast({
          title: "Login failed",
          description: errorMsg,
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Header */}
        <div className="text-center">
          <Link
            to="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>

          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Search className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              TalentScout AI
            </span>
          </div>
          <p className="text-gray-600 text-sm">
            Professional HR recruitment platform
          </p>
        </div>

        {/* Main Card */}
        <div className="mt-8">
          <Card className="shadow-lg border border-gray-200">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-semibold text-gray-900">
                Sign in to your account
              </CardTitle>
              <CardDescription className="text-gray-600">
                Access your HR talent discovery dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div>
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700"
                  >
                    Email address
                  </Label>
                  <div className="mt-1 relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      {...register("email")}
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10 h-11 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-700"
                  >
                    Password
                  </Label>
                  <div className="mt-1 relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      {...register("password")}
                      type="password"
                      placeholder="Enter your password"
                      className="pl-10 h-11 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full h-11 bg-blue-600 hover:bg-blue-700 font-medium shadow-sm"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Signing in...
                    </>
                  ) : (
                    "Sign in"
                  )}
                </Button>
              </form>

              <Separator />

              <div className="text-center">
                <p className="text-sm text-gray-600 mb-4">
                  Don't have an account?
                </p>
                <Link to="/register">
                  <Button
                    variant="outline"
                    className="w-full h-11 border-gray-300 hover:bg-gray-50"
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    Create account
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            Secure • Professional • Trusted by HR teams worldwide
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
