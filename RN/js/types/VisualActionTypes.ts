import {Action, PayloadAction} from '@reduxjs/toolkit';

interface BackgroundResourcePayload {
    resource: string;
}

interface TextPayload {
    text: string;
}

interface ImagePayload {
    base64: any;
}

export type SetBackgroundResourceAction = PayloadAction<BackgroundResourcePayload>;
export type SetBackgroundImageAction = PayloadAction<ImagePayload>;
export type SetTextAction = PayloadAction<TextPayload>;
export type ResetVisualAction = Action;
