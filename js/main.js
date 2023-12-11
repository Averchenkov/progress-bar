class ProgressBar {
    constructor (elementId = "", value = 0) {
        this.value = value
        this.progressBarHTML = this.getProgressBar(elementId)
        this.progressRingHTML = this.progressBarHTML.getElementById("progress")
        this.stopAnimationHandler = this.callToStopAnimation.bind(this);
        const radius = this.progressRingHTML.r.baseVal.value
        this.circumference = 2 * Math.PI * radius
        this.progressRingHTML.style.strokeDasharray = `${this.circumference} ${this.circumference}`
        this.progressRingHTML.style.strokeDashoffset = this.circumference;
        this.setValue(this.value)
        this.show()
    }

    getProgressBar(elementId) {
        const element = document.getElementById(elementId)

        if (!element) {
            throw new Error("Progress bar not found")
        }

        return element
    }

    setValue(value) {
        let valueInt = parseInt(value)
    
        if (isNaN(valueInt) || valueInt < 0) {
            valueInt = 0
        } else if (valueInt > 100) {
            valueInt = 100
        }

        this.value = valueInt
        const offset = this.circumference - (valueInt / 100) * this.circumference
        this.progressRingHTML.style.strokeDashoffset = offset
    }

    getValue() {
        return this.value
    }

    hide() {
        this.progressBarHTML.classList.add("hidden")
    }

    show() {
        this.progressBarHTML.classList.remove("hidden")
    }

    startAnimation() {
        this.progressBarHTML.removeEventListener("animationiteration", this.stopAnimationHandler)
        this.progressBarHTML.classList.add("animated")
    }

    stopAnimation() {
        this.progressBarHTML.addEventListener("animationiteration", this.stopAnimationHandler)
    }

    callToStopAnimation() {
        this.progressBarHTML.removeEventListener("animationiteration", this.stopAnimationHandler)
        this.progressBarHTML.classList.remove("animated")
    }

    toggleVisibility() {
        this.progressBarHTML.classList.toggle("hidden")
    }
    
    toggleAnimation() {
        this.progressBarHTML.classList.toggle("animated")
    }    

    setVisibility(state) {
        if (state) {
            this.hide()
        } else {
            this.show()
        }
    }

    setAnimationState(state) {
        if (state) {
            this.startAnimation()
        } else {
            this.stopAnimation()
        }
    }
}

const inputValueHTML = document.getElementById("input-value")
const toggleAnimateHTML = document.getElementById("toggle-animate")
const toggleHideHTML = document.getElementById("toggle-hide")

const progressBar = new ProgressBar("progress-bar")

inputValueHTML.addEventListener("input", function(e) {
    this.value = this.value.replace(/^0(.+)/g,'$1')
    if (parseInt(this.value) > 100) { 
        this.value = this.value.slice(0, -1); 
        return false; 
    }
    progressBar.setValue(this.value)
    replaceBlank()
})

toggleAnimateHTML.addEventListener("click", function(e) {
    progressBar.setAnimationState(this.checked)
})

toggleHideHTML.addEventListener("click", function(e) {
    progressBar.setVisibility(this.checked)
})

const replaceBlank = debounce(() => {
    if (inputValueHTML.value === "") {
        inputValueHTML.value = 0
    }
}, 1500)

function debounce(func, timeout = 1000){
    let timer;
    return function(...args) {
        clearTimeout(timer)
        timer = setTimeout(() => {
            func.apply(this, args)
        }, timeout)
    };
}