import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { MainLayout } from './components/Layout/MainLayout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Collections } from './pages/Collections';
import { CollectionDetail } from './pages/CollectionDetail';
import { Drawings } from './pages/Drawings';
import { AdminGate } from './pages/admin/AdminGate';
import { AdminAbout } from './pages/admin/AdminAbout';
import { AdminCollections } from './pages/admin/AdminCollections';
import { AdminDrawings } from './pages/admin/AdminDrawings';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="collections" element={<Collections />} />
          <Route path="collections/:slug" element={<CollectionDetail />} />
          <Route path="drawings" element={<Drawings />} />
        </Route>
        <Route path="/admin" element={<AdminGate />}>
          <Route index element={<AdminAbout />} />
          <Route path="collections" element={<AdminCollections />} />
          <Route path="drawings" element={<AdminDrawings />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
