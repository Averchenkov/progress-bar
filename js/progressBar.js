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

export function useProgressBar (elementId, value) {
    return new ProgressBar(elementId, value)
}