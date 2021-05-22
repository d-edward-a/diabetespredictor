function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function get_user_details() {
    fetch(`/backend/user_data`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCookie("csrftoken"),
        },
        credentials: "same-origin",
    })
        .then(response => response.json())
        .then(data => {
            let new_object = JSON.parse(data);
            let username = new_object[0]["fields"]["username"];
            let email = new_object[0]["fields"]["email"];

            document.getElementById("username_details").innerText = username;
            document.getElementById("email_details").innerText = email;

        })
        .catch(err => {
            if (err.message.match(/Failed to fetch/)) {
                console.error("The server cannot be reached. Did you start it?");
            }
        });
}

function get_subscription_details(){
    fetch(`/backend/subscription_data`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCookie("csrftoken"),
        },
        credentials: "same-origin",
    })
        .then(response => response.json())
        .then(data => {
            let new_object = JSON.parse(data);

            if(new_object === true) {
                document.getElementById("newsletter_subscription_details").innerText = "subscribed";
                document.getElementById("subscribe_unsubscribe_button").innerText="Unsubscribe";
                document.getElementById("newsletter-text").innerText="Click the button to unsubscribe the newsletter.";
            }
            else {
                document.getElementById("newsletter_subscription_details").innerText = "unsubscribed";
                document.getElementById("subscribe_unsubscribe_button").innerText="Subscribe";
                document.getElementById("newsletter-text").innerText="Click the button to subscribe the newsletter.";
            }
        })
        .catch(err => {
            if (err.message.match(/Failed to fetch/)) {
                console.error("The server cannot be reached. Did you start it?");
            }
        });
}

function clear_assessments() {
    let element_exists = document.getElementById("new_history");
    if (element_exists != null) {
        document.getElementById("new_history").remove();
    }
    else {
        document.getElementById("historydetails").innerHTML = "";
        document.getElementById("delete_row").remove();
    }

    get_assessments();
}

function get_assessments() {
    get_user_details();
    get_subscription_details();

    let history_details = document.getElementById("historydetails");
    fetch(`/backend/history`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCookie("csrftoken"),
        },
        credentials: "same-origin",
    })
        .then(response => response.json())
        .then(data => {
            build_history_data(data, history_details);
        })
        .catch(err => {
            if (err.message.match(/Failed to fetch/)) {
                console.error("The server cannot be reached. Did you start it?");
            }
        });
}

get_assessments();

function build_history_data(data, container) {
    let counter = 1;

    if (Object.keys(data).length !== 0) {
        for (let item in data) {
            if (data.hasOwnProperty(item)) {
                const content = data[item];
                let tr = document.createElement("tr");
                tr.setAttribute("id", "row-"+ item);
                tr.name = "assessments";

                let td_ctr = document.createElement("td");
                td_ctr.appendChild(document.createTextNode(counter.toString()));
                tr.appendChild(td_ctr);

                for (let entry in content) {
                    if (content.hasOwnProperty(entry)) {
                        if (entry.toString() === "pressure" || entry.toString() === "disease" || entry.toString() === "tobacco" || entry.toString() === "education") {
                            if (content[entry] === 1) {
                                let td_yes = document.createElement("td");
                                td_yes.appendChild(document.createTextNode("Yes"));
                                tr.appendChild(td_yes);
                            }
                            else if (content[entry] === 0) {
                                let td_no = document.createElement("td");
                                td_no.appendChild(document.createTextNode("No"));
                                tr.appendChild(td_no);
                            }
                            continue;
                        }
                        let td = document.createElement("td");
                        td.appendChild(document.createTextNode(content[entry]));
                        tr.appendChild(td);
                    }
                }
                let td_del = document.createElement("td");
                td_del.style.textAlign = "end";
                let del = document.createElement("input");
                del.setAttribute("type", "checkbox");
                del.name = "delSEL";
                del.setAttribute("id", item);
                del.classList.add("form-check-input");
                td_del.appendChild(del);
                tr.appendChild(td_del);
                container.appendChild(tr);

                counter ++;
            }
        }
        let delete_btn = document.getElementById("history");

        let del_row = document.createElement("div");
        del_row.classList.add("row");
        del_row.setAttribute("id", "delete_row");
        del_row.classList.add("justify-content-center");

        let del_all = document.createElement("div");
        del_all.classList.add("col-2");

        let del_sel = document.createElement("div");
        del_sel.classList.add("col-2");

        let btn_del_all = document.createElement("input");
        btn_del_all.type = "button";
        btn_del_all.name = "deleteALL";
        btn_del_all.classList.add("btn");
        btn_del_all.classList.add("btn-danger");
        btn_del_all.value = "Delete ALL";
        btn_del_all.addEventListener("click", confirm_delete_all);

        let btn_del_sel = document.createElement("input");
        btn_del_sel.type = "button";
        btn_del_sel.name = "deleteSEL";
        btn_del_sel.classList.add("btn");
        btn_del_sel.classList.add("btn-outline-danger");
        btn_del_sel.value = "Delete Selected";
        btn_del_sel.addEventListener("click", delete_selected);

        delete_btn.appendChild(del_row);
        del_row.appendChild(del_all);
        del_row.appendChild(del_sel);
        del_all.appendChild(btn_del_all);
        del_sel.appendChild(btn_del_sel);
    }
    else {
        create_no_assessments_row();
    }
}

