import * as ttsActions from 'src/redux/actions/TTSActions';
import {
    resetDefaults,
    sayText,
    setLocale,
    setPitch,
    setRate,
} from 'src/redux/sagas/TTSSagas';
import {TaskGenerator, TaskGeneratorMap} from 'src/types/TaskFactoryTypes';
import {
    Task,
    TTSLocaleTask,
    TTSPitchTask,
    TTSRateTask,
    TTSSayTextTask,
} from 'src/types/TaskTypes';

const TTSTasks = {
    SayText: 'SPEECH_TEXT',
    SetLocale: 'SPEECH_LOCALE',
    SetPitch: 'SPEECH_PITCH',
    SetRate: 'SPEECH_RATE',
    TTSReset: 'SPEECH_RESET',
};

export const FactoryForTypes: TaskGeneratorMap = {
    [TTSTasks.SayText]: getSayGenerator,
    [TTSTasks.SetLocale]: getLocaleGenerator,
    [TTSTasks.SetPitch]: getPitchGenerator,
    [TTSTasks.SetRate]: getRateGenerator,
    [TTSTasks.TTSReset]: getResetGenerator,
};

function getSayGenerator(task: Task): TaskGenerator | null {
    if (isSayTask(task)) {
        return {
            generator: sayText,
            action: ttsActions.sayText(task.text),
        };
    }
    return null;
}

function getLocaleGenerator(task: Task): TaskGenerator | null {
    if (isSetLocaleTask(task)) {
        return {
            generator: setLocale,
            action: ttsActions.setSpeechLocale(task.locale),
        };
    }
    return null;
}

function getPitchGenerator(task: Task): TaskGenerator | null {
    if (isSetPitchTask(task)) {
        return {
            generator: setPitch,
            action: ttsActions.setSpeechPitch(task.pitch),
        };
    }
    return null;
}

function getRateGenerator(task: Task): TaskGenerator | null {
    if (isSetRateTask(task)) {
        return {
            generator: setRate,
            action: ttsActions.setSpeechRate(task.rate),
        };
    }
    return null;
}

function getResetGenerator(): TaskGenerator | null {
    return {
        generator: resetDefaults,
        action: ttsActions.reset(),
    };
}

function isSayTask(task: any): task is TTSSayTextTask {
    return typeof task.text === 'string';
}

function isSetLocaleTask(task: any): task is TTSLocaleTask {
    return typeof task.locale === 'string';
}

function isSetPitchTask(task: any): task is TTSPitchTask {
    return typeof task.pitch === 'number';
}

function isSetRateTask(task: any): task is TTSRateTask {
    return typeof task.rate === 'number';
}
