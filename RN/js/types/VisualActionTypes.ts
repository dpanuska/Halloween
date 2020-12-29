import {Action, PayloadAction} from '@reduxjs/toolkit';

interface FilePathPayload {
  filePath: string;
}

interface TextPayload {
  text: string;
}

export type SetBackgroundAction = PayloadAction<FilePathPayload>;
export type SetTextAction = PayloadAction<TextPayload>;
export type ResetVisualAction = Action;
