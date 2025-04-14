import { Emotion, EMOTION_DISPLAY_NAME } from "@/constants/spotify.constant";

interface EmotionSelectProps {
  value: Emotion;
  onChange: (value: Emotion) => void;
}

const EmotionSelect = ({ value, onChange }: EmotionSelectProps) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as Emotion)}
      className="p-2 border rounded mt-4 cursor-pointer"
    >
      {Object.entries(EMOTION_DISPLAY_NAME).map(
        ([emotionKey, emotionDisplayName]) => (
          <option key={emotionKey} value={emotionKey}>
            {emotionDisplayName}
          </option>
        ),
      )}
    </select>
  );
};

export default EmotionSelect;
