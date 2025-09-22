import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Listings from './pages/Listings';
import ListingDetail from './pages/ListingDetail';
import CreateListing from './pages/CreateListing';
import EducationHub from './pages/education/EducationHub';
import Courses from './pages/education/Courses';
import Licensing from './pages/education/Licensing';
import SelfRepresentation from './pages/education/SelfRepresentation';
import RecoResources from './pages/education/RecoResources';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/listings" element={<Layout><Listings /></Layout>} />
          <Route path="/listings/:id" element={<Layout><ListingDetail /></Layout>} />
          <Route path="/create-listing" element={<Layout><CreateListing /></Layout>} />
          <Route path="/education" element={<Layout><EducationHub /></Layout>} />
          <Route path="/education/courses" element={<Layout><Courses /></Layout>} />
          <Route path="/education/licensing" element={<Layout><Licensing /></Layout>} />
          <Route path="/education/self-representation" element={<Layout><SelfRepresentation /></Layout>} />
          <Route path="/education/reco-resources" element={<Layout><RecoResources /></Layout>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
