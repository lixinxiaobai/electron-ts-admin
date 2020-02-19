import {observable,action} from 'mobx'
class Test{
    @observable MyTestNumber:number = 0;

    @action.bound AddTestNumber(){
        this.MyTestNumber++;
    }
}

export default Test;