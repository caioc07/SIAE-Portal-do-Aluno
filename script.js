

let events = JSON.parse(
    localStorage.getItem("siae_events")
) || [];

let requests = JSON.parse(
    localStorage.getItem("siae_requests")
) || [];


let currentDate = new Date();

let selectedDate = new Date();




const modal = document.getElementById("modal");

const closeModalButton =
    document.getElementById("closeModal");

const toast =
    document.getElementById("toast");

const toastMessage =
    document.getElementById("toastMessage");




const menuItems =
    document.querySelectorAll(".menu-item[data-section]");

const sections =
    document.querySelectorAll(".section");


function showSection(sectionId) {

    sections.forEach(section => {

        section.classList.remove(
            "active-section"
        );

    });


    const target =
        document.getElementById(sectionId);

    if (target) {

        target.classList.add(
            "active-section"
        );

    }


    menuItems.forEach(item => {

        item.classList.remove("active");

        if (
            item.dataset.section === sectionId
        ) {

            item.classList.add("active");

        }

    });


    if (sectionId === "agenda") {

        renderCalendar();

    }


    if (sectionId === "solicitacoes") {

        renderRequests();

    }

}


menuItems.forEach(item => {

    item.addEventListener("click", () => {

        showSection(
            item.dataset.section
        );

    });

});



document
    .querySelectorAll("[data-service]")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const service =
                    button.dataset.service;


                if (service === "solicitacoes") {

                    closeModal();

                    showSection(
                        "solicitacoes"
                    );

                    return;

                }


                openServiceModal(service);

            }
        );

    });




function openModal() {

    modal.classList.add("show");

}


function closeModal() {

    modal.classList.remove("show");

}


function hideAllModalContents() {

    document
        .querySelectorAll(".modal-content")
        .forEach(content => {

            content.classList.add("hidden");

        });

}


function openServiceModal(service) {

    hideAllModalContents();

    openModal();


    if (service === "quadra") {

        document
            .getElementById("quadraForm")
            .classList.remove("hidden");

    }


    if (service === "segunda-chamada") {

        document
            .getElementById("secondCallForm")
            .classList.remove("hidden");

    }


    if (service === "materiais") {

        document
            .getElementById("materialsForm")
            .classList.remove("hidden");

    }

}


closeModalButton.addEventListener(
    "click",
    closeModal
);


document
    .getElementById("cancelForm")
    .addEventListener(
        "click",
        closeModal
    );


document
    .getElementById("cancelMakeup")
    .addEventListener(
        "click",
        closeModal
    );


document
    .getElementById("cancelMaterial")
    .addEventListener(
        "click",
        closeModal
    );


document
    .getElementById("cancelEvent")
    .addEventListener(
        "click",
        closeModal
    );


modal.addEventListener(
    "click",
    event => {

        if (
            event.target === modal
        ) {

            closeModal();

        }

    }
);



function showToast(message) {

    toastMessage.textContent = message;

    toast.classList.add("show");


    setTimeout(() => {

        toast.classList.remove("show");

    }, 3500);

}



function saveEvents() {

    localStorage.setItem(
        "siae_events",
        JSON.stringify(events)
    );

}


function saveRequests() {

    localStorage.setItem(
        "siae_requests",
        JSON.stringify(requests)
    );

}



const calendarMonth =
    document.getElementById("calendarMonth");

const calendarDays =
    document.getElementById("calendarDays");


const monthNames = [
    "janeiro",
    "fevereiro",
    "março",
    "abril",
    "maio",
    "junho",
    "julho",
    "agosto",
    "setembro",
    "outubro",
    "novembro",
    "dezembro"
];


function dateToKey(date) {

    const year =
        date.getFullYear();

    const month =
        String(
            date.getMonth() + 1
        ).padStart(2, "0");

    const day =
        String(
            date.getDate()
        ).padStart(2, "0");


    return `${year}-${month}-${day}`;

}


function formatDate(date) {

    return date.toLocaleDateString(
        "pt-BR",
        {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        }
    );

}


