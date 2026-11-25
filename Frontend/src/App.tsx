import { Component, lazy, Suspense, type ErrorInfo, type ReactNode } from "react";

const HomePage = lazy(() => import("./pages/HomePage"));
const ClassesPage = lazy(() => import("./pages/ClassesPage"));
const CourseDetailPage = lazy(() => import("./pages/CourseDetailPage"));
const LoginPage = lazy(() => import("./components/login/LoginPage"));

type BoundaryProps = { children: ReactNode };
type BoundaryState = { hasError: boolean };

class AppErrorBoundary extends Component<BoundaryProps, BoundaryState> {
  state: BoundaryState = { hasError: false };

  static getDerivedStateFromError(): BoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Page failed to render", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="route-fallback" role="alert">
          <p className="eyebrow eyebrow-purple">SKILLSPARX TECHNOLOGY</p>
          <h1>This page could not be displayed.</h1>
          <p>Return to the course list and try again.</p>
          <a className="button button-primary" href="/#classes">Back to classes</a>
        </main>
      );
    }
    return this.props.children;
  }
}

function LoadingPage() {
  return <main className="route-fallback" aria-live="polite">Loading page…</main>;
}

export default function App() {
  const pathname = window.location.pathname.replace(/\/+$/, "") || "/";

  if (window.location.hash === "#login" && pathname === "/") {
    return <AppErrorBoundary><Suspense fallback={<LoadingPage />}><LoginPage onNavigateHome={() => { window.location.hash = ""; }} /></Suspense></AppErrorBoundary>;
  }

  if (pathname === "/classes" || pathname === "/courses") {
    return (
      <AppErrorBoundary>
        <Suspense fallback={<LoadingPage />}>
          <ClassesPage />
        </Suspense>
      </AppErrorBoundary>
    );
  }

  const courseRoute = pathname.match(/^\/courses(?:\/([^/]+))?$/);
  if (courseRoute) {
    return (
      <AppErrorBoundary>
        <Suspense fallback={<LoadingPage />}>
          <CourseDetailPage slug={courseRoute[1] ?? ""} />
        </Suspense>
      </AppErrorBoundary>
    );
  }

  if (pathname !== "/") {
    return (
      <AppErrorBoundary>
        <Suspense fallback={<LoadingPage />}>
          <CourseDetailPage slug="" />
        </Suspense>
      </AppErrorBoundary>
    );
  }

  return (
    <AppErrorBoundary>
      <Suspense fallback={<LoadingPage />}>
        <HomePage />
      </Suspense>
    </AppErrorBoundary>
  );
}
