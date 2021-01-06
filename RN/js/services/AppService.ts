import {AppConfig} from 'react-native';
import appConfig from 'res/config';

export async function fetchConfiguration(): Promise<AppConfig> {
    return appConfig;
}
