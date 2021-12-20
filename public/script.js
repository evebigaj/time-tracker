let currentTotal = localStorage.getItem('total') || 0

document.getElementById('totalMessage').innerHTML = `You have tracked ${currentTotal} 
minutes today.`


const addToStorage = () => {
    const numberToAdd = Number(document.getElementById("storageInput").value);
    const oldTotal = Number(localStorage.getItem("total"))
    const newTotal = numberToAdd + oldTotal;
    localStorage.setItem("total", newTotal);
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
            let prevTotal = Number(localStorage.getItem('total')) || 0;
            let total = Number(initialTime) + prevTotal 
            localStorage.setItem('total', `${total}`);
            currentTotal = localStorage.getItem('total') || 0;
            document.getElementById('totalMessage').innerHTML = `You have tracked ${currentTotal} minutes today`
        };
    //setup for next loop through interval:
    startTime = Date.now()
    }, 1000)

    return false}