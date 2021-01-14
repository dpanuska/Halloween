// https://github.com/ak1394/react-native-tts
const MIN_PITCH = 0.5;
const MAX_PITCH = 2.0;
const PITCH_MULTIPLIER = 1.0;

const MIN_RATE = 0.01;
const MAX_RATE = 0.99;
const RATE_MULTIPLIER = 0.5;

// This isn't the min, but we are normalizing - can probably be lower here
// const ANDROID_MIN_PITCH = 0.5;

// Again, not a max, but need to normalize to some value
// const ANDROID_MAX_PITCH = 2.0;

// react-native-tts will ignore invalid values
// For now we will just set to a valid value.
// This could potentially scale based on platform differences
export function normalizePitch(pitch: number): number {
    return Math.min(Math.max(MIN_PITCH, pitch * PITCH_MULTIPLIER), MAX_PITCH);
}

export function normalizeRate(rate: number): number {
    return Math.min(Math.max(MIN_RATE, rate * RATE_MULTIPLIER), MAX_RATE);
}
