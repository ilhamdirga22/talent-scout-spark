import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";
// import Index from "./pages/Index";
import Chat from "./pages/Chat";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const queryClient = new QueryClient();

function ProtectedRoute() {
  // Check Redux state first, then fallback to localStorage
  const user =
    useSelector((state: RootState) => state.auth.user) ||
    JSON.parse(localStorage.getItem("user") || "null");
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            {/* <Route path="/search" element={<Index />} /> */}
            <Route path="/chat" element={<Chat />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
