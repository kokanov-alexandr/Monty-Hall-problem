const ContentDoor = {
    GOAT : 1,
    CAR : 2,
}

class StatusDoor {
    is_open;
    content;

    constructor(is_open, content) {
        this.is_open = is_open;
        this.content = content;
    }
}

var Statistics = {
    DoorChange: {
        TotalNumber: 0,
        CountWin: 0,
        CountLoos: 0
    },
    DoorNoChange: {
        TotalNumber: 0,
        CountWin: 0,
        CountLoos: 0
    }
}

var InfoDoors = [];
var is_game_start = false;
var Choise = false;

InitDoors();

function InitDoors() {
    InfoDoors = [
        new StatusDoor(false, ContentDoor.GOAT), 
        new StatusDoor(false, ContentDoor.GOAT), 
        new StatusDoor(false, ContentDoor.GOAT)
    ];
    var car_position = Math.floor(Math.random() * 3);
    InfoDoors[car_position].content = ContentDoor.CAR;
}

function OpenDoor(ID) {
    var im = document.getElementById(ID);
    im.src = (InfoDoors[ID].content == ContentDoor.CAR ? "car.png" : "goat.png");
    InfoDoors[ID].is_open = true;
}


function CloseDoors() {
    for (var i = 0; i < 3; i++) {
        document.getElementById(i).src = "door.png";
        InfoDoors[i].is_open = false;
    }
}

function Restart() {
    CloseDoors();
    is_game_start = false;
    document.getElementById('restart_btn').style.display = 'none';
}

function Add_count_game() {
    document.getElementById('count_game_p').innerText++;
}



function UpdateStatistics(ID) {
    if (Choise == ID) {
        document.getElementById("change_tot_num").textContent = ++Statistics.DoorChange.TotalNumber; 
        if (InfoDoors[ID].content == ContentDoor.CAR) {
            document.getElementById("change_count_win").textContent = ++Statistics.DoorChange.CountWin; 
        }
        else {
            document.getElementById("change_count_loos").textContent = ++Statistics.DoorChange.CountLoos; 
        }
    }
    else {
        document.getElementById("no_change_tot_num").textContent = ++Statistics.DoorNoChange.TotalNumber; 
        if (InfoDoors[ID].content == ContentDoor.CAR) {
            document.getElementById("no_change_count_win").textContent = ++Statistics.DoorNoChange.CountWin; 
        }
        else {
            document.getElementById("no_change_count_loos").textContent = ++Statistics.DoorNoChange.CountLoos; 
        }
    }
}

function Clickdoor(ID) {
    if (InfoDoors[ID].is_open == true) {
        return;
    }
    if (is_game_start == false) {
        is_game_start = true;
        Choise = ID;
        InitDoors();    
        var OpenedDoor = Math.floor(Math.random() * 3);
        while (OpenedDoor == Choise || InfoDoors[OpenedDoor].content == ContentDoor.CAR) {
            OpenedDoor = Math.floor(Math.random() * 3);
            console.log(OpenedDoor);
        }
        OpenDoor(OpenedDoor);
        Choise = ID;
    }
    else {
        for (var i = 0; i < 3; i++) {
            OpenDoor(i);
        }
        document.getElementById('restart_btn').style.display = 'flex';
        Add_count_game();
        UpdateStatistics(ID);
    }
}


