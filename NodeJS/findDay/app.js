let arr = ["chủ nhật", "thứ hai", "thứ ba", "thứ tư", "thứ năm", "thứ sáu", "thứ bảy"]
let date = new Date();
let current_day = date.getDay();
for (let i = 0; i < arr.length; i++) {
    if (current_day === i){
        console.log("hom nay la: " + arr[i])
    }
}