let categoryInput = document.getElementById('category');
let currentTotal = localStorage.getItem('total') || 0
console.log(localStorage)


const writeMessage = () => {

for([key, value] of Object.entries(localStorage)){
    if (typeof key == 'string' && key != ''){ 
        let container = document.getElementById('totalMessage');
        let message = `${key}: ${value}`;
        container.append(message);
        let br = document.createElement('br');
        container.append(br);
    
    }
}

}

writeMessage();


// `You have tracked ${currentTotal} 
//  minutes today and ${localStorage.getItem('test')} minutes in category test.`

const clearValue = () => {
    const timeInput = document.getElementById('timeInput')
    timeInput.value = ''
}

//currently doesn't handle continuing to input after six digits
const change = () => {
    const timeInput = document.getElementById('timeInput')
    
    
    //remove colons
    let digits = timeInput.value.replaceAll(':','')

    //remove leading zero:
    digits = digits.slice(1)
    let hours = digits.slice(0,2);
    let minutes = digits.slice(2,4);
    let seconds = digits.slice(4,6)
    console.log(hours, minutes, seconds)

    //combine and put colons back in:
    timeInput.value = `${hours}:${minutes}:${seconds}`

}
//make this take a parameter for the category 
const addToStorage = () => {
    const numberToAdd = Number(document.getElementById("storageInput").value);
    let category = categoryInput.value
    if(category){
        // console.log('category')
        const oldCategory = Number(localStorage.getItem(category)||0);
        const newCategory = oldCategory + numberToAdd;
       
        localStorage.setItem(category, newCategory);
    //console.log(localStorage.getItem(category))
    return false
    
    }
    // console.log('got out of conditional ')
    const oldTotal = Number(localStorage.getItem("total"))||0;
    const newTotal = numberToAdd + oldTotal;
    localStorage.setItem("total", newTotal);
    //console.log(category)
    
    //e.preventDefault();
    return false
}

//make this take category parameter
const clearStorage = () => {
    localStorage.setItem('total', 0);
    currentTotal = localStorage.getItem('total') || 0;
    // document.getElementById('totalMessage').innerHTML =  `You have tracked ${currentTotal} 
    // minutes today.`
}


//add parameter for category 
const runTimer = () => {
    
    // Get a reference to the last interval + 1
    const interval_id = window.setInterval(function () { }, Number.MAX_SAFE_INTEGER);

    // Clear any timeout/interval up to that id
    for (let i = 1; i < interval_id; i++) {
        window.clearInterval(i);
    }
    
    const timeString = document.getElementById("timeInput").value;
    const stringHours = timeString.slice(0,2);
    const stringMinutes = timeString.slice(3,5);
    const stringSeconds = timeString.slice(6,8)
    //console.log('test')
    //console.log(stringSeconds, stringMinutes, stringHours)
    const timeInSeconds = Number(stringHours)*60*60 + Number(stringMinutes)*60 + Number(stringSeconds)
    //console.log(timeInSeconds)
    const initialTime = timeInSeconds/60
    let timeInMilliSeconds = timeInSeconds*1000
    let startTime = Date.now()
    let x = setInterval(() => {

        //setup for timer:
        let hours = Math.floor((timeInMilliSeconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((timeInMilliSeconds % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((timeInMilliSeconds % (1000 * 60)) / 1000);
        
        //adds leading zeros in timer display when necessary:
        hours = hours<10? `0${hours}` : hours;
        minutes = minutes < 10? `0${minutes}` : minutes;
        seconds = seconds <10? `0${seconds}`: seconds;

        //display timer:
        document.getElementById("clock").innerHTML = `${hours}:${minutes}:${seconds}`
        const elapsedTime = Date.now() - startTime
        timeInMilliSeconds = timeInMilliSeconds - elapsedTime

        //timesup behavior:
        if (timeInMilliSeconds <= 0) { 
            clearInterval(x);
            const gong = new Audio("gong.wav")
            gong.play();
            document.getElementById("clock").innerHTML = "Time's up!";

            //update storage:
            //this is where parameter for category should go 
            let category = categoryInput.value;
            console.log(`the category is ${category}`)
            if(category){
                let prevTotal = Number(localStorage.getItem(category)) || 0;
                let total = Number(initialTime) + prevTotal 
                localStorage.setItem(category, `${total}`);
                currentTotal = localStorage.getItem(category) || 0;

            }
            else{
            let prevTotal = Number(localStorage.getItem('total')) || 0;
            let total = Number(initialTime) + prevTotal 
            localStorage.setItem('total', `${total}`);
            currentTotal = localStorage.getItem('total') || 0;
           //document.getElementById('totalMessage').innerHTML = '';
           // writeMessage();
            
            }
            document.getElementById('totalMessage').innerHTML = 'test';
           writeMessage();
        };
    //setup for next loop through interval:
    startTime = Date.now()
    }, 1000)
    
    
    return false}