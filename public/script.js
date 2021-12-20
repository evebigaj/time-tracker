let currentTotal = localStorage.getItem('total') || 0

document.getElementById('totalMessage').innerHTML = `You have tracked ${currentTotal} 
minutes today.`


const addToStorage = () => {
    const numberToAdd = Number(document.getElementById("storageInput").value);
    const oldTotal = Number(localStorage.getItem("total"))
    const newTotal = numberToAdd + oldTotal;
    localStorage.setItem("total", newTotal);
    console.log(localStorage.getItem('total'))
    return false
}

const clearStorage = () => {
    localStorage.setItem('total', 0);
    currentTotal = localStorage.getItem('total') || 0;
    document.getElementById('totalMessage').innerHTML =  `You have tracked ${currentTotal} 
minutes today.`
}



const runTimer = () => {
    // Get a reference to the last interval + 1
    const interval_id = window.setInterval(function () { }, Number.MAX_SAFE_INTEGER);

    // Clear any timeout/interval up to that id
    for (let i = 1; i < interval_id; i++) {
        window.clearInterval(i);
    }
    
 const timeInMinutes = document.getElementById("timeInput").value
 const initialTime = timeInMinutes
 let timeInMilliSeconds = timeInMinutes*1000*60;
 let startTime = Date.now()
 let x = setInterval(() => {
    var hours = Math.floor((timeInMilliSeconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((timeInMilliSeconds % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeInMilliSeconds % (1000 * 60)) / 1000);
    if(hours<10){hours = `0${hours}`}
 
    minutes = minutes < 10 ? `0${minutes}` : minutes
    // if (minutes < 10) { minutes = `0${minutes}` }
    seconds = seconds <10? `0${seconds}`: seconds
    // if (seconds < 10) { seconds = `0${seconds}` }

    
    document.getElementById("clock").innerHTML = `${hours}:${minutes}:${seconds}`
    const elapsedTime = Date.now() - startTime
    timeInMilliSeconds = timeInMilliSeconds - elapsedTime

    
    if (timeInMilliSeconds <= 0) {
        clearInterval(x);
        const gong = new Audio("gong.wav")
        gong.play();
        document.getElementById("clock").innerHTML = "Time's up!";
        let prevTotal = Number(localStorage.getItem('total')) || 0;
        console.log(initialTime)
        let total = Number(initialTime) + prevTotal 
        localStorage.setItem('total', `${total}`);
        currentTotal = localStorage.getItem('total') || 0;
        document.getElementById('totalMessage').innerHTML = `You have tracked ${currentTotal} minutes today`
        // let total = array.reduce((a,b)=> Number(a)+Number(b))
        document.getElementById("totalMessage").innerHTML = `You have
        tracked ${total} minutes today.`;
        document.getElementById("array").innerHTML = array;
        
    
        
        
    };
        startTime = Date.now()
    }, 1000)

return false}