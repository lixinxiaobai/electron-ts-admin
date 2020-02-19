import { RouterStore } from "mobx-react-router";
import Common from "./Common";
import CustomerStore from "./Customer";

// require.

class RootStore {
  routing:RouterStore|any;
  Common:Common = new Common();
  Customer:CustomerStore = new CustomerStore();
}




export {RootStore};

export default new RootStore();