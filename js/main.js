import { useProgressBar } from "./progressBar.js"

const inputValueHTML = document.getElementById("input-value")
const toggleAnimateHTML = document.getElementById("toggle-animate")
const toggleHideHTML = document.getElementById("toggle-hide")

const progressBar = useProgressBar("progress-bar")

inputValueHTML.addEventListener("change", function(e) {
    progressBar.setValue(this.value)
})

toggleAnimateHTML.addEventListener("click", function(e) {
    progressBar.setAnimationState(this.checked)
})

toggleHideHTML.addEventListener("click", function(e) {
    progressBar.setVisibility(this.checked)
})