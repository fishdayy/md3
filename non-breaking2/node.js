axios = require("axios");

async function getMaxArray(arr){
    if (arr instanceof Array){
        let max = arr[0];
        for (const value of arr ) {
            if(value > max) {
                max = value;
            }
        }
        return max
    }
    throw new Error("Input date is incorrect")
}

async function f(){
    try {
        let result = await getMaxArray([1,2,3,5,4]);
        console.log(result)
    }
    catch (error){
        console.log(error)
    }
}

f()