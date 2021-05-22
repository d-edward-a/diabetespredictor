$(window).on('load',function(){
    if (!sessionStorage.getItem('accept', 'accept')){
        $('#TandCModal').modal('show');
        sessionStorage.setItem('shown-modal', 'true');
    }
});

$('[data-toggle="popover"]').popover({ trigger: "manual" , html: true, animation:true})
    .on("mouseenter", function () {
        var _this = this;
        $(this).popover("show");
        $(".popover").on("mouseleave", function () {
            $(_this).popover('hide');
        });
    }).on("mouseleave", function () {
    var _this = this;
    setTimeout(function () {
        if (!$(".popover:hover").length) {
            $(_this).popover("hide");
        }
    }, 300);
});

$('.random class given to span').popover({
    delay: 100,
    html : true,
    content: function() {
        return $('#popover_content').html();
    }
});

$('[data-toggle="popover"]').on('shown.bs.popover', function () {
    $('.popover-body a').click(function(){
        var currentElementId=$(this).attr('id');
        if(currentElementId=="registeredUser"){
            go_to_registered_user();
        }
        else if(currentElementId=="pp"){
            $('#collapseFour_References').collapse('toggle');
        }
        else if(currentElementId=="TaC"){
            $('#collapseEight_References').collapse('toggle');
        }
    });
})

$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
});

function go_to_registered_user(){
    var active_link = document.getElementById("assessment-tab");
    var privacy_link = document.getElementById("privacy-tab");
    var assessment_content = document.getElementById("assessment");
    var privacy_content = document.getElementById("privacy");

    active_link.classList.remove("active");
    privacy_link.classList.add("active");
    assessment_content.classList.remove("active");
    assessment_content.classList.remove("show");

    privacy_content.classList.add("show");
    privacy_content.classList.add("active");

    $("#collapseTwo").collapse('toggle');
    $("#collapseScopeTwo").collapse('toggle');
    $('html, body').animate({
        scrollTop: $("#element_target").offset().top
    }, 1000);
}

function highlight_sentence(item) {
    item.style.backgroundColor = "#ffff0069";
    item.style.textDecorationLine = "none";
}

function remove_highlight(item) {
    item.style.backgroundColor = "transparent";
    item.style.textDecorationLine = "underline";
    item.style.textDecorationColor = "#8b000070";
}

//jQuery time
let current_fs, next_fs, previous_fs; //fieldsets
let left, opacity, scale; //fieldset properties which we will animate
let animating; //flag to prevent quick multi-click glitches

$(".next1").click(function(){
    if (document.getElementById("age").value !== "" && (document.getElementById("genderM").checked === true || document.getElementById("genderF").checked === true)) {
        document.getElementById("age").style.borderColor = "black";
        document.getElementById("gender_m").style.color = "black";
        document.getElementById("gender_f").style.color = "black";

        if (animating)
            return false;

        animating = true;

        current_fs = $(this).parent();
        next_fs = $(this).parent().next();

        //activate next step on progressbar using the index of next_fs
        $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
        //show the next fieldset
        next_fs.show();
        //hide the current fieldset with style
        current_fs.animate({opacity: 0}, {
            step: function(now, mx) {
                //as the opacity of current_fs reduces to 0 - stored in "now"
                //1. scale current_fs down to 80%
                scale = 1 - (1 - now) * 0.2;
                //2. bring next_fs from the right(50%)
                left = (now * 50)+"%";
                //3. increase opacity of next_fs to 1 as it moves in
                opacity = 1 - now;
                current_fs.css({
                    'transform': 'scale('+scale+')',
                    'position': 'absolute'
                });
                next_fs.css({'left': left, 'opacity': opacity});
            },
            duration: 800,
            complete: function(){
                current_fs.hide();
                animating = false;
            },
            //this comes from the custom easing plugin
            easing: 'easeInOutBack'
        });
    }
    else {
        if (document.getElementById("age").value === "") {
            document.getElementById("age").style.borderColor = "red";
        }
        else {
            document.getElementById("age").style.borderColor = "black";
        }
        if (document.getElementById("genderM").checked === false && document.getElementById("genderF").checked === false) {
            document.getElementById("gender_m").style.color = "red";
            document.getElementById("gender_f").style.color = "red";
        }
        else {
            document.getElementById("gender_m").style.color = "black";
            document.getElementById("gender_f").style.color = "black";
        }
    }
});

