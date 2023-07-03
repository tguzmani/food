import { AlertColor } from "@mui/material";
import { Action, FilterActionTypes, StateMapper } from "easy-peasy";

interface ObjectInterface extends Object { }

export type StoreFeedbackSeverity = AlertColor;

export interface MongoModel {
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type StoreFeedback = {
  message: string;
  severity: StoreFeedbackSeverity;
}

export type State<T extends ObjectInterface> = StateMapper<FilterActionTypes<T>>;

export interface CommonStoreActions<T extends ObjectInterface> {
  setLoading: Action<T, boolean>;
  setFeedback: Action<T, StoreFeedback>;
  unsetFeedback: Action<T>;
  resetStore: any;
}

export interface CommonStoreModel<> {
  loading: boolean;
  feedback?: StoreFeedback;
}