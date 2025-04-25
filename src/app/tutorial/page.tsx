import { Suspense } from "react";
import TutorialContainer from "./_components/tutorial-container";

const Tutorial = () => {
  return (
    <Suspense>
      <div className="fixed inset-0 z-50 bg-white">
        <TutorialContainer />
      </div>
    </Suspense>
  );
};

export default Tutorial;
