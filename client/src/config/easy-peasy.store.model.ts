import UsersStoreModel from "modules/users/state/users.store.model";

export default interface StoreModel {
  users: UsersStoreModel;
  foods: any;
  measurements: any;
  references: any;
}