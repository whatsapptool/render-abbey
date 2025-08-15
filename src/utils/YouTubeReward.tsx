import React from 'react';

interface YouTubeRewardProps {
  followers_count: number;
}

const YouTubeReward: React.FC<YouTubeRewardProps> = ({ followers_count }) => {
  let logo = '';

  if (followers_count >= 100_000_000) {
    logo =
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/YouTube_Red_Diamond_Play_Button.svg/512px-YouTube_Red_Diamond_Play_Button.svg.png';
  } else if (followers_count >= 50_000_000) {
    logo =
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/YouTube_Ruby_Play_Button_2.svg/512px-YouTube_Ruby_Play_Button_2.svg.png';
  } else if (followers_count >= 10_000_000) {
    logo =
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/YouTube_Diamond_Play_Button.svg/512px-YouTube_Diamond_Play_Button.svg.png';
  } else if (followers_count >= 1_000_000) {
    logo =
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/YouTube_Gold_Play_Button_2.svg/512px-YouTube_Gold_Play_Button_2.svg.png';
  } else if (followers_count >= 100_000) {
    logo =
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/YouTube_Silver_Play_Button_2.svg/512px-YouTube_Silver_Play_Button_2.svg.png';
  } else {
    logo = 'https://via.placeholder.com/100?text=None';
  }

  return (
    <div className="flex items-center justify-end gap-4 p-2 rounded-md">
      <img
        src={logo}
        alt="Reward Logo"
        style={{
          width: 'auto',
          height: '70px',
        }}
      />
    </div>
  );
};

export default YouTubeReward;
