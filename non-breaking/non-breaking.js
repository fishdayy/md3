const buyCar = (isEnoughBuyCar) => {
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            if (isEnoughBuyCar > 999999){
                resolve("enough to buy car!");
            }else {
                reject(new Error("not enough to buy car!"))
            }
        },2000)
    })
}

buyCar(1000000)
.then((result) => {
    console.log(result);
})
.catch((error) => {
    console.log(error)
})
.finally(() => {
    console.log("New car!");
})