function renderCalendar() {

    calendarDays.innerHTML = "";


    const year =
        currentDate.getFullYear();

    const month =
        currentDate.getMonth();


    calendarMonth.textContent =
        `${monthNames[month]} de ${year}`;


    const firstDay =
        new Date(
            year,
            month,
            1
        ).getDay();


    const daysInMonth =
        new Date(
            year,
            month + 1,
            0
        ).getDate();


    const previousMonthDays =
        new Date(
            year,
            month,
            0
        ).getDate();


    

    for (
        let i = firstDay - 1;
        i >= 0;
        i--
    ) {

        const day =
            previousMonthDays - i;


        const date =
            new Date(
                year,
                month - 1,
                day
            );


        createCalendarDay(
            date,
            true
        );

    }



    for (
        let day = 1;
        day <= daysInMonth;
        day++
    ) {

        const date =
            new Date(
                year,
                month,
                day
            );


        createCalendarDay(
            date,
            false
        );

    }
    const totalCells =
        calendarDays.children.length;


    const remaining =
        42 - totalCells;


    for (
        let day = 1;
        day <= remaining;
        day++
    ) {

        const date =
            new Date(
                year,
                month + 1,
                day
            );


        createCalendarDay(
            date,
            true
        );

    }

}


function createCalendarDay(
    date,
    otherMonth
) {

    const element =
        document.createElement("div");


    element.className =
        "calendar-day";


    if (otherMonth) {

        element.classList.add(
            "other-month"
        );

    }


    const key =
        dateToKey(date);


    if (
        key ===
        dateToKey(new Date())
    ) {

        element.classList.add(
            "today"
        );

    }


    if (
        key ===
        dateToKey(selectedDate)
    ) {

        element.classList.add(
            "selected"
        );

    }


    const number =
        document.createElement("div");


    number.className =
        "day-number";


    number.textContent =
        date.getDate();


    element.appendChild(number);


    const dayEvents =
        events.filter(
            event =>
                event.date === key
        );


    if (dayEvents.length > 0) {

        const preview =
            document.createElement("span");


        preview.className =
            "event-preview";


        preview.innerHTML =
            `<span class="event-dot"></span>
             ${dayEvents[0].title}`;


        element.appendChild(
            preview
        );

    }


    element.addEventListener(
        "click",
        () => {

            selectedDate =
                new Date(date);


            renderCalendar();

            renderEvents();

        }
    );


    calendarDays.appendChild(
        element
    );

}


document
    .getElementById("prevMonth")
    .addEventListener(
        "click",
        () => {

            currentDate.setMonth(
                currentDate.getMonth() - 1
            );

            renderCalendar();

        }
    );


document
    .getElementById("nextMonth")
    .addEventListener(
        "click",
        () => {

            currentDate.setMonth(
                currentDate.getMonth() + 1
            );

            renderCalendar();

        }
    );




function renderEvents() {

    const eventsList =
        document.getElementById(
            "eventsList"
        );


    const selectedDateTitle =
        document.getElementById(
            "selectedDateTitle"
        );


    selectedDateTitle.textContent =
        formatDate(selectedDate);


    eventsList.innerHTML = "";


    const key =
        dateToKey(selectedDate);


    const dayEvents =
        events
            .filter(
                event =>
                    event.date === key
            )
            .sort(
                (a, b) =>
                    a.time.localeCompare(
                        b.time
                    )
            );


    if (
        dayEvents.length === 0
    ) {

        eventsList.innerHTML = `

            <div class="empty-state">

                <i class="fa-regular fa-calendar"></i>

                <p>
                    Nenhum compromisso para este dia.
                </p>

            </div>

        `;

        return;

    }


    dayEvents.forEach(event => {

        const item =
            document.createElement("div");


        item.className =
            "event-item";


        item.innerHTML = `

            <button
                class="delete-event"
                title="Excluir compromisso"
                data-id="${event.id}">
                <i class="fa-solid fa-trash"></i>
            </button>

            <strong>
                ${escapeHTML(event.title)}
            </strong>

            <span class="event-time">
                ${event.time}
            </span>

            ${
                event.description
                ?
                `<div class="event-description">
                    ${escapeHTML(
                        event.description
                    )}
                </div>`
                :
                ""
            }

        `;


        item
            .querySelector(
                ".delete-event"
            )
            .addEventListener(
                "click",
                () => {

                    deleteEvent(
                        event.id
                    );

                }
            );


        eventsList.appendChild(
            item
        );

    });

}


