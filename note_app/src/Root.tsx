import { Composition } from "remotion";
import { NoteEase } from "./components/NoteEase";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="NoteEase"
        component={NoteEase}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
