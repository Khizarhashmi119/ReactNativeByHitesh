import React from 'react';

import MusicTrackPlayer from '.';
import { TrackContextProvider } from './trackContext';

const Providers = () => {
  return (
    <TrackContextProvider>
      <MusicTrackPlayer />
    </TrackContextProvider>
  );
};

export default Providers;