function deleteEvent(id) {

    events =
        events.filter(
            event =>
                event.id !== id
        );


    saveEvents();

    renderCalendar();

    renderEvents();

    showToast(
        "Compromisso removido."
    );

}




document
    .getElementById("addEventBtn")
    .addEventListener(
        "click",
        () => {

            hideAllModalContents();

            document
                .getElementById(
                    "eventForm"
                )
                .classList.remove(
                    "hidden"
                );


            document
                .getElementById(
                    "eventDate"
                )
                .value =
                dateToKey(
                    selectedDate
                );


            openModal();

        }
    );


document
    .getElementById("courtForm")
    .addEventListener(
        "submit",
        event => {

            event.preventDefault();

            const start =
                document
                    .getElementById(
                        "courtStart"
                    )
                    .value;

            const end =
                document
                    .getElementById(
                        "courtEnd"
                    )
                    .value;

            if (start >= end) {
                showToast(
                    "O horário final deve ser maior que o inicial."
                );
                return;
            }

            const date =
                document
                    .getElementById(
                        "courtDate"
                    )
                    .value;

            const hoje = new Date();
            const anoAtual = hoje.getFullYear();
            const mesAtual = hoje.getMonth() + 1; 

            const [anoSelecionado, mesSelecionado] = date.split('-');

            if (parseInt(anoSelecionado) !== anoAtual || parseInt(mesSelecionado) < mesAtual) {
                showToast(
                    "O agendamento só pode ser feito para os meses restantes deste ano."
                );
                return;
            }

            const request = {

                id:
                    Date.now(),

                type:
                    "Agendamento de quadra",

                icon:
                    "fa-calendar-check",

                date:
                    new Date()
                        .toISOString(),

                details:
                    `${date} · ${start} às ${end}`,

                status:
                    "Pendente",

                data: {

                    name:
                        document
                            .getElementById(
                                "courtName"
                            )
                            .value,

                    class:
                        document
                            .getElementById(
                                "courtClass"
                            )
                            .value,

                    purpose:
                        document
                            .getElementById(
                                "courtPurpose"
                            )
                            .value

                }

            };

            requests.unshift(
                request
            );

            saveRequests();

            closeModal();

            event.target.reset();

            updateNotification();

            showToast(
                "Agendamento enviado com sucesso!"
            );

        }
    );

document
    .getElementById("courtForm")
    .addEventListener("submit", event => {

        event.preventDefault();

        const start = document.getElementById("courtStart").value;
        const end = document.getElementById("courtEnd").value;

        if (start >= end) {
            showToast("O horário final deve ser maior que o inicial.");
            return;
        }

        const date = document.getElementById("courtDate").value;

        const hoje = new Date();
        const anoAtual = hoje.getFullYear();
        const mesAtual = hoje.getMonth() + 1; 

        const [anoSelecionado, mesSelecionado] = date.split('-');

        if (parseInt(anoSelecionado) !== anoAtual || parseInt(mesSelecionado) !== mesAtual) {
            showToast("O agendamento só pode ser feito para o mês e ano atuais.");
            return;
        }

        const request = {
            id: Date.now(),
            type: "Agendamento de quadra",
            icon: "fa-calendar-check",
            date: new Date().toISOString(),
            details: `${date} · ${start} às ${end}`,
            status: "Pendente",
            data: {
                name: document.getElementById("courtName").value,
                class: document.getElementById("courtClass").value,
                purpose: document.getElementById("courtPurpose").value
            }
        };

        requests.unshift(request);
        saveRequests();
        closeModal();
        event.target.reset();
        updateNotification();
        showToast("Agendamento enviado com sucesso!");
    });




document
    .getElementById("makeupForm")
    .addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const attachment =
                document
                    .getElementById(
                        "makeupAttachment"
                    )
                    .files[0];


            const request = {

                id:
                    Date.now(),

                type:
                    "Solicitação de 2ª chamada",

                icon:
                    "fa-file-circle-exclamation",

                date:
                    new Date()
                        .toISOString(),

                details:
                    document
                        .getElementById(
                            "makeupSubject"
                        )
                        .value,

                status:
                    "Pendente",

                data: {

                    name:
                        document
                            .getElementById(
                                "makeupName"
                            )
                            .value,

                    class:
                        document
                            .getElementById(
                                "makeupClass"
                            )
                            .value,

                    examDate:
                        document
                            .getElementById(
                                "makeupDate"
                            )
                            .value,

                    reason:
                        document
                            .getElementById(
                                "makeupReason"
                            )
                            .value,

                    description:
                        document
                            .getElementById(
                                "makeupDescription"
                            )
                            .value,

                    attachment:
                        attachment
                        ?
                        attachment.name
                        :
                        null

                }

            };


            requests.unshift(
                request
            );


            saveRequests();


            closeModal();


            event.target.reset();


            updateNotification();

            showToast(
                "Requerimento de 2ª chamada enviado!"
            );

        }
    );




