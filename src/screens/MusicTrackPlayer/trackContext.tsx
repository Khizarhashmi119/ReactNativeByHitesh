import { PropsWithChildren, createContext, useContext, useState } from 'react';
import { Track } from 'react-native-track-player';

const TrackContext = createContext<{
  activeTrack: Track | null | undefined;
  setActiveTrack: (track: Track | null | undefined) => void;
}>({
  activeTrack: null,
  setActiveTrack: () => {},
});

type Props = PropsWithChildren<{}>;

export const TrackContextProvider = (props: Props): JSX.Element => {
  const { children } = props;

  const [activeTrack, setActiveTrack] = useState<Track | null | undefined>(
    null,
  );

  return (
    <TrackContext.Provider value={{ activeTrack, setActiveTrack }}>
      {children}
    </TrackContext.Provider>
  );
};

export const useActiveTrack = () => useContext(TrackContext);
