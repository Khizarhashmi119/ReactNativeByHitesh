import React from 'react';

import MusicTrackPlayer from '.';
import { TrackContextProvider } from './trackContext';

const Providers = (): React.JSX.Element => (
  <TrackContextProvider>
    <MusicTrackPlayer />
  </TrackContextProvider>
);

export default Providers;
