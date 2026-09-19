import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import "./App.css";

const FormulaLibrary = lazy(() => import("./pages/FormulaLibrary"));
const FormulaPage = lazy(() => import("./pages/FormulaPage"));
const TopicPage = lazy(() => import("./pages/TopicPage"));
const Calculators = lazy(() => import("./pages/Calculators"));
const FormulaFinder = lazy(() => import("./pages/FormulaFinder"));

function LoadingFallback() {
  return (
    <div className="page-loading-spinner" style={{ padding: "80px 20px", textAlign: "center", color: "#64748b" }}>
      <p>Loading calculator...</p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />

        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/formulas" element={<FormulaLibrary />} />
            <Route path="/formulas/:formulaId" element={<FormulaPage />} />
            <Route path="/topics/:topicSlug" element={<TopicPage />} />
            <Route path="/calculators" element={<Calculators />} />
            <Route path="/formula-finder" element={<FormulaFinder />} />
            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;