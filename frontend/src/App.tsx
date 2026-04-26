import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReleasesListPage } from "./pages/ReleasesListPage";
import { ReleaseDetailPage } from "./pages/ReleaseDetailPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, refetchOnWindowFocus: false },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen bg-bg px-4 py-10">
          <Routes>
            <Route path="/" element={<ReleasesListPage />} />
            <Route path="/releases/:id" element={<ReleaseDetailPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
