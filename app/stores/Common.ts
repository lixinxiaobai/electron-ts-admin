import {observable,action} from 'mobx'
class Common{
    @observable MainWidth:number = 1350;

    @action.bound setMainWidth(value:number){
        this.MainWidth = value;
    }
}

export default Common;