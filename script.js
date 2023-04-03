new Vue({
    el:'#puzzle',
    data() {
        return {
            curStep:0,
            type:3,
            dataButton:[],
            curIndex9:0,
            show:false,
        }
    },
    methods: {
        shuffleButton: function (array) {
            let currentIndex = array.length,
              randomIndex;
            while (currentIndex != 0) {
              randomIndex = Math.floor(Math.random() * currentIndex);
              currentIndex--;
              [array[currentIndex], array[randomIndex]] = [
                array[randomIndex],
                array[currentIndex],
              ];
            }
            return array;
        },
        findAroundBlank:function(){
            this.getCurIndex();
            let returnIndex=[];
            switch(this.curIndex9){
                case 0:
                    returnIndex=[1,3]
                break;
                case 1:
                    returnIndex=[0,2,4]
                break;
                case 2:
                    returnIndex=[1,5]
                break;
                case 3:
                    returnIndex=[0,4,6]
                break;
                case 4:
                    returnIndex=[1,3,5,7]
                break;
                case 5:
                    returnIndex=[2,8,4]
                break;
                case 6:
                    returnIndex=[3,7]
                break;
                case 7:
                    returnIndex=[6,4,8]
                break;
                case 8:
                    returnIndex=[5,7]
                break;
            }
            return returnIndex;
        },
        getCurIndex:function(){
            for(let i=0;i<this.dataButton.length;i++){
                if(this.dataButton[i].value==9){
                    this.curIndex9=i;
                    break;
                }
            }
        },
        disAll:function(){
            for(let i=0;i<9;i++){
                this.dataButton[i].isDisable=true;
            }
        },
        disband:function(){
            this.disAll();
            let arr=this.findAroundBlank();
            for(let i=0;i<arr.length;i++){
                let dis=arr[i];
                this.dataButton[dis].isDisable=false;
            }
        },
        move:function(index){
            this.curStep+=1;
            [this.dataButton[index],this.dataButton[this.curIndex9]]=[this.dataButton[this.curIndex9],this.dataButton[index]];
            this.disband();
            if(this.checkWin()){
                alert("win rồi");
            }
        },
        checkWin:function(){
            for(let i=0;i<this.dataButton.length-1;i++){
                if(this.dataButton[i].value>this.dataButton[i+1].value){
                    return false;
                }
            }
            this.wingame();
            return true;
        },
        wingame:function(){
            for(let i=0;i<this.dataButton.length;i++){
                this.dataButton[i].isDisable=true;
            }
            this.show=true;
        },
        reset:function(){
            location.reload();
        }
    },
    computed:{

    },
    watch:{

    },
    async mounted() {
        if(this.type==3){
            await axios.get("/data3.json").then(res=>{
                this.dataButton=this.shuffleButton(res.data);
                this.disband();
            })
        }
    },
})