function create_no_assessments_row() {
    let new_history = document.getElementById("history");
    let new_row = document.createElement("div");
    new_row.setAttribute("id", "new_history");
    new_row.classList.add("row");
    new_row.classList.add("justify-content-center");

    new_row.appendChild(document.createTextNode("No assessments saved yet."));
    new_history.appendChild(new_row);
}

function get_selected_checkbox(name) {
    const checkbox = document.querySelectorAll(`input[name="${name}"]:checked`);
    let values = [];
    checkbox.forEach((check) => {
        values.push(check.id);
    });

    for (let val in values) {
        values[val] = parseInt(values[val])
    }
    return values;
}

function check_left_items() {
    fetch(`/backend/history`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCookie("csrftoken"),
        },
        credentials: "same-origin",
    })
        .then(response => response.json())
        .then(data => {
            if (Object.keys(data).length === 0) {
                document.getElementById("delete_row").remove();
                create_no_assessments_row();
            }
        })
        .catch(err => {
            if (err.message.match(/Failed to fetch/)) {
                console.error("The server cannot be reached. Did you start it?");
            }
        });
}

function get_all_checkbox(name) {
    const checkbox = document.querySelectorAll(`input[name="${name}"]`);
    let values = [];
    checkbox.forEach((check) => {
        values.push(check.id);
    });

    for (let val in values) {
        values[val] = parseInt(values[val])
    }
    return values;
}

function delete_selected() {
    let item_id = get_selected_checkbox("delSEL");

    fetch(`/backend/delete_selected`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCookie("csrftoken"),
        },
        credentials: "same-origin",
        body: JSON.stringify({
            items: item_id
        })
    })
        .then(response => {
            if (response.status === 200) {
                for (let item in item_id) {
                    document.getElementById("row-"+ item_id[item].toString()).remove();
                }
                check_left_items();
            }
            else if (response.status === 304) {
                $('#deleteUnsuccessful').modal('show');
            }
        })
        .catch(err => {
            if (err.message.match(/Failed to fetch/)) {
                console.error("The server cannot be reached. Did you start it?");
            }
        });
}

function confirm_delete_all() {
    $('#confirm_delete_all').modal('show');
}

function delete_all() {
    $('#confirm_delete_all').modal('hide');

    fetch(`/backend/delete_all`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCookie("csrftoken"),
        },
        credentials: "same-origin"
    })
        .then(response => {
            if (response.status === 200) {
                document.getElementById("historydetails").remove();
                document.getElementById("delete_row").remove();
                create_no_assessments_row();
            }
            else if (response.status === 304) {
                $('#deleteUnsuccessful').modal('show');
            }
        })
        .catch(err => {
            if (err.message.match(/Failed to fetch/)) {
                console.error("The server cannot be reached. Did you start it?");
            }
        });
}