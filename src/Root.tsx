import { Composition } from "remotion";
import { CardList } from "./CardList";
import { CONFIG, getTotalDuration, getTotalVideoDuration, getDurationInSeconds } from "./config";
import './index.css'; 

export const RemotionRoot: React.FC = () => {
  const totalDuration = getTotalDuration();
  const TOTAL_DURATION = getTotalVideoDuration();

  console.log('Root Config:', {
    cardsToShow: CONFIG.cardsToShow,
    durasiPerCardDetik: CONFIG.durasiPerCardDetik,
    totalDurationInSeconds: getDurationInSeconds(totalDuration),
    introDelayInSeconds: getDurationInSeconds(CONFIG.introDelay),
    endingDurationInSeconds: CONFIG.endingDuration,
    totalVideoDurationInSeconds: getDurationInSeconds(TOTAL_DURATION)
  });

  return (
    <>
      <Composition
        id="DataListCard"
        component={CardList}
        durationInFrames={Math.round(TOTAL_DURATION)}
        fps={CONFIG.FPS}
        width={CONFIG.WIDTH}
        height={CONFIG.HEIGHT}
        defaultProps={{
          cardsToShow: CONFIG.cardsToShow,
          durasiPerCardDetik: CONFIG.durasiPerCardDetik,
          introDelay: CONFIG.introDelay,
          endingDuration: CONFIG.endingDuration * CONFIG.FPS,
        }}
      />
    </>
  );
};