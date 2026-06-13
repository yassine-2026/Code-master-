import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/AppLayout";

const Home = lazy(() =>
  import("./pages/Home").then((m) => ({ default: m.Home })),
);
const Courses = lazy(() =>
  import("./pages/Courses").then((m) => ({ default: m.Courses })),
);
const CourseDetail = lazy(() =>
  import("./pages/CourseDetail").then((m) => ({ default: m.CourseDetail })),
);
const LessonPlayer = lazy(() =>
  import("./pages/LessonPlayer").then((m) => ({ default: m.LessonPlayer })),
);
const Dashboard = lazy(() =>
  import("./pages/Dashboard").then((m) => ({ default: m.Dashboard })),
);
const Settings = lazy(() =>
  import("./pages/Settings").then((m) => ({ default: m.Settings })),
);
const ChallengePlayer = lazy(() =>
  import("./pages/ChallengePlayer").then((m) => ({
    default: m.ChallengePlayer,
  })),
);
const ProjectsHome = lazy(() =>
  import("./pages/ProjectsHome").then((m) => ({ default: m.ProjectsHome })),
);
const ProjectLevelSelect = lazy(() =>
  import("./pages/ProjectLevelSelect").then((m) => ({
    default: m.ProjectLevelSelect,
  })),
);
const ProjectList = lazy(() =>
  import("./pages/ProjectList").then((m) => ({ default: m.ProjectList })),
);
const ProjectWorkspace = lazy(() =>
  import("./pages/ProjectWorkspace").then((m) => ({
    default: m.ProjectWorkspace,
  })),
);

// For static pages, we can import them dynamically as well
const FAQ = lazy(() =>
  import("./pages/StaticPages").then((m) => ({ default: m.FAQ })),
);
const Contact = lazy(() =>
  import("./pages/StaticPages").then((m) => ({ default: m.Contact })),
);
const Privacy = lazy(() =>
  import("./pages/StaticPages").then((m) => ({ default: m.Privacy })),
);
const Terms = lazy(() =>
  import("./pages/StaticPages").then((m) => ({ default: m.Terms })),
);
const About = lazy(() =>
  import("./pages/StaticPages").then((m) => ({ default: m.About })),
);

const NotFound = lazy(() =>
  import("./pages/NotFound").then((m) => ({ default: m.NotFound })),
);

export default function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="flex h-screen items-center justify-center bg-[#f8fafc] dark:bg-slate-950">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="courses" element={<Courses />} />
            <Route path="course/:id" element={<CourseDetail />} />
            <Route path="learn/:courseId" element={<LessonPlayer />} />
            <Route
              path="learn/:courseId/:lessonId"
              element={<LessonPlayer />}
            />
            <Route path="challenge/:id" element={<ChallengePlayer />} />
            <Route path="projects" element={<ProjectsHome />} />
            <Route path="projects/:type" element={<ProjectLevelSelect />} />
            <Route path="projects/:type/:level" element={<ProjectList />} />
            <Route
              path="projects/workspace/:projectId"
              element={<ProjectWorkspace />}
            />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="settings" element={<Settings />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="contact" element={<Contact />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="terms" element={<Terms />} />
            <Route path="about" element={<About />} />

            {/* 404 Catch All */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