$(".next2").click(function(){
    if ((document.getElementById("hb_yes").checked === true || document.getElementById("hb_no").checked === true) &&
        (document.getElementById("heart_yes").checked === true || document.getElementById("heart_no").checked === true) &&
        (document.getElementById("tobacco_yes").checked === true || document.getElementById("tobacco_no").checked === true)) {
        document.getElementById("hb_rad_yes").style.color = "black";
        document.getElementById("hb_rad_no").style.color = "black";
        document.getElementById("heart_rad_yes").style.color = "black";
        document.getElementById("heart_rad_no").style.color = "black";
        document.getElementById("tobacco_rad_yes").style.color = "black";
        document.getElementById("tobacco_rad_no").style.color = "black";

        if (animating)
            return false;

        animating = true;

        current_fs = $(this).parent();
        next_fs = $(this).parent().next();

        //activate next step on progressbar using the index of next_fs
        $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
        //show the next fieldset
        next_fs.show();
        //hide the current fieldset with style
        current_fs.animate({opacity: 0}, {
            step: function(now, mx) {
                //as the opacity of current_fs reduces to 0 - stored in "now"
                //1. scale current_fs down to 80%
                scale = 1 - (1 - now) * 0.2;
                //2. bring next_fs from the right(50%)
                left = (now * 50)+"%";
                //3. increase opacity of next_fs to 1 as it moves in
                opacity = 1 - now;
                current_fs.css({
                    'transform': 'scale('+scale+')',
                    'position': 'absolute'
                });
                next_fs.css({'left': left, 'opacity': opacity});
            },
            duration: 800,
            complete: function(){
                current_fs.hide();
                animating = false;
            },
            //this comes from the custom easing plugin
            easing: 'easeInOutBack'
        });
    }
    else {
        if (document.getElementById("hb_yes").checked === false && document.getElementById("hb_no").checked === false) {
            document.getElementById("hb_rad_yes").style.color = "red";
            document.getElementById("hb_rad_no").style.color = "red";
        }
        else {
            document.getElementById("hb_rad_yes").style.color = "black";
            document.getElementById("hb_rad_no").style.color = "black";
        }
        if (document.getElementById("heart_yes").checked === false && document.getElementById("heart_no").checked === false) {
            document.getElementById("heart_rad_yes").style.color = "red";
            document.getElementById("heart_rad_no").style.color = "red";
        }
        else {
            document.getElementById("heart_rad_yes").style.color = "black";
            document.getElementById("heart_rad_no").style.color = "black";
        }
        if (document.getElementById("tobacco_yes").checked === false && document.getElementById("tobacco_no").checked === false) {
            document.getElementById("tobacco_rad_yes").style.color = "red";
            document.getElementById("tobacco_rad_no").style.color = "red";
        }
        else {
            document.getElementById("tobacco_rad_yes").style.color = "black";
            document.getElementById("tobacco_rad_no").style.color = "black";
        }
    }
});

