import {
  SPEECH_TEXT_REQUESTED,
  SPEECH_LOCALE_REQUESTED,
  SPEECH_PITCH_REQUESTED,
  SPEECH_RATE_REQUESTED,
} from '../constants/ActionTypes';

export const sayText = (text: string) => ({
  type: SPEECH_TEXT_REQUESTED,
  payload: {
    text,
  },
});

export const setSpeechPitch = (pitch: number) => ({
  type: SPEECH_PITCH_REQUESTED,
  payload: {
    pitch,
  },
});

export const setSpeechRate = (rate: number) => ({
  type: SPEECH_RATE_REQUESTED,
  payload: {
    rate,
  },
});

export const setSpeechLocale = (locale: string) => ({
  type: SPEECH_LOCALE_REQUESTED,
  payload: {
    locale,
  },
});
