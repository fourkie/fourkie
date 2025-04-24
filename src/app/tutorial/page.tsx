import { Suspense } from "react";
import TutorialContainer from "./_components/tutorial-container";

const Tutorial = () => {
  return (
    <Suspense>
      <TutorialContainer />
    </Suspense>
  );
};

export default Tutorial;
