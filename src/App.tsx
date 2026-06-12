import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppLayout } from './components/AppLayout';
import { Home } from './pages/Home';
import { Courses } from './pages/Courses';
import { CourseDetail } from './pages/CourseDetail';
import { LessonPlayer } from './pages/LessonPlayer';
import { Dashboard } from './pages/Dashboard';
import { Settings } from './pages/Settings';
import { ChallengePlayer } from './pages/ChallengePlayer';
import { FAQ, Contact, Privacy, Terms } from './pages/StaticPages';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
           <Route index element={<Home />} />
           <Route path="courses" element={<Courses />} />
           <Route path="course/:id" element={<CourseDetail />} />
           <Route path="learn/:courseId" element={<LessonPlayer />} />
           <Route path="learn/:courseId/:lessonId" element={<LessonPlayer />} />
           <Route path="challenge/:id" element={<ChallengePlayer />} />
           <Route path="dashboard" element={<Dashboard />} />
           <Route path="settings" element={<Settings />} />
           <Route path="faq" element={<FAQ />} />
           <Route path="contact" element={<Contact />} />
           <Route path="privacy" element={<Privacy />} />
           <Route path="terms" element={<Terms />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
