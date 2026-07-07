function showScreen(id) {
    // Hide all screens
    const screens = document.querySelectorAll(".screen");

    screens.forEach(screen => {
        screen.classList.remove("active");
    });

    // Show selected screen
    const selected = document.getElementById(id);

    if (selected) {
        selected.classList.add("active");
    }
}

// Hide all screens when page loads
window.onload = function () {
    const screens = document.querySelectorAll(".screen");

    screens.forEach(screen => {
        screen.classList.remove("active");
    });
};
const serviceData = {
    "Advising": {
        waitTime: 25,
        peopleWaiting: 5
    },
    "Financial Aid": {
        waitTime: 35,
        peopleWaiting: 7
    },
    "IT Help Desk": {
        waitTime: 15,
        peopleWaiting: 3
    }
};

let activeQueue = null;

function updateServiceInfo() {
    const selectedService = document.getElementById("serviceSelect").value;
    const waitTime = document.getElementById("waitTime");
    const queueLength = document.getElementById("queueLength");
    const joinMessage = document.getElementById("joinMessage");

    joinMessage.textContent = "";

    if (selectedService === "") {
        waitTime.textContent = "Estimated Wait Time: Please select a service.";
        queueLength.textContent = "People Waiting: -";
        return;
    }

    waitTime.textContent = "Estimated Wait Time: " + serviceData[selectedService].waitTime + " minutes";
    queueLength.textContent = "People Waiting: " + serviceData[selectedService].peopleWaiting;
}

function joinQueue() {
    const selectedService = document.getElementById("serviceSelect").value;
    const joinMessage = document.getElementById("joinMessage");

    if (selectedService === "") {
        joinMessage.textContent = "Please select a service before joining the queue.";
        joinMessage.className = "error";
        return;
    }

    const position = serviceData[selectedService].peopleWaiting + 1;
    const wait = serviceData[selectedService].waitTime + 5;

    activeQueue = {
        service: selectedService,
        position: position,
        waitTime: wait,
        status: "Waiting"
    };

    joinMessage.textContent = "You have joined the " + selectedService + " queue. Your current position is #" + position + ".";
    joinMessage.className = "success";

    updateQueueStatus();
}

function leaveQueue() {
    const joinMessage = document.getElementById("joinMessage");

    if (activeQueue === null) {
        joinMessage.textContent = "You are not currently in a queue.";
        joinMessage.className = "error";
        return;
    }

    joinMessage.textContent = "You have left the " + activeQueue.service + " queue.";
    joinMessage.className = "success";

    activeQueue = null;
    updateQueueStatus();
}

function updateQueueStatus() {
    const statusService = document.getElementById("statusService");
    const statusPosition = document.getElementById("statusPosition");
    const statusWait = document.getElementById("statusWait");
    const statusText = document.getElementById("statusText");
    const statusNotification = document.getElementById("statusNotification");

    if (activeQueue === null) {
        statusService.textContent = "No active queue";
        statusPosition.textContent = "-";
        statusWait.textContent = "-";
        statusText.textContent = "Not joined";
        statusNotification.textContent = "You have not joined a queue yet.";
        return;
    }

    statusService.textContent = activeQueue.service;
    statusPosition.textContent = "#" + activeQueue.position;
    statusWait.textContent = activeQueue.waitTime + " minutes";
    statusText.textContent = activeQueue.status;

    if (activeQueue.position <= 2) {
        statusText.textContent = "Almost Ready";
        statusNotification.textContent = "Your turn is almost ready. Please stay nearby.";
    } else {
        statusNotification.textContent = "You are currently waiting. Your queue status will update soon.";
    }
}