$(".next3").click(function(){
    if ((document.getElementById("education_yes").checked === true || document.getElementById("education_no").checked === true) &&
        (document.getElementById("1-8").checked === true || document.getElementById("9-11").checked === true || document.getElementById("High School").checked === true || document.getElementById("College").checked === true) &&
        (document.getElementById("Poor").checked === true || document.getElementById("Fair").checked === true || document.getElementById("Good").checked === true)) {
        document.getElementById("education_rad_yes").style.color = "black";
        document.getElementById("education_rad_no").style.color = "black";
        document.getElementById("degree_1_8").style.color = "black";
        document.getElementById("degree_9_11").style.color = "black";
        document.getElementById("degree_hs").style.color = "black";
        document.getElementById("degree_college").style.color = "black";
        document.getElementById("knowledge_poor").style.color = "black";
        document.getElementById("knowledge_fair").style.color = "black";
        document.getElementById("knowledge_good").style.color = "black";

        if (animating)
            return false;

        animating = true;

        current_fs = $(this).parent();
        next_fs = $(this).parent().next();

        //activate next step on progressbar using the index of next_fs
        $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
        //show the next fieldset
        next_fs.show();
        //hide the current fieldset with style
        current_fs.animate({opacity: 0}, {
            step: function(now, mx) {
                //as the opacity of current_fs reduces to 0 - stored in "now"
                //1. scale current_fs down to 80%
                scale = 1 - (1 - now) * 0.2;
                //2. bring next_fs from the right(50%)
                left = (now * 50)+"%";
                //3. increase opacity of next_fs to 1 as it moves in
                opacity = 1 - now;
                current_fs.css({
                    'transform': 'scale('+scale+')',
                    'position': 'absolute'
                });
                next_fs.css({'left': left, 'opacity': opacity});
            },
            duration: 800,
            complete: function(){
                current_fs.hide();
                animating = false;
            },
            //this comes from the custom easing plugin
            easing: 'easeInOutBack'
        });
    }
    else {
        if (document.getElementById("education_yes").checked === false && document.getElementById("education_no").checked === false) {
            document.getElementById("education_rad_yes").style.color = "red";
            document.getElementById("education_rad_no").style.color = "red";
        }
        else {
            document.getElementById("education_rad_yes").style.color = "black";
            document.getElementById("education_rad_no").style.color = "black";
        }
        if (document.getElementById("1-8").checked === false && document.getElementById("9-11").checked === false && document.getElementById("High School").checked === false && document.getElementById("College").checked === false) {
            document.getElementById("degree_1_8").style.color = "red";
            document.getElementById("degree_9_11").style.color = "red";
            document.getElementById("degree_hs").style.color = "red";
            document.getElementById("degree_college").style.color = "red";
        }
        else {
            document.getElementById("degree_1_8").style.color = "black";
            document.getElementById("degree_9_11").style.color = "black";
            document.getElementById("degree_hs").style.color = "black";
            document.getElementById("degree_college").style.color = "black";
        }
        if (document.getElementById("Poor").checked === false && document.getElementById("Fair").checked === false && document.getElementById("Good").checked === false) {
            document.getElementById("knowledge_poor").style.color = "red";
            document.getElementById("knowledge_fair").style.color = "red";
            document.getElementById("knowledge_good").style.color = "red";
        }
        else {
            document.getElementById("knowledge_poor").style.color = "black";
            document.getElementById("knowledge_fair").style.color = "black";
            document.getElementById("knowledge_good").style.color = "black";
        }
    }
});

