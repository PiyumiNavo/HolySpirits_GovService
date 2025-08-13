import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home";
import AppLayout from "./components/AppLayout";
import PermissionRoute from "./components/PermissionRoute";
import { useSystemStore } from "./stores/useSystemStore";


const queryClient = new QueryClient();

function App() {
  const theme = useSystemStore((state) => state.theme);

  // Apply theme to document when component mounts or theme changes
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const router = createBrowserRouter([
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
