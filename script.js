document.addEventListener("mousedown", e=>{
    event.preventDefault()
})

var hourAngle = 0
//------------------------getting Elements------------------------
const hourHand = document.querySelector('[data-hours]')
const minuteHand = document.querySelector('[data-minutes]')         
const secondHand = document.querySelector('[data-seconds]')
const centerClock = document.getElementById("center")
const analogButton = document.getElementById("analog")
const clock = document.getElementById("base")
//numbers:
const one = document.getElementById("one")
const two = document.getElementById("two")
const three = document.getElementById("three")
const four = document.getElementById("four")
const five = document.getElementById("five")
const six = document.getElementById("six")
const seven = document.getElementById("seven")
const eight = document.getElementById("eight")
const nine = document.getElementById("nine")
const ten = document.getElementById("ten")
const eleven = document.getElementById("eleven")
const twelve = document.getElementById("twelve")

//--------------------------position--------------------------
//numbers:
let clockDim = clock.getBoundingClientRect()
let r = clockDim.width/2 - (clockDim.width/2*0.07)
let centerDim = centerClock.getBoundingClientRect()
let l = centerDim.left
let t = centerDim.top
let rotate = 0
let radians = 180/Math.PI
let center = {
    x: l,
    y: t
}

//button:
let buttonDim = analogButton.getBoundingClientRect()
let bW = buttonDim.width
analogButton.style.top = t*2 + "px"
analogButton.style.left = l - bW/2 + "px"
eleven.style.right = one.style.left = r + r * Math.cos(Math.PI/3) + "px"
eleven.style.top = one.style.top = (r - r * Math.sin(Math.PI/3)) + "px"
ten.style.right = two.style.left = r + r * Math.cos(Math.PI/6) + "px"
ten.style.top = two.style.top =  (r - r * Math.sin(Math.PI/6)) + "px"
nine.style.right = three.style.left = 2*r + "px"
nine.style.top = three.style.top = r + "px"
eight.style.right = four.style.left = two.style.left
eight.style.top = four.style.top = (r + r * Math.sin(Math.PI/6)) + "px"
seven.style.right = five.style.left = one.style.left
seven.style.top = five.style.top = (r + r * Math.sin(Math.PI/3)) + "px"
twelve.style.left = six.style.left = r + "px"
six.style.top = 2*r + "px"
twelve.style.top = "0px"

//--------------------------analog clock--------------------------
function setClock(){
    const currentTime = new Date()
    const secondsRatio = currentTime.getSeconds()/60
    const minutesRatio = (secondsRatio + currentTime.getMinutes())/60
    const hoursRatio = (minutesRatio + currentTime.getHours())/12
    setRotation(secondHand, secondsRatio)
    setRotation(minuteHand, minutesRatio)
    setRotation(hourHand, hoursRatio)
    backgroundAnalog()
}
function setRotation(element, rotationRatio){
    element.style.setProperty('--rotation', rotationRatio * 360)
}

//--------------------------draggable hands--------------------------
function draggableClock(hand){
    let active = false
    hand.addEventListener("mousedown", e =>{
        active = true
    })
    document.addEventListener("mouseup", e=>{
        active = false
    })
    document.addEventListener("mousemove", e=>{
       
        //console.log("mX: ", mX, ", mY: ",mY)
        if(active){
            let angle = Math.floor(Math.atan2(y,x) * radians)
            if (hand == hourHand){
                hourAngle = angle
                console.log(hourAngle)
            }
            rotate = angle + 90
            hand.style.transform = `rotate(${rotate}deg)`
            backgroundDrag()
        }
    })
    
}     


//-----------------------background change-----------------------
function backgroundAnalog(){
    const time = new Date()
    let hours = time.getHours()
    if ((12 <= hours && hours < 15) || (0 <= hours && hours < 3)) {//Morning
        document.body.background = "https://images.unsplash.com/22/good-mornin.JPG?ixlib=rb-4.0.3&q=80&cs=tinysrgb&fm=jpg&crop=entropy://c4.wallpaperflare.com/wallpaper/532/857/84/5k-good-morning-mountain-hill-wallpaper-preview.jpg"; 
        var type = "Morning";
    }
    if ((15 <= hours && hours < 18) || (3 <= hours && hours < 6)) {//Day
        document.body.background = "https://wallup.net/wp-content/uploads/2019/09/194365-sunset-clouds-nature-sun-skyscapes-evening-afternoon.jpg";
        var type = "Afternoon";
    }
    if ((18 <= hours && hours < 21) || (6 <= hours && hours < 9)) {//Evening
        document.body.background = "https://images.pexels.com/photos/771883/pexels-photo-771883.jpeg?cs=srgb&dl=pexels-reynaldo-brigworkz-brigantty-771883.jpg&fm=jpg";
        var type = "Evening";
    }
    if ((21 <= hours && hours < 24) || hours == 0) {//Night
        document.body.background = "https://images.hdqwalls.com/download/midnight-sun-zt-1920x1080.jpg";
        var type = "Night";
    }
}

function backgroundDrag(){
    if (-90 < hourAngle && hourAngle <= 0) {//Morning
        document.body.background = "https://images.unsplash.com/22/good-mornin.JPG?ixlib=rb-4.0.3&q=80&cs=tinysrgb&fm=jpg&crop=entropy://c4.wallpaperflare.com/wallpaper/532/857/84/5k-good-morning-mountain-hill-wallpaper-preview.jpg"; 
        var type = "Morning";
    }
    if (0 < hourAngle && hourAngle <= 90) {//Day
        document.body.background = "https://wallup.net/wp-content/uploads/2019/09/194365-sunset-clouds-nature-sun-skyscapes-evening-afternoon.jpg";
        var type = "Afternoon";
    }
    if (90 < hourAngle && hourAngle <= 180) {//Evening
        document.body.background = "https://images.pexels.com/photos/771883/pexels-photo-771883.jpeg?cs=srgb&dl=pexels-reynaldo-brigworkz-brigantty-771883.jpg&fm=jpg";
        var type = "Evening";
    }
    if (-180 < hourAngle && hourAngle <= -90) {//Night
        document.body.background = "https://images.hdqwalls.com/download/midnight-sun-zt-1920x1080.jpg";
        var type = "Night";
    }
}

analogButton.onclick = e => {
    setClock()
    setInterval(setClock, 1000)
    console.log("Clicked")
}


draggableClock(hourHand)
draggableClock(minuteHand)
draggableClock(secondHand)
//backgroundAnalog()
//setInterval(setClock, 1000)
//setInterval(backgroundAnalog, 1000)