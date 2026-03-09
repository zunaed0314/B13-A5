function btn(clickedBtn) {
    var buttons = clickedBtn.parentElement.querySelectorAll(".btn");
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("btn-active");
    }
    clickedBtn.classList.add("btn-active");

    document.getElementById('all').classList.add("hidden");
    document.getElementById('open').classList.add("hidden");
    document.getElementById('close').classList.add("hidden");

    if (clickedBtn.id === 'all') {
        loadTheCards('all');
    } else if (clickedBtn.id === 'opened') {
        loadTheCards('open');
    } else if (clickedBtn.id === 'closed') {
        loadTheCards('close');
    }
}


//DISPLAY CARDS BASED ON ID
const displayIssues = (datas, id) => {
    const issueContainer = document.getElementById(id);
    issueContainer.innerHTML = "";

    console.log(id);

    for (let data of datas) {

        const btnDiv = document.createElement("div");

        let statusImage = '';

        if (data.status === 'open') {
            statusImage = '<img src="assets/Open-status.png" class="h-7 w-7">';
        } else if (data.status === 'closed') {
            statusImage = '<img src="assets/Closed-status.png" class="h-7 w-7">';
        }


        let priorityClass = '';
        if (data.priority === 'High') {
            priorityClass = 'bg-red-300 text-red-700';
        } else if (data.priority === 'Medium') {
            priorityClass = 'bg-yellow-300 text-yellow-700';
        } else {
            priorityClass = 'bg-gray-300 text-gray-700';
        }



        btnDiv.innerHTML = `
                <div class="py-4 rounded-md border-t-4 border-t-green-500 shadow-md flex flex-col gap-3">
                <div class="flex justify-between  px-3">
                    <div id="status-image">
                        ${statusImage}
                    </div>
                    <button id="priority" class="btn rounded-full font-semibold px-5 inline-flex items-center h-7 w-7 ${priorityClass}">${data.priority}</button>
                </div>
                <p class="font-semibold  px-3">${data.title}</p>
                <p class="text-gray-600 text-sm px-3">${data.description}</p>
                <div id="tags">
                    <span > </span>
                    <span > </span>
                </div>
                <hr class="border-t border-gray-300">
                <p class="text-gray-600 text-sm px-3">${data.id} ${data.author}</p>
                <p class="text-gray-600 text-sm px-3">${data.createdAt}</p>
            </div>
    `;

        issueContainer.append(btnDiv);
    }

}


function loadTheCards(id) {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then((res) => res.json())
        .then((json) => displayIssues(json.data, id));
}
