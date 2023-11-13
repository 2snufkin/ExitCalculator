function calculateStopTime() {
    const startTimeStr = document.getElementById("start-time").value;
    const exitToLunchtimeStr = document.getElementById("exit-time").value;
    const returnFromLunchtimeStr = document.getElementById("return-time").value;
    const additionalMinutes = parseFloat(document.getElementById("additional-minutes").value);

    const startTime = parseTimeInput(startTimeStr);
    const exitToLunchtime = parseTimeInput(exitToLunchtimeStr);
    const returnFromLunchtime = parseTimeInput(returnFromLunchtimeStr);

    if (!startTime || !exitToLunchtime || !returnFromLunchtime) {
        alert("Please enter valid time in HH:MM format.");
        return;
    }

    const timeWorkedBeforeLunch = exitToLunchtime - startTime;
    const dailyWorkTime = 7.8 * 60 * 60 * 1000; // Convert to milliseconds
    const remainingWorkTime = dailyWorkTime - timeWorkedBeforeLunch + additionalMinutes * 60 * 1000;

    const stopTime = new Date(returnFromLunchtime.getTime() + remainingWorkTime);

    const resultElement = document.getElementById("result");
    resultElement.innerHTML = `You should finish work at: ${formatTime(stopTime)}`;
}

function parseTimeInput(timeStr) {
    const [hours, minutes] = timeStr.split(":").map(Number);
    if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
        return null;
    }
    return new Date(2000, 0, 1, hours, minutes, 0, 0); // January 1, 2000, is an arbitrary date for time calculations.
}

function formatTime(time) {
    return time.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
}

document.getElementById("calculate-button").addEventListener("click", calculateStopTime);