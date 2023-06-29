import { Action, FilterActionTypes, StateMapper } from "easy-peasy";

interface ObjectInterface extends Object { }

export interface MongoModel {
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type StoreError = string

export type State<T extends ObjectInterface> = StateMapper<FilterActionTypes<T>>;

export interface CommonStoreActions<T extends ObjectInterface> {
  setLoading: Action<T, boolean>;
  setError: Action<T, StoreError>;
  unsetError: Action<T>;
  resetStore: any;
}

export interface CommonStoreModel<> {
  loading: boolean;
  error?: StoreError;
}