document
    .getElementById("materialForm")
    .addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const material =
                document
                    .getElementById(
                        "materialType"
                    )
                    .value;


            const quantity =
                document
                    .getElementById(
                        "materialQuantity"
                    )
                    .value;

            if (Number(quantity) > 100) {
                showToast("A quantidade máxima permitida é 100 unidades."); 
                return; 
            }


            const request = {

                id:
                    Date.now(),

                type:
                    "Solicitação de materiais",

                icon:
                    "fa-box-open",

                date:
                    new Date()
                        .toISOString(),

                details:
                    `${material} · ${quantity} unidade(s)`,

                status:
                    "Pendente",

                data: {

                    name:
                        document
                            .getElementById(
                                "materialName"
                            )
                            .value,

                    class:
                        document
                            .getElementById(
                                "materialClass"
                            )
                            .value,

                    material,

                    quantity,

                    purpose:
                        document
                            .getElementById(
                                "materialPurpose"
                            )
                            .value,

                    description:
                        document
                            .getElementById(
                                "materialDescription"
                            )
                            .value

                }

            };


            requests.unshift(
                request
            );


            saveRequests();


            closeModal();


            event.target.reset();


            updateNotification();

            showToast(
                "Solicitação de materiais enviada!"
            );

        }
    );




function renderRequests() {

    const container =
        document.getElementById(
            "requestsContainer"
        );


    container.innerHTML = "";


    if (
        requests.length === 0
    ) {

        container.innerHTML = `

            <div class="services-card">

                <div class="empty-state">

                    <i class="fa-solid fa-inbox"></i>

                    <p>
                        Você ainda não possui solicitações.
                    </p>

                </div>

            </div>

        `;

        return;

    }


    requests.forEach(request => {

        const card =
            document.createElement(
                "div"
            );


        card.className =
            "request-card";


        let statusClass =
            "pending";


        if (
            request.status ===
            "Aprovado"
        ) {

            statusClass =
                "approved";

        }


        if (
            request.status ===
            "Recusado"
        ) {

            statusClass =
                "rejected";

        }


        card.innerHTML = `

            <div class="request-icon">

                <i class="fa-solid ${request.icon}"></i>

            </div>

            <div class="request-info">

                <strong>
                    ${escapeHTML(
                        request.type
                    )}
                </strong>

                <small>
                    ${escapeHTML(
                        request.details
                    )}
                    ·
                    ${formatDate(
                        new Date(
                            request.date
                        )
                    )}
                </small>

            </div>

            <span class="status ${statusClass}">
                ${request.status}
            </span>

        `;


        container.appendChild(
            card
        );

    });

}




function updateNotification() {

    const badge =
        document.getElementById(
            "notificationBadge"
        );


    const pending =
        requests.filter(
            request =>
                request.status ===
                "Pendente"
        ).length;


    badge.textContent =
        pending;


    const notificationsEnabled =
        !settings || settings.notifications !== false;


    if (pending === 0 || !notificationsEnabled) {

        badge.style.display =
            "none";

    } else {

        badge.style.display =
            "flex";

    }

}




const notificationBtn =
    document.getElementById("notificationBtn");

const notificationPanel =
    document.getElementById("notificationPanel");

const notificationList =
    document.getElementById("notificationList");

const viewAllRequestsBtn =
    document.getElementById("viewAllRequests");


