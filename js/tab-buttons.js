function btn(clickedBtn) {
    var buttons = clickedBtn.parentElement.querySelectorAll(".btn");
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("btn-active");
    }
    clickedBtn.classList.add("btn-active");

    document.getElementById('all-section').classList.add("hidden");
    document.getElementById('open-section').classList.add("hidden");
    document.getElementById('close-section').classList.add("hidden");



    if (clickedBtn.id === 'all') {
        loadTheCards('all-section');
    } else if (clickedBtn.id === 'opened') {
        loadTheCards('open-section');
    } else if (clickedBtn.id === 'closed') {
        loadTheCards('close-section');
    }
}


//DISPLAY CARDS BASED ON ID
const displayIssues = (datas, id) => {
    const issueContainer = document.getElementById(id);
    issueContainer.innerHTML = "";

    const allSections = document.querySelectorAll('#all-section, #open-section, #close-section');
    allSections.forEach(section => section.classList.add('hidden'));
    
    issueContainer.classList.remove('hidden');
    
    console.log(id);

    let filteredData = datas;
    if (id === 'open-section') {
        filteredData = datas.filter(data => data.status === 'open');
    } else if (id === 'close-section') {
        filteredData = datas.filter(data => data.status === 'closed');
    }

    for (let data of filteredData) {
        const btnDiv = document.createElement("div");

        let statusImage = '';
        if (data.status === 'open') {
            statusImage = `<img src="assets/Open-Status.png" class="h-7 w-7">`;
        } else if (data.status === 'closed') {
            statusImage = `<img src="assets/Closed-Status.png" class="h-7 w-7">`;
        }

        let borderClass = '';
        if (data.status === 'open') {
            borderClass = `border-t-green-500`;
        } else if (data.status === 'closed') {
            borderClass = `border-t-purple-500`;
        }

        let priorityClass = '';
        if (data.priority === 'high') {
            priorityClass = `bg-red-300 text-red-700`;
        } else if (data.priority === 'medium') {
            priorityClass = `bg-yellow-300 text-yellow-700`;
        } else {
            priorityClass = `bg-gray-300 text-gray-700`;
        }

        btnDiv.innerHTML = `
            <div class="py-4 rounded-md border-t-4 ${borderClass} shadow-md flex flex-col gap-3 h-80">
                <div class="flex justify-between px-3">
                    <div id="status-image">
                        ${statusImage}
                    </div>
                    <button id="priority" class="btn rounded-full font-semibold px-5 inline-flex items-center h-7 cursor-default ${priorityClass}">${data.priority}</button>
                </div>
                <p class="font-semibold px-3">${data.title}</p>
                <p class="text-gray-600 text-sm px-3 flex-grow">${data.description}</p>
                <div id="tags">
                    <span></span>
                    <span></span>
                </div>
                <hr class="border-t border-gray-300">
                <p class="text-gray-600 text-sm px-3">${data.id} ${data.author}</p>
                <p class="text-gray-600 text-sm px-3">${data.createdAt}</p>
            </div>
        `;

        issueContainer.append(btnDiv);
    }
};

function loadTheCards(id) {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then((res) => res.json())
        .then((json) => displayIssues(json.data, id));
}

loadTheCards('all-section');