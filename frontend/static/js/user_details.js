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

function show_privacy_policy() {
    $('#privacyPolicy').modal('show');
}

function change_mail() {
    document.getElementById("new-mail").value = "";
    document.getElementById("email_error").innerHTML = "";
    $('#changeMail').modal('show');
}

function save_mail() {
    let new_mail = document.getElementById("new-mail").value;
    let old_mail = document.getElementById("email_details").innerText;

    document.getElementById("email_error").innerHTML = "";

    const re_email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!new_mail) {
        document.getElementById("email_error").innerHTML = "Username cannot be blank!";
        document.getElementById("email_error_break").style.display = "unset";
    }
    else if (new_mail === old_mail) {
        document.getElementById("email_error").innerHTML = "New email is the same as current!";
        document.getElementById("email_error_break").style.display = "unset";
    }
    else if (!new_mail.match(re_email)) {
        document.getElementById("email_error").innerHTML = "Please ensure email format is valid!";
        document.getElementById("email_error_break").style.display = "unset";
    }
    else {
            fetch(`/backend/change_email`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": getCookie("csrftoken"),
                },
                credentials: "same-origin",
                body: JSON.stringify({
                    new_mail: new_mail,
                    old_mail: old_mail,
                })
            })
                .then(response => {
                    if (response.status === 200) {
                        $('#changeMail').modal('hide');
                        document.getElementById("email_details").innerText = "";
                        document.getElementById("email_details").innerText = new_mail;
                    }
                    else if (response.status === 302) {
                        document.getElementById("email_error").innerHTML = "Email entered is already in use!";
                        document.getElementById("email_error_break").style.display = "unset";
                    }
                })
                .catch(err => {
                    if (err.message.match(/Failed to fetch/)) {
                        console.error("The server cannot be reached. Did you start it?");
                    }
                });
        }
}

function change_username() {
    document.getElementById("new-username").value = "";
    document.getElementById("username_error").innerHTML = "";
    $('#changeUsername').modal('show');
}

function save_username() {
    document.getElementById("username_error").innerHTML = "";
    let new_username = document.getElementById("new-username").value;
    if (!new_username) {
        document.getElementById("username_error").innerHTML = "Username cannot be blank!";
        document.getElementById("username_error_break").style.display = "unset";
    }
    else {
        fetch(`/backend/change_username`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCookie("csrftoken"),
            },
            credentials: "same-origin",
            body: JSON.stringify({
                new_username: new_username,
            })
        })
            .then(response => {
                if (response.status === 200) {
                    $('#changeUsername').modal('hide');
                    document.getElementById("username_details").innerText = "";
                    document.getElementById("username_details").innerText = new_username;
                }
                else if (response.status === 226) {
                    document.getElementById("username_error").innerHTML = "New username is the same as current!";
                    document.getElementById("username_error_break").style.display = "unset";
                }
                else if (response.status === 302) {
                    document.getElementById("username_error").innerHTML = "Username already taken!";
                    document.getElementById("username_error_break").style.display = "unset";
                }
            })
            .catch(err => {
                if (err.message.match(/Failed to fetch/)) {
                    console.error("The server cannot be reached. Did you start it?");
                }
            });
    }
}

function change_password() {
    document.getElementById("current-password").value = "";
    document.getElementById("new-password").value = "";
    document.getElementById("confirm-new-password").value = "";
    document.getElementById("password_error").innerHTML = "";
    document.getElementById("confirm_password_error").innerHTML = "";
    $('#changePassword').modal('show');
}