function renderNotificationPanel() {

    notificationList.innerHTML = "";


    if (requests.length === 0) {

        notificationList.innerHTML = `

            <div class="notification-empty">

                <i class="fa-regular fa-bell-slash"></i>

                <p>Nenhuma solicitação por aqui.</p>

            </div>

        `;

        return;

    }


    requests.slice(0, 6).forEach(request => {

        const item =
            document.createElement("div");

        item.className =
            "notification-item";


        let statusClass = "pending";

        if (request.status === "Aprovado") {
            statusClass = "approved";
        }

        if (request.status === "Recusado") {
            statusClass = "rejected";
        }


        item.innerHTML = `

            <div class="notification-item-icon">
                <i class="fa-solid ${request.icon}"></i>
            </div>

            <div class="notification-item-info">
                <strong>${escapeHTML(request.type)}</strong>
                <small>
                    ${escapeHTML(request.details)}
                    ·
                    ${formatDate(new Date(request.date))}
                </small>
            </div>

            <span class="status ${statusClass}">
                ${request.status}
            </span>

        `;


        notificationList.appendChild(item);

    });

}


notificationBtn.addEventListener(
    "click",
    event => {

        event.stopPropagation();

        renderNotificationPanel();

        notificationPanel.classList.toggle("show");

    }
);


document.addEventListener(
    "click",
    event => {

        if (!notificationBtn.contains(event.target)) {

            notificationPanel.classList.remove("show");

        }

    }
);


viewAllRequestsBtn.addEventListener(
    "click",
    event => {

        event.stopPropagation();

        notificationPanel.classList.remove("show");

        showSection("solicitacoes");

    }
);




let settings =
    JSON.parse(
        localStorage.getItem("siae_settings")
    ) || {
        darkMode: false,
        notifications: true,
        fontSize: "normal"
    };


const settingsBtn =
    document.getElementById("settingsBtn");

const settingsModal =
    document.getElementById("settingsModal");

const closeSettingsModal =
    document.getElementById("closeSettingsModal");

const darkModeToggle =
    document.getElementById("darkModeToggle");

const notificationsToggle =
    document.getElementById("notificationsToggle");

const fontSizeSelect =
    document.getElementById("fontSizeSelect");


function saveSettings() {

    localStorage.setItem(
        "siae_settings",
        JSON.stringify(settings)
    );

}


function applySettings() {

    document.body.classList.toggle(
        "dark-mode",
        settings.darkMode
    );

    document.body.classList.toggle(
        "font-large",
        settings.fontSize === "grande"
    );

    darkModeToggle.checked = settings.darkMode;
    notificationsToggle.checked = settings.notifications !== false;
    fontSizeSelect.value = settings.fontSize || "normal";

    updateNotification();

}


settingsBtn.addEventListener(
    "click",
    () => {

        settingsModal.classList.add("show");

    }
);


closeSettingsModal.addEventListener(
    "click",
    () => {

        settingsModal.classList.remove("show");

    }
);


settingsModal.addEventListener(
    "click",
    event => {

        if (event.target === settingsModal) {

            settingsModal.classList.remove("show");

        }

    }
);


darkModeToggle.addEventListener(
    "change",
    () => {

        settings.darkMode = darkModeToggle.checked;

        applySettings();
        saveSettings();

    }
);


notificationsToggle.addEventListener(
    "change",
    () => {

        settings.notifications = notificationsToggle.checked;

        applySettings();
        saveSettings();

    }
);


fontSizeSelect.addEventListener(
    "change",
    () => {

        settings.fontSize = fontSizeSelect.value;

        applySettings();
        saveSettings();

    }
);




const hamburgerBtn =
    document.getElementById("hamburgerBtn");

const sidebarEl =
    document.querySelector(".sidebar");

const sidebarOverlay =
    document.getElementById("sidebarOverlay");


hamburgerBtn.addEventListener(
    "click",
    () => {

        sidebarEl.classList.toggle("open");
        sidebarOverlay.classList.toggle("show");

    }
);


sidebarOverlay.addEventListener(
    "click",
    () => {

        sidebarEl.classList.remove("open");
        sidebarOverlay.classList.remove("show");

    }
);


menuItems.forEach(item => {

    item.addEventListener(
        "click",
        () => {

            sidebarEl.classList.remove("open");
            sidebarOverlay.classList.remove("show");

        }
    );

});




function escapeHTML(text) {

    if (!text) return "";

    return String(text)
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}




function initialize() {

    selectedDate =
        new Date();


    currentDate =
        new Date();


    renderCalendar();

    renderEvents();

    renderRequests();

    applySettings();

}


initialize();
