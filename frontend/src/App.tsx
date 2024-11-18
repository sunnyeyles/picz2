import { Button } from "./components/ui/button";
import { ThemeProvider } from "@/components/theme-provider";

import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Routes";
const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SignedOut>
        <SignInButton>
          <Button>Sign in</Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <RouterProvider router={router} />
      </SignedIn>
    </ThemeProvider>
  );
};

export default App;
