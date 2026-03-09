function btn(clickedBtn) {
    var buttons = clickedBtn.parentElement.querySelectorAll(".btn");
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("btn-active");
    }
    clickedBtn.classList.add("btn-active");

    document.getElementById('all-section').classList.add("hidden");
    document.getElementById('open-section').classList.add("hidden");
    document.getElementById('close-section').classList.add("hidden");


    document.getElementById('input-search').value = '';


    if (clickedBtn.id === 'all') {
        loadTheCards('all-section');
    } else if (clickedBtn.id === 'opened') {
        loadTheCards('open-section');
    } else if (clickedBtn.id === 'closed') {
        loadTheCards('close-section');
    }
}

const checkStatus = (STATUS) => {
    if (STATUS === 'open') {
        return `<span class="px-3 py-1 bg-green-300 font-medium rounded-full">Opened</span>`;
    }
    else {
        return `<span class="px-3 py-1 bg-purple-300 font-medium rounded-full">CLosed</span>`;

    }
}


const priorityCheck = (priority) => {
    if (priority === 'high') {
        return `<span class="font-semibold bg-red-400 text-red-900 rounded-full px-3">HIGH</span>`;
    }
    else if (priority === 'medium') {
        return `<span class="font-semibold bg-yellow-400 text-yellow-800 rounded-full px-3">MEDIUM</span>`;
    }
    else if (priority === 'low') {
        return `<span class="font-semibold bg-gray-400 text-gray-700 rounded-full px-3">LOW</span>`;

    }

}


const displayDetails = (issue) => {
    const modal = document.getElementById('issue_modal');
    const detailsContainer = document.getElementById('details-container');

    const labelsHtml = bringTheLabels(issue.labels || []);

    let statusImage = '';
    if (issue.status === 'open') {
        statusImage = '<img src="assets/Open-Status.png" class="h-6 w-6">';
    } else if (issue.status === 'closed') {
        statusImage = '<img src="assets/Closed-Status.png" class="h-6 w-6">';
    }

    let priorityClass = '';
    if (issue.priority === 'high') {
        priorityClass = 'bg-red-300 text-red-700';
    } else if (issue.priority === 'medium') {
        priorityClass = 'bg-yellow-200 text-yellow-600';
    } else {
        priorityClass = 'bg-gray-300 text-gray-700';
    }

    detailsContainer.innerHTML = `
        <div class="flex items-center gap-3 pb-3">
            <h3 class="text-xl font-bold mx-auto">${issue.title}</h3>
        </div>
        
        <div class="flex items-center gap-3">
            <span class="flex items-center gap-1">
                ${checkStatus(issue.status)}
            </span>
            <span class="text-gray-400 text-lg leading-none">•</span>
            <span>Opened by ${issue.author}</span>
            <span class="text-gray-400 text-lg leading-none">•</span>
            <span>${issue.createdAt}</span>
        </div>

        <div>
            <div class="flex gap-2">
                ${labelsHtml}
            </div>
        </div>
        
        <div class="p-4 rounded-lg">
            <p class="text-gray-700">${issue.description}</p>
        </div>
        
        
        
        <div class="grid grid-cols-2 text-sm bg-gray-100 py-4 px-5">
            <div class="mb-2">
                <p class="text-gray-500">Assignee:</p>
                <p class="font-semibold">${issue.assignee ? issue.assignee : "No Assignee"}</p>
            </div>
            <div>
                <p class="text-gray-500">Priority</p>
                ${priorityCheck(issue.priority)}
            </div>
        </div>
    `;

    modal.showModal();
    manageSpinner(false);
};


const loadDetails = (issueId) => {

    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${issueId}`)
        .then((res) => res.json())
        .then((data) => {
            displayDetails(data.data);
        })
};


const removeActive = () => {
    const issueButtons = document.querySelectorAll(".btns");
    issueButtons.forEach((btn) => btn.classList.remove("active"));
};

const manageSpinner = (status) => {
    if (status == true) {
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("allIssues").classList.add("hidden");
    } else {
        document.getElementById("allIssues").classList.remove("hidden");
        document.getElementById("spinner").classList.add("hidden");
    }
};

const bringTheLabels = (labels) => {
    return labels.map((label) =>
        `<span class="bg-yellow-400 text-yellow-700  rounded-full font-semibold 
                    inline-flex items-center px-3 py-0.5">${label}</span>`
    ).join(" ");
}


const displayIssues = (datas, id) => {
    const issueContainer = document.getElementById(id);
    issueContainer.innerHTML = "";

    const allSections = document.querySelectorAll('#all-section, #open-section, #close-section');
    allSections.forEach(section => section.classList.add('hidden'));

    issueContainer.classList.remove('hidden');

    const issues = document.getElementById('issue-numbers');
    issues.textContent = `${datas.length} Issues`;

    let filteredData = datas;
    if (id === 'open-section') {
        filteredData = datas.filter(data => data.status === 'open');
    } else if (id === 'close-section') {
        filteredData = datas.filter(data => data.status === 'closed');
    }

    issues.textContent = `${filteredData.length} Issues`;

    for (let data of filteredData) {
        const cardDiv = document.createElement("div");
        cardDiv.className = "cursor-pointer"; // Add cursor pointer to indicate clickable

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
            priorityClass = `bg-yellow-200 text-yellow-600`;
        } else {
            priorityClass = `bg-gray-300 text-gray-700`;
        }

        cardDiv.innerHTML = `
            <div class="py-4 rounded-md border-t-4 ${borderClass} shadow-lg flex flex-col gap-3 h-70 sm:h-75 md:h-85
            transition-transform duration-300 hover:-translate-y-1">
                <div class="flex justify-between px-3">
                    <div id="status-image">
                        ${statusImage}
                    </div>
                    <button id="priority" class="btn rounded-full font-semibold px-5 inline-flex items-center h-7 cursor-default ${priorityClass}">${data.priority}</button>
                </div>
                <p class="font-semibold px-3">${data.title}</p>
                <p class="text-gray-600 text-sm px-3 flex-grow">${data.description}</p>
                <div id="labels" class="flex flex-wrap gap-2 px-3">
                    ${bringTheLabels(data.labels)}
                </div>
                <hr class="border-t border-gray-300">
                <p class="text-gray-600 text-sm px-3">${data.id} ${data.author}</p>
                <p class="text-gray-600 text-sm px-3">${data.createdAt}</p>
            </div>
        `;
        cardDiv.addEventListener('click', () => loadDetails(data.id));

        issueContainer.append(cardDiv);
    }
    manageSpinner(false);
};

function loadTheCards(id) {
    manageSpinner(true);

    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then((res) => res.json())
        .then((json) => displayIssues(json.data, id));
}

loadTheCards('all-section');


document.getElementById("btn-search").addEventListener("click", () => {
    removeActive();

    const filterButtons = document.querySelectorAll(".btns");
    filterButtons.forEach(btn => btn.classList.remove("btn-active"));

    const input = document.getElementById("input-search");
    const searchValue = input.value.trim().toLowerCase();

    if (searchValue === "") {
        loadTheCards('all-section');
        return;
    }

    manageSpinner(true);

    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then((res) => res.json())
        .then((data) => {
            const allIssues = data.data;

            const filteredIssues = allIssues.filter((issue) =>
                JSON.stringify(issue).toLowerCase().includes(searchValue)
            );

            displayIssues(filteredIssues, 'all-section');
        });
});