$(".next4").click(function(){
    if ((document.getElementById("0").checked === true || document.getElementById("1-2").checked === true || document.getElementById("3-4").checked === true || document.getElementById("5 or more").checked === true) &&
        (document.getElementById("0bev").checked === true || document.getElementById("1").checked === true || document.getElementById("2").checked === true || document.getElementById("3 or more").checked === true || document.getElementById("Not sure bev").checked === true) &&
        (document.getElementById("0days").checked === true || document.getElementById("1day").checked === true || document.getElementById("2days").checked === true || document.getElementById("3days").checked === true || document.getElementById("4days").checked === true || document.getElementById("5plusdays").checked === true || document.getElementById("Not sure ex").checked === true)) {
        document.getElementById("food_0").style.color = "black";
        document.getElementById("food_1_2").style.color = "black";
        document.getElementById("food_3_4").style.color = "black";
        document.getElementById("food_5_plus").style.color = "black";
        document.getElementById("sugar_0").style.color = "black";
        document.getElementById("sugar_1").style.color = "black";
        document.getElementById("sugar_2").style.color = "black";
        document.getElementById("sugar_3").style.color = "black";
        document.getElementById("sugar_not_sure").style.color = "black";
        document.getElementById("exercise_0").style.color = "black";
        document.getElementById("exercise_1").style.color = "black";
        document.getElementById("exercise_2").style.color = "black";
        document.getElementById("exercise_3").style.color = "black";
        document.getElementById("exercise_4").style.color = "black";
        document.getElementById("exercise_5").style.color = "black";
        document.getElementById("exercise_not_sure").style.color = "black";

        if (animating)
            return false;

        animating = true;

        current_fs = $(this).parent();
        next_fs = $(this).parent().next();

        //activate next step on progressbar using the index of next_fs
        $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
        //show the next fieldset
        next_fs.show();
        //hide the current fieldset with style
        current_fs.animate({opacity: 0}, {
            step: function(now, mx) {
                //as the opacity of current_fs reduces to 0 - stored in "now"
                //1. scale current_fs down to 80%
                scale = 1 - (1 - now) * 0.2;
                //2. bring next_fs from the right(50%)
                left = (now * 50)+"%";
                //3. increase opacity of next_fs to 1 as it moves in
                opacity = 1 - now;
                current_fs.css({
                    'transform': 'scale('+scale+')',
                    'position': 'absolute'
                });
                next_fs.css({'left': left, 'opacity': opacity});
            },
            duration: 800,
            complete: function(){
                current_fs.hide();
                animating = false;
            },
            //this comes from the custom easing plugin
            easing: 'easeInOutBack'
        });
    }
    else {
        if (document.getElementById("0").checked === false &&
            document.getElementById("1-2").checked === false &&
            document.getElementById("3-4").checked === false &&
            document.getElementById("5 or more").checked === false) {
            document.getElementById("food_0").style.color = "red";
            document.getElementById("food_1_2").style.color = "red";
            document.getElementById("food_3_4").style.color = "red";
            document.getElementById("food_5_plus").style.color = "red";
        }
        else {
            document.getElementById("food_0").style.color = "black";
            document.getElementById("food_1_2").style.color = "black";
            document.getElementById("food_3_4").style.color = "black";
            document.getElementById("food_5_plus").style.color = "black";
        }
        if (document.getElementById("0bev").checked === false &&
            document.getElementById("1").checked === false &&
            document.getElementById("2").checked === false &&
            document.getElementById("3 or more").checked === false &&
            document.getElementById("Not sure bev").checked === false) {
            document.getElementById("sugar_0").style.color = "red";
            document.getElementById("sugar_1").style.color = "red";
            document.getElementById("sugar_2").style.color = "red";
            document.getElementById("sugar_3").style.color = "red";
            document.getElementById("sugar_not_sure").style.color = "red";
        }
        else {
            document.getElementById("sugar_0").style.color = "black";
            document.getElementById("sugar_1").style.color = "black";
            document.getElementById("sugar_2").style.color = "black";
            document.getElementById("sugar_3").style.color = "black";
            document.getElementById("sugar_not_sure").style.color = "black";
        }
        if (document.getElementById("0days").checked === false &&
            document.getElementById("1day").checked === false &&
            document.getElementById("2days").checked === false &&
            document.getElementById("3days").checked === false &&
            document.getElementById("4days").checked === false &&
            document.getElementById("5plusdays").checked === false &&
            document.getElementById("Not sure ex").checked === false) {
            document.getElementById("exercise_0").style.color = "red";
            document.getElementById("exercise_1").style.color = "red";
            document.getElementById("exercise_2").style.color = "red";
            document.getElementById("exercise_3").style.color = "red";
            document.getElementById("exercise_4").style.color = "red";
            document.getElementById("exercise_5").style.color = "red";
            document.getElementById("exercise_not_sure").style.color = "red";
        }
        else {
            document.getElementById("exercise_0").style.color = "black";
            document.getElementById("exercise_1").style.color = "black";
            document.getElementById("exercise_2").style.color = "black";
            document.getElementById("exercise_3").style.color = "black";
            document.getElementById("exercise_4").style.color = "black";
            document.getElementById("exercise_5").style.color = "black";
            document.getElementById("exercise_not_sure").style.color = "black";
        }
    }
});

$(".previous").click(function(){
    if(animating) return false;
    animating = true;

    current_fs = $(this).parent();
    previous_fs = $(this).parent().prev();

    //de-activate current step on progressbar
    $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

    //show the previous fieldset
    previous_fs.show();
    //hide the current fieldset with style
    current_fs.animate({opacity: 0}, {
        step: function(now, mx) {
            //as the opacity of current_fs reduces to 0 - stored in "now"
            //1. scale previous_fs from 80% to 100%
            scale = 0.8 + (1 - now) * 0.2;
            //2. take current_fs to the right(50%) - from 0%
            left = ((1-now) * 50)+"%";
            //3. increase opacity of previous_fs to 1 as it moves in
            opacity = 1 - now;
            current_fs.css({'left': left});
            previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
        },
        duration: 800,
        complete: function(){
            current_fs.hide();
            animating = false;
        },
        //this comes from the custom easing plugin
        easing: 'easeInOutBack'
    });
});

$(".submit").click(function(){
    return false;
})

function decline_gdpr() {
    sessionStorage.clear();
    $('#GDPRModal').modal('hide');
    $('#declineGDPRorTandC').modal('show');
}

function accept_gdpr() {
    $('#GDPRModal').modal('hide');
    $('#TandCModal').modal('show');
}

function decline_tandc() {
    sessionStorage.clear();
    $('#TandCModal').modal('hide');
    $('#declineGDPRorTandC').modal('show');
}

function accept_tandc() {
    sessionStorage.setItem('accept', 'accept');
    $('#TandCModal').modal('hide');
}

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

function get_result(list){
    let result;
    for (let i = 0, length = list.length; i < length; i++) {
        if (list[i].checked) {
            // do whatever you want with the checked result
            result = list[i].value
            // only one result can be logically checked, don't check the rest
            return result
        }
    }
}

function processData() {
    document.getElementById("predictiondiv").style.visibility = "hidden";
    document.getElementById("confidencediv").style.visibility = "hidden";

    let age = parseFloat(document.getElementById("age").value);

    const fields = ["degree", "ssbcons", "fandvcons", "knowledge", "exercise", "genderS", "highbloodpressureS", "heartdiseaseS", "tobaccouseS"];
    for (let j = 0, length = fields.length; j < length; j++) {
        let field_checked = false;
        const list = document.getElementsByName(fields[j]);
        for (let i = 0, length = list.length; i < length; i++) {
            if (list[i].checked) {
                field_checked = true;
            }
        }

        if (field_checked === false) {
            document.getElementById('assessment-error').classList.remove('d-none');
            document.getElementById('predictiontext').remove();
            document.getElementById('confidencetext').remove();
            document.getElementById("spinner").remove();
            document.getElementById("spinner_text").remove();

            return false;
        }
    }

    age = parseFloat(document.getElementById("age").value);

    if (Object.is(NaN, age)){
        document.getElementById('assessment-error').classList.remove('d-none');
        document.getElementById('predictiontext').remove();
        document.getElementById('confidencetext').remove();

        return false;
    }

    document.getElementById('assessment-error').classList.add('d-none');

    const degrees = document.getElementsByName('degree');
    const degree = get_result(degrees);

    const exerciseS = document.getElementsByName('exercise');
    const exercise = get_result(exerciseS);

    const genderS = document.getElementsByName('genderS');
    const gender = get_result(genderS);

    const heartdiseaseS = document.getElementsByName('heartdiseaseS');
    const disease = get_result(heartdiseaseS);

    const highbloodpressureS = document.getElementsByName('highbloodpressureS');
    const pressure = get_result(highbloodpressureS);

    const tobaccouseS = document.getElementsByName('tobaccouseS');
    const tobacco = get_result(tobaccouseS);

    const knowledges = document.getElementsByName('knowledge');
    const knowledge = get_result(knowledges);

    const diabeducationS = document.getElementsByName('diabeducationS');
    const education = get_result(diabeducationS);

    const fandvconss = document.getElementsByName('fandvcons');
    const food = get_result(fandvconss);

    const ssbconss = document.getElementsByName('ssbcons');
    const sugar = get_result(ssbconss);

    fetch(`/backend/predict`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCookie("csrftoken"),
        },
        credentials: "same-origin",
        body: JSON.stringify({
            p_age: age,
            p_gender: gender,
            p_disease: disease,
            p_pressure: pressure,
            p_tobacco: tobacco,
            p_education: education,
            p_degree: degree,
            p_food: food,
            p_sugar: sugar,
            p_knowledge: knowledge,
            p_exercise: exercise,
        })
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            let error = data.error;
            let message = data.message;
            let prediction;
            if (data.prediction === 0)
                prediction = "Low Risk";
            else
                prediction = "High Risk";
            let confidence_score = parseInt(data.confidence_score);

            if (error === "0") {
                document.getElementById("spinner").remove();
                document.getElementById("spinner_text").remove();

                document.getElementById("predictiondiv").style.visibility = "visible";
                document.getElementById("confidencediv").style.visibility = "visible";

                document.getElementById("messageoutput").innerHTML = message;
                document.getElementById("predictionoutput").innerHTML = prediction;
                document.getElementById("confidence_scoreoutput").innerHTML = confidence_score + "%";

                sessionStorage.setItem("age", age);
                sessionStorage.setItem("gender", gender);
                sessionStorage.setItem("pressure", pressure);
                sessionStorage.setItem("disease", disease);
                sessionStorage.setItem("tobacco", tobacco);
                sessionStorage.setItem("education", education);
                sessionStorage.setItem("degree", degree);
                sessionStorage.setItem("knowledge", knowledge);
                sessionStorage.setItem("food", food);
                sessionStorage.setItem("sugar", sugar);
                sessionStorage.setItem("exercise", exercise);
                sessionStorage.setItem("prediction", prediction);
                sessionStorage.setItem("confidence", confidence_score);
            }
        })
        .catch(err => {
            if (err.message.match(/Failed to fetch/)) {
                console.error("The server cannot be reached. Did you start it?");
            }
        });
}

