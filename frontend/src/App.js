import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CandidateResumes from './components/CandidateResumes';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CandidateResumes />} />
        <Route path="/candidates/resumes" element={<CandidateResumes />} />
      </Routes>
    </Router>
  );
}

export default App;
