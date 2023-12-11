import { useProgressBar } from "./progressBar.js"

const inputValueHTML = document.getElementById("input-value")
const toggleAnimateHTML = document.getElementById("toggle-animate")
const toggleHideHTML = document.getElementById("toggle-hide")

const progressBar = new useProgressBar("progress-bar")

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