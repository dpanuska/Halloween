import {AppConfig} from '../types/StateTypes';
import appConfig from 'res/config';

export async function fetchConfiguration(): Promise<AppConfig> {
    return appConfig;
}
