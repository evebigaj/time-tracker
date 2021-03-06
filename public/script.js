let categoryInput = document.getElementById('category');
let currentTotal = localStorage.getItem('other') || 0
console.log(localStorage)


const writeMessage = () => {
let container = document.getElementById('totalMessage');
container.innerHTML = '';
for([key, value] of Object.entries(localStorage)){
    if (typeof key == 'string' && key != ''){ 
        let div = document.createElement('div');
        let button = document.createElement('button')
        container.append(div)
        div.append(button);
        button.innerHTML = 'x';
        button.id = key;
        let remove = (k) => {console.log(`the key is ${k}`)
            localStorage.removeItem(k);
            location.reload();
        }
        button.addEventListener('click', (e) => remove(e.target.id));
        

        let message = `${key}: ${value}`;
        div.append(message);
        let br = document.createElement('br');
        div.append(br);
    
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

const addToStorage = () => {
    const numberToAdd = Number(document.getElementById("storageInput").value);
    let category = categoryInput.value
    if(category){
        // console.log('category')
        const oldCategory = Number(localStorage.getItem(category)||0);
        const newCategory = (oldCategory + numberToAdd).toFixed(2)
       
        localStorage.setItem(category, newCategory);
    //console.log(localStorage.getItem(category))
   
    
    }
    else{
        let old = Number(localStorage.getItem('other'))||0;
        const newNumber = old + numberToAdd;
        localStorage.setItem('other', newNumber)
    }
    console.log('got out of conditional ')
    const oldTotal = Number(localStorage.getItem("total"))||0;
    const newTotal = (numberToAdd + oldTotal).toFixed(2);
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
                let total = (Number(initialTime) + prevTotal).toFixed(2);
                localStorage.setItem(category, `${total}`);
                currentTotal = localStorage.getItem(category) || 0;

                

            }
            else{
            let prevTotal = Number(localStorage.getItem('other')) || 0;
            let total = (Number(initialTime) + prevTotal).toFixed(2); 
            localStorage.setItem('other', `${total}`);
            currentTotal = localStorage.getItem('other') || 0;
           
           //document.getElementById('totalMessage').innerHTML = '';
           // writeMessage();
            
            }
             let prevFullTotal = Number(localStorage.getItem('total'))||0;
                let newFullTotal = (Number(initialTime) + prevFullTotal).toFixed(2);
                localStorage.setItem('total', newFullTotal);
           writeMessage();
        };
    //setup for next loop through interval:
    startTime = Date.now()
    }, 1000)
    
    
    return false}