function saveData() {
    const age = sessionStorage.getItem("age");
    const gender = sessionStorage.getItem("gender");
    const high_blood_pressure = sessionStorage.getItem("pressure");
    const heart_disease = sessionStorage.getItem("disease");
    const tobacco = sessionStorage.getItem("tobacco");
    const education = sessionStorage.getItem("education");
    const degree = sessionStorage.getItem("degree");
    const knowledge = sessionStorage.getItem("knowledge");
    const food = sessionStorage.getItem("food");
    const sugar = sessionStorage.getItem("sugar");
    const exercise = sessionStorage.getItem("exercise");
    const prediction = sessionStorage.getItem("prediction");
    const confidence = sessionStorage.getItem("confidence");

    fetch(`/backend/save_data`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCookie("csrftoken"),
        },
        credentials: "same-origin",
        body: JSON.stringify({
            s_age: age,
            s_gender: gender,
            s_pressure: high_blood_pressure,
            s_disease: heart_disease,
            s_tobacco: tobacco,
            s_education: education,
            s_degree: degree,
            s_knowledge: knowledge,
            s_food: food,
            s_sugar: sugar,
            s_exercise: exercise,
            s_prediction: prediction,
            s_confidence: confidence
        })
    })
        .then(response => {
            if (response.status === 200) {
                sessionStorage.clear();
                $("#saveModal").modal('show');
            }
            else if (response.status === 304) {
                $("#saveResultUnsuccessful").modal('show');
            }
        })
        .catch(err => {
            if (err.message.match(/Failed to fetch/)) {
                console.error("The server cannot be reached. Did you start it?");
            }
        });
}

function modal_approach() {
    $('#approachModal').modal('show');
}

function modal_legal() {
    $('#legalModal').modal('show');
}

function open_preprocessing_after_approach() {
    $('#approachModal').modal('hide');
    modal_preprocessing();
}

function open_conclusion_after_research(){
    $('#researchModal').modal('hide');
    modal_conclusion();
}

function open_ai_before_legal(){
    $('#legalModal').modal('hide');
    modal_ai();
}

function modal_preprocessing() {
    $('#preprocessingModal').modal('show');
}

function open_approach_before_preprocessing() {
    $('#preprocessingModal').modal('hide');
    modal_approach();
}

function open_research_after_legal(){
    $('#legalModal').modal('hide');
    modal_research();
}

function open_research_before_conclusion(){
    $('#conclusionModal').modal('hide');
    modal_research();
}

function modal_research(){
    $('#researchModal').modal('show');
}

function open_legal_before_research(){
    $('#researchModal').modal('hide');
    modal_legal();
}

function open_ai_after_preprocessing() {
    $('#preprocessingModal').modal('hide');
    modal_ai();
}

function modal_ai() {
    $('#aiModal').modal('show');
}

function open_preprocessing_before_ai() {
    $('#aiModal').modal('hide');
    modal_preprocessing();
}

function open_legal_after_ai() {
    $('#aiModal').modal('hide');
    modal_legal();
}

function modal_conclusion() {
    $('#conclusionModal').modal('show');
}

function open_ai_before_conclusion() {
    $('#conclusionModal').modal('hide');
    modal_ai();
}

function toogleRegisterTwo(){
    $("#collapseRegisterTwo").collapse('toggle');
}

function toogleRegisterFive(){
    $("#collapseRegisterFive").collapse('toggle');
}

