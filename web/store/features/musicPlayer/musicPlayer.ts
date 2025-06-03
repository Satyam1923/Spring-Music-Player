import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Track {
  title: string;
  album: string;
  photo: string;
  url: string;
}

type RepeatMode = "off" | "one" | "all";

interface MusicPlayerState {
  tracks: Track[];
  currentTrackIndex: number;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  repeatMode: RepeatMode;
  volume:number
}

const initialState: MusicPlayerState = {
  tracks: [],
  currentTrackIndex: -1,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  repeatMode: "off",
  volume:1
};

const musicPlayerSlice = createSlice({
  name: "musicPlayer",
  initialState,
  reducers: {
    setTracks(state, action: PayloadAction<Track[]>) {
      state.tracks = action.payload;
      state.currentTrackIndex = action.payload.length > 0 ? 0 : -1;
      state.currentTime = 0;
      state.duration = 0;
      state.isPlaying = false;
    },
    play(state) {
      if (state.currentTrackIndex !== -1) {
        state.isPlaying = true;
      }
    },
    pause(state) {
      state.isPlaying = false;
    },
    togglePlayPause(state) {
      if (state.currentTrackIndex !== -1) {
        state.isPlaying = !state.isPlaying;
      }
    },
    shuffle(state) {
      if (state.tracks.length !== 0) {
        let newIndex = state.currentTrackIndex;
        while (newIndex === state.currentTrackIndex && state.tracks.length > 1) {
          newIndex = Math.floor(Math.random() * state.tracks.length);
        }
        state.currentTrackIndex = newIndex;
        state.currentTime = 0;
        state.duration = 0;
        state.isPlaying = true;
      }
    },    
    setIsPlaying(state, action: PayloadAction<boolean>) {
      if (state.currentTrackIndex !== -1) {
        state.isPlaying = action.payload;
      }
    },
    setCurrentTrackIndex(state, action: PayloadAction<number>) {
      if (action.payload >= 0 && action.payload < state.tracks.length) {
        state.currentTrackIndex = action.payload;
        state.currentTime = 0;
        state.duration = 0;
        state.isPlaying = true;
      }
    },
    setVolume(state,action:PayloadAction<number>){
      state.volume = Math.min(1,Math.max(0,action.payload));
    },
    playNext(state) {
      if (state.tracks.length > 0) {
        if (state.repeatMode === "one") {
          state.currentTime = 0;
          state.duration = 0;
          state.isPlaying = true;
        } else if (state.currentTrackIndex + 1 < state.tracks.length) {
          state.currentTrackIndex += 1;
          state.currentTime = 0;
          state.duration = 0;
          state.isPlaying = true;
        } else if (state.repeatMode === "all") {
          state.currentTrackIndex = 0;
          state.currentTime = 0;
          state.duration = 0;
          state.isPlaying = true;
        } else {
          state.isPlaying = false;
        }
      }
    },
    clearQueue(state){
      state.tracks = [];
      state.currentTrackIndex = -1;
      state.isPlaying = false;
      state.currentTime = 0;
      state.duration = 0;
    },
    playPrev(state) {
      if (state.tracks.length > 0) {
        state.currentTrackIndex =
          state.currentTrackIndex === 0
            ? state.tracks.length - 1
            : state.currentTrackIndex - 1;
        state.currentTime = 0;
        state.duration = 0;
        state.isPlaying = true;
      }
    },
    setCurrentTime(state, action: PayloadAction<number>) {
      state.currentTime = action.payload;
    },
    setDuration(state, action: PayloadAction<number>) {
      state.duration = action.payload;
    },
    toggleRepeatMode(state) {
      const modes: RepeatMode[] = ["off", "one", "all"];
      const nextIndex =
        (modes.indexOf(state.repeatMode) + 1) % modes.length;
      state.repeatMode = modes[nextIndex];
    },
  },
});

export const {
  setTracks,
  play,
  pause,
  togglePlayPause,
  setIsPlaying,
  setCurrentTrackIndex,
  playNext,
  playPrev,
  setCurrentTime,
  setDuration,
  toggleRepeatMode,
  shuffle,
  clearQueue
} = musicPlayerSlice.actions;

export default musicPlayerSlice.reducer;