function save_password() {
    document.getElementById("password_error").innerHTML = "";
    document.getElementById("confirm_password_error").innerHTML = "";

    let old_password = document.getElementById("current-password").value;
    let new_password = document.getElementById("new-password").value;
    let confirm_new_password = document.getElementById("confirm-new-password").value;

    const password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

    if (new_password !== confirm_new_password) {
        document.getElementById("confirm_password_error").innerHTML = "Password does not match!";
        document.getElementById("confirm_password_error_break").style.display = "unset";
    }
    else {
        if (old_password === new_password) {
            document.getElementById("password_error").innerHTML = "New password is the same as current!";
            document.getElementById("password_error_break").style.display = "unset";
        }
        else if (!new_password.match(password)) {
            document.getElementById("password_error").innerHTML = "Password is not valid.";
            document.getElementById("password_error_break").style.display = "unset";
        }
        else {
            fetch(`/backend/check_user`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": getCookie("csrftoken"),
                },
                credentials: "same-origin",
                body: JSON.stringify({
                    old_password: old_password,
                    new_password: new_password,
                })
            })
                .then(response => {
                    if (response.status === 200) {
                        $('#changePassword').modal('hide');
                    }
                    else if (response.status === 304) {
                        $('#changePassword').modal('hide');
                        $('#changePasswordUnsuccessful').modal('show');
                    }
                })
                .catch(err => {
                    if (err.message.match(/Failed to fetch/)) {
                        console.error("The server cannot be reached. Did you start it?");
                    }
                });
        }
    }
}

function confirm_delete_account() {
    $('#deleteAccount').modal('show');
}

function delete_account() {
    fetch(`/backend/delete_user`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCookie("csrftoken"),
        },
        credentials: "same-origin"
    })
        .then(response => {
            if (response.status === 200) {
                $('#deleteAccount').modal('hide');
                window.location.href = "register";
            }
            else if (response.status === 304) {
                $('#deleteAccount').modal('hide');
                $('#deleteAccountUnsuccessful').modal('show');
            }
        })
}

function subscribe_unsubscribe() {
    $('#changeSubscription').modal('show');
}

function save_subscription(){
    let subscribe_unsubscribe = document.getElementById("subscribe_unsubscribe_button").innerText;
    let mail = document.getElementById("email_details").innerText;

    if (subscribe_unsubscribe === "Subscribe"){
        fetch(`/backend/subscribe_newsletter`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCookie("csrftoken"),
            },
            credentials: "same-origin",
            body: JSON.stringify({
                mail: mail,
            })
        })
            .then(response => {
                if (response.status === 200) {
                    $('#changeSubscription').modal('hide');
                    document.getElementById("newsletter_subscription_details").innerText = "";
                    document.getElementById("subscribe_unsubscribe_button").innerText="";
                    document.getElementById("newsletter-text").innerText="";
                    document.getElementById("newsletter_subscription_details").innerText = "subscribed";
                    document.getElementById("subscribe_unsubscribe_button").innerText="Unsubscribe";
                    document.getElementById("newsletter-text").innerText="Click the button to unsubscribe the newsletter.";
                }
                else if (response.status === 304) {
                    $('#changeSubscription').modal('hide');
                    $('#changeSubscriptionUnsuccessful').modal('hide');
                }
            })
            .catch(err => {
                if (err.message.match(/Failed to fetch/)) {
                    console.error("The server cannot be reached. Did you start it?");
                }
            });
    }
    else {
        fetch(`/backend/unsubscribe_newsletter`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCookie("csrftoken"),
            },
            credentials: "same-origin",
            body: JSON.stringify({
                mail:mail,
            })
        })
            .then(response => {
                if (response.status === 200) {
                    $('#changeSubscription').modal('hide');
                    document.getElementById("newsletter_subscription_details").innerText = "";
                    document.getElementById("subscribe_unsubscribe_button").innerText="";
                    document.getElementById("newsletter-text").innerText="";
                    document.getElementById("newsletter_subscription_details").innerText = "unsubscribed";
                    document.getElementById("subscribe_unsubscribe_button").innerText="Subscribe";
                    document.getElementById("newsletter-text").innerText="Click the button to subscribe the newsletter.";
                }
                else if (response.status === 302) {
                    $('#changeSubscription').modal('hide');
                    $('#changeSubscriptionUnsuccessful').modal('hide');
                }
            })
            .catch(err => {
                if (err.message.match(/Failed to fetch/)) {
                    console.error("The server cannot be reached. Did you start it?");
                }
            });
    }
}