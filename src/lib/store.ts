import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface UserStats {
  completedLessons: string[];
  completedChallenges: string[];
  courseProgress: Record<string, number>; // courseId -> percentage 0-100
  courseLevels: Record<string, 'مبتدئ تماماً' | 'معرفة بسيطة' | 'متوسط' | 'متقدم'>; // courseId -> level
  favorites: string[]; // courseIds
  badges: string[]; // badgeIds
  quizResults: Record<string, number>; // quizId -> score
  lastVisitedLesson: string | null;
  lastVisitedCourse: string | null;
  activityLog: { date: string; action: string }[];
  theme: 'light' | 'dark' | 'system';
}

interface StoreState extends UserStats {
  markLessonComplete: (courseId: string, lessonId: string) => void;
  markChallengeComplete: (challengeId: string) => void;
  setCourseLevel: (courseId: string, level: 'مبتدئ تماماً' | 'معرفة بسيطة' | 'متوسط' | 'متقدم') => void;
  toggleFavorite: (courseId: string) => void;
  saveQuizResult: (quizId: string, score: number) => void;
  setLastVisited: (courseId: string, lessonId: string) => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  importData: (data: string) => boolean;
  exportData: () => string;
  addActivity: (action: string) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      completedLessons: [],
      completedChallenges: [],
      courseProgress: {},
      courseLevels: {},
      favorites: [],
      badges: [],
      quizResults: {},
      lastVisitedLesson: null,
      lastVisitedCourse: null,
      activityLog: [],
      theme: 'system',

      markLessonComplete: (courseId, lessonId) => {
        set((state) => {
          if (state.completedLessons.includes(lessonId)) return state;
          
          const newCompleted = [...state.completedLessons, lessonId];
          
          return {
            completedLessons: newCompleted,
            activityLog: [
              { date: new Date().toISOString(), action: `إكمال الدرس ${lessonId}` },
              ...state.activityLog
            ].slice(0, 50)
          };
        });
      },

      markChallengeComplete: (challengeId) => {
        set((state) => {
          if (state.completedChallenges?.includes(challengeId)) return state;
          return {
            completedChallenges: [...(state.completedChallenges || []), challengeId],
            activityLog: [
              { date: new Date().toISOString(), action: `إكمال التحدي المبرمج` },
              ...state.activityLog
            ].slice(0, 50)
          };
        });
      },

      setCourseLevel: (courseId, level) => {
        set((state) => ({
          courseLevels: { ...state.courseLevels, [courseId]: level },
          activityLog: [
            { date: new Date().toISOString(), action: `تحديد المستوى: ${level} في مسار ${courseId}` },
            ...state.activityLog
          ].slice(0, 50)
        }));
      },

      toggleFavorite: (courseId) => {
        set((state) => {
          const exists = state.favorites.includes(courseId);
          return {
            favorites: exists ? state.favorites.filter(id => id !== courseId) : [...state.favorites, courseId],
            activityLog: [
              { date: new Date().toISOString(), action: exists ? `إزالة من المفضلة` : `إضافة للمفضلة` },
              ...state.activityLog
            ].slice(0, 50)
          };
        });
      },

      saveQuizResult: (quizId, score) => {
        set((state) => ({
          quizResults: { ...state.quizResults, [quizId]: score },
          activityLog: [
            { date: new Date().toISOString(), action: `إكمال اختبار بدرجة ${score}%` },
            ...state.activityLog
          ].slice(0, 50)
        }));
      },

      setLastVisited: (courseId, lessonId) => {
        set({ lastVisitedCourse: courseId, lastVisitedLesson: lessonId });
      },

      setTheme: (theme) => set({ theme }),

      importData: (jsonString) => {
        try {
          const data = JSON.parse(jsonString);
          if (typeof data === 'object' && data !== null) {
            set((state) => ({ ...state, ...data }));
            return true;
          }
          return false;
        } catch {
          return false;
        }
      },

      exportData: () => {
        const state = get();
        const dataToExport = {
          completedLessons: state.completedLessons,
          courseProgress: state.courseProgress,
          courseLevels: state.courseLevels,
          favorites: state.favorites,
          badges: state.badges,
          quizResults: state.quizResults,
          lastVisitedLesson: state.lastVisitedLesson,
          lastVisitedCourse: state.lastVisitedCourse,
          activityLog: state.activityLog,
          theme: state.theme,
        };
        return JSON.stringify(dataToExport, null, 2);
      },

      addActivity: (action) => {
        set((state) => ({
          activityLog: [
            { date: new Date().toISOString(), action },
            ...state.activityLog
          ].slice(0, 50)
        }));
      }
    }),
    {
      name: 'codemaster-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
