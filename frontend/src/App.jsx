import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const LandingPage = lazy(() => import('./pages/LandingPage.jsx'));
const AdminPage = lazy(() => import('./pages/AdminPage.jsx'));

export default function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </Suspense>
  );
}
