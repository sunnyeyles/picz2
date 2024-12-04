import { ThemeProvider } from "@/components/ThemeProvider";

import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Routes";
import { LandingPage } from "./pages/Landing";
const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SignedOut>
        <LandingPage />
      </SignedOut>
      <SignedIn>
        <RouterProvider
          future={{
            v7_startTransition: true,
          }}
          router={router}
        />
      </SignedIn>
    </ThemeProvider>
  );
};

export default App;
