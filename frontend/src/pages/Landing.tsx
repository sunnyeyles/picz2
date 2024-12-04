// import { Button } from "./ui/button";
// import { SignInButton } from "@clerk/clerk-react";
// import { BackgroundLines } from "@/components/ui/background-lines";
// import { TextHoverEffect } from "./ui/test-hover-effect";

// export const BackgroundLinesComponent = () => {
//   return (
//     <BackgroundLines className="flex items-center justify-center w-full flex-col z-20">
//       <div className="z-0">
//         <TextHoverEffect text="PICZ" />
//         <p className="max-w-sm text-sm md:text-md text-center text-gray-400">
//           Upload your images and easily store them in one place. Our platform
//           lets you save, organize, and access your photos anytime, for free.
//         </p>
//         <SignInButton>
//           <Button className="z-10 " variant="outline">
//             Sign in
//           </Button>
//         </SignInButton>
//       </div>
//     </BackgroundLines>
//   );
// };
import { Button } from "../components/ui/button";
import { SignInButton } from "@clerk/clerk-react";
import { BackgroundLines } from "@/components/ui/background-lines";
import { TextHoverEffect } from "../components/ui/test-hover-effect";

export const LandingPage = () => {
  return (
    <BackgroundLines className="flex items-center justify-center w-full h-screen">
      <div className="text-center z-0">
        <TextHoverEffect text="PICZ" />
        <p className="max-w-sm text-sm md:text-lg text-gray-400 mt-4">
          Upload your images and easily store them in one place. Our platform
          lets you save, organize, and access your photos anytime, for free.
        </p>
        <SignInButton>
          <Button className="mt-6" variant="outline" size="lg">
            Sign in
          </Button>
        </SignInButton>
      </div>
    </BackgroundLines>
  );
};
