import {observable,action, computed} from 'mobx';
import CustomerApi,{ CustomerSelect } from '@/api/customer';
import * as _ from "lodash";

class CustomerStore {
    @observable private CustomerList:CustomerSelect[] = [];

    @action.bound async setCustomerList(){
        let customerList = await CustomerApi.all();
        if(customerList.status){
            this.CustomerList = customerList.data;
        }
    }

    @computed get AllCustomerList(){
        return _.concat([{
            name:'散户',
            pinyin:'sanhu',
            id:0
        }], this.CustomerList);
    }



}

export default CustomerStore;