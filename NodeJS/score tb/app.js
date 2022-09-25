let arr = [
    {
        name: "Ha",
        gender: 'female',
        poin: 8
    },
    {
        name: "Huy",
        gender: 'male',
        poin: 9
    },
    {
        name: "Hung",
        gender: 'male',
        poin: 7
    },
    {
        name: "Phuong",
        gender: 'female',
        poin: 6
    },
    {
        name: "Huyen",
        gender: 'female',
        poin: 10
    },
    {
        name: "Long",
        gender: 'male',
        poin: 5
    },
    {
        name: "Luan",
        gender: 'male',
        poin: 10
    },
    {
        name: "Linh",
        gender: 'female',
        poin: 8
    }
];

let totalMale = 0;
let count = 0;
for (let i = 0; i < arr.length; i++) {
    if (arr[i].gender === 'male'){
        totalMale += arr[i].poin;
        count++
    }
}
console.log(totalMale/count)

let totalFemale = 0;
let count2 = 0;
for (let i = 0; i < arr.length; i++) {
    if (arr[i].gender === 'female'){
        totalFemale += arr[i].poin;
        count2++
    }
}
console.log(totalFemale/count2)