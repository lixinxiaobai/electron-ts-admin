export default {
    get(key:string, defaults:any = null){
        let value = localStorage.getItem(key)
        if(value !== null){
            return JSON.parse(value);
        }else{
            return defaults
        }
    },

    set(key:string, value:object|string){
        localStorage.setItem(key, JSON.stringify(value));
    },

    remove(key:string){
        localStorage.removeItem(key);
    },

    clear(){
        localStorage.clear();
    }

}