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

function send_reset_password_mail() {
    let reset_mail = document.getElementById("address").value;
    document.getElementById("mail-link").innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>&nbsp;Sending...`;

    fetch(`/backend/send_reset_email`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCookie("csrftoken"),
        },
        credentials: "same-origin",
        body: JSON.stringify({
            mail: reset_mail
        })
    })
        .then(response => {
            if (response.status === 200) {
                document.getElementById("reset_message").style.display = "none";
                document.getElementById("email_form").style.display = "none";
                document.getElementById("send_email_successful").style = ";display: block !important;";
            }
            else if (response.status === 304) {
                document.getElementById("reset_message").style.display = "none";
                document.getElementById("email_form").style.display = "none";
                document.getElementById("send_email_successful").style = ";display: block !important;";
            }
        })
        .catch(err => {
            if (err.message.match(/Failed to fetch/)) {
                console.error("The server cannot be reached. Did you start it?");
            }
        });
}

function set_new_password() {
    document.getElementById("password_error").innerHTML = "";
    document.getElementById("confirm_password_error").innerHTML = "";

    let new_password = document.getElementById("new-password").value;
    let confirm_new_password = document.getElementById("confirm-new-password").value;

    const password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    let queryString = window.location.search;

    queryString = queryString.substr(4);

    if (new_password !== confirm_new_password) {
        document.getElementById("confirm_password_error").innerHTML = "Password does not match!";
        document.getElementById("confirm_password_error_break").style.display = "unset";
    }
    else {
        if (!new_password.match(password)) {
            document.getElementById("password_error").innerHTML = "Password is not valid.";
            document.getElementById("password_error_break").style.display = "unset";
        }
        else {
            fetch(`/backend/reset_password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": getCookie("csrftoken"),
                },
                credentials: "same-origin",
                body: JSON.stringify({
                    new_password: new_password,
                    queryString: queryString
                })
            })
                .then(response => {
                    if (response.status === 200) {
                        document.getElementById("set_new_password_1").style.display = "none";
                        document.getElementById("set_new_password_2").style.display = "none";
                        document.getElementById("set_new_password_3").style.display = "none";
                        document.getElementById("set_new_password_4").style.display = "none";
                        document.getElementById("set_new_password_5").style.display = "none";
                        document.getElementById("login_link").style.display="block";
                        document.getElementById("change_password_success").style = ";display: block !important;";
                    }
                    else if (response.status === 301){
                        document.getElementById("not_reset").innerHTML = "The reset password time has expired. Please restart the reset process.";
                        document.getElementById("reset_error_break").style.display = "inline";
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