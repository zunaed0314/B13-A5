function btn(clickedBtn) {
    var buttons = clickedBtn.parentElement.querySelectorAll(".btn");
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("btn-active");
    }
    clickedBtn.classList.add("btn-active");


    document.getElementById('jobs').classList.add("hidden");
    document.getElementById('interview-section').classList.add("hidden");
    document.getElementById('reject-section').classList.add("hidden");
}