function refresh_assessment_tab() {
    document.getElementById("age").value = "";

    document.getElementById("genderM").checked = false;
    document.getElementById("genderF").checked = false;

    document.getElementById("hb_yes").checked = false;
    document.getElementById("hb_no").checked = false;

    document.getElementById("heart_yes").checked = false;
    document.getElementById("heart_no").checked = false;

    document.getElementById("tobacco_yes").checked = false;
    document.getElementById("tobacco_no").checked = false;

    document.getElementById("education_yes").checked = false;
    document.getElementById("education_no").checked = false;

    document.getElementById("1-8").checked = false;
    document.getElementById("9-11").checked = false;
    document.getElementById("High School").checked = false;
    document.getElementById("College").checked = false;

    document.getElementById("Poor").checked = false;
    document.getElementById("Fair").checked = false;
    document.getElementById("Good").checked = false;

    document.getElementById("0").checked = false;
    document.getElementById("1-2").checked = false;
    document.getElementById("3-4").checked = false;
    document.getElementById("5 or more").checked = false;

    document.getElementById("0bev").checked = false;
    document.getElementById("1").checked = false;
    document.getElementById("2").checked = false;
    document.getElementById("3 or more").checked = false;
    document.getElementById("Not sure bev").checked = false;

    document.getElementById("0days").checked = false;
    document.getElementById("1day").checked = false;
    document.getElementById("2days").checked = false;
    document.getElementById("3days").checked = false;
    document.getElementById("4days").checked = false;
    document.getElementById("5plusdays").checked = false;
    document.getElementById("Not sure ex").checked = false;
}

function refresh_further_information_tab() {
    document.getElementById("jumbotron").remove();

    let container = document.getElementById("further_information");

    let jumbotron = document.createElement("div");
    jumbotron.setAttribute("id", "jumbotron");
    jumbotron.className = "jumbotron container";

    let h1 = document.createElement("h1");
    h1.className = "display-4";
    h1.innerText = "Diabetes in Switzerland";
    h1.style.fontFamily = "serif"

    let paragraph = document.createElement("p");
    paragraph.className = "lead txt";
    paragraph.style.fontFamily = "serif";
    paragraph.innerHTML = "According to the Bundesamt für Gesundheit BAG and Schweizerische Konferenz der kantonalen Gesundheitsdirektorinnen und -direktoren GDK (2016)<sup>1</sup>, more than 25% (approx. 2.2 million people) of the\n" +
        "population in Switzerland suffer from noncommunicable chronic diseases (NCD).";

    let hr = document.createElement("hr");
    hr.className = "my-4";

    let href = document.createElement("a");
    href.href = "javascript: load_more_text(1)";
    href.style.fontFamily = "serif";
    href.innerHTML = "<i>Click here to read more.</i>";

    let paragraph_click = document.createElement("p");
    paragraph_click.setAttribute("id", "click");
    paragraph_click.style.textAlign = "center";
    paragraph_click.appendChild(href);

    jumbotron.appendChild(h1);
    jumbotron.appendChild(paragraph);
    jumbotron.appendChild(hr);
    jumbotron.appendChild(paragraph_click);
    container.appendChild(jumbotron);
}

function load_more_text(counter) {
    let container = document.getElementById("jumbotron");

    let new_paragraph = document.createElement("p");
    new_paragraph.className = "txt";
    if (counter === 1) {
        document.getElementById("click").remove();
        new_paragraph.innerHTML = "The costs induced " +
            "by NCD account for circa 80% of the total health care costs, more than 70 Bio CHF in absolute " +
            "numbers. Furthermore, NCD cause additional indirect cost of almost 30 Bio CHF per anum, caused " +
            "by absent days at work, reduced productivity, and gratuitous nursing of relatives.<sup>2</sup> " +
            "Along with the increasing average age of the population, costs and occurrence are expected to further increase, which poses a huge challenge for the Swiss health care " +
            "system.<sup>3</sup> Yet, about 50% of the NCDs could be avoided " +
            "based on individual lifestyles and prevention.<sup>3</sup> The WHO observes, that " +
            "every US-Dollar spent on prevention leads to more than five times the effect in cost reduction for the " +
            "health care system.<sup>4</sup> ";

        container.appendChild(new_paragraph);

        let new_hr = document.createElement("hr");
        new_hr.className = "my-4";
        container.appendChild(new_hr);

        let href = document.createElement("a");
        href.href = "javascript: load_more_text(2)";
        href.innerHTML = "<i>Click here to read more.</i>";

        let paragraph = document.createElement("p");
        paragraph.style.fontFamily = "serif"
        paragraph.setAttribute("id", "click");
        paragraph.style.textAlign = "center";
        paragraph.appendChild(href);
        container.appendChild(paragraph);
    }

    if (counter === 2) {
        document.getElementById("click").remove();
        new_paragraph.innerHTML = "While communicable diseases were the main reasons for early deaths in the past, approximately 2/3 " +
            "of deaths arise from NCD nowadays.<sup>2</sup> Diabetes type II in particular, is a fatal " +
            "diseases itself but additionally appears as a catalyst for alternative NCDs.<sup>5</sup> While most " +
            "of the positively diagnosed patients in Switzerland are older than 50 years, the ratio of diabetes type II " +
            "cases increases over-proportionally for teenagers and the younger society. <sup>3</sup> " +
            "Mostly, cases are highly correlated with either overweight or poor knowledge and " +
            "prevention.<sup>6</sup> " +
            "Nevertheless, Switzerland spends less (2.2%) than the OECD average (3.1%) of the health" +
            "expenses on early prevention.<sup>1</sup> <sup>7</sup> " +
            "Especially, " +
            "for people with low educational background and lower-quartile income the ratio of suffering from an " +
            "NCD is above-average.<sup>5</sup> One main reason " +
            "is the hindered access to routine checkups " +
            "and early detection tools.<sup>1</sup> <sup>4</sup> Furthermore, as the own lifestyle, the diet, consumption of tobacco and " +
            "alcohol, and excessive weight are key factors in terms of correlation to diabetes type II, the prevention " +
            "has to aim on the social stratum that cannot afford individual guidance through coaches and experts.<sup>8</sup> <sup>2</sup> "

        container.appendChild(new_paragraph);

        let new_hr = document.createElement("hr");
        new_hr.className = "my-4";
        container.appendChild(new_hr);

        let href = document.createElement("a");
        href.href = "javascript: load_more_text(3)";
        href.innerHTML = "<i>Click here to read more.</i>";

        let paragraph = document.createElement("p");
        paragraph.style.fontFamily = "serif"
        paragraph.setAttribute("id", "click");
        paragraph.style.textAlign = "center";
        paragraph.appendChild(href);
        container.appendChild(paragraph);
    }

    if (counter === 3) {
        document.getElementById("click").remove();
        new_paragraph.innerHTML = "As a result, the main focus of future health strategies has to include equality of opportunity with " +
            "regards to accessing early detection and preventive measures. <sup>1</sup> " +
            "Second, a central target has to be the reduction of the NCD ratio among the whole population. This " +
            "would result in a deceleration of the increase in health care costs, lower mortality rates caused by " +
            "avoidable diseases, and an increase in overall productivity of the society. <sup>4</sup> " +
            "In order to succeed on those intentions, population needs to be enlightened on potential risk factors, a measure being well received through a convenient way of access.<sup>1</sup> ";

        container.appendChild(new_paragraph);

        let new_hr = document.createElement("hr");
        new_hr.className = "my-4";
        container.appendChild(new_hr);

        let href = document.createElement("a");
        href.href = "javascript: load_more_text(4)";
        href.innerHTML = "<i>Click here to read more.</i>";

        let paragraph = document.createElement("p");
        paragraph.style.fontFamily = "serif"
        paragraph.setAttribute("id", "click");
        paragraph.style.textAlign = "center";
        paragraph.appendChild(href);
        container.appendChild(paragraph);
    }

    if (counter === 4) {
        document.getElementById("click").remove();
        new_paragraph.innerHTML = "Since the genetic factor with regards to NCDs is vanishingly small <sup>2</sup> , " +
            "we decide to build a website that allows people to easily access preventive information about diabetes " +
            "at one stop. Furthermore, based on several machine learning techniques (MLT) we offer a scientific " +
            "approach to early prediction of potentially increased risk exposure to diabetes type II causing factors. " +
            "Yet, we do not intend to build a medical device that allows to diagnose for diabetes, but rather intend " +
            "to arise awareness of the own lifestyle based on an outcome that indicates the likeliness of falling into a " +
            "category of increased risk. In particular, as the intersection between experts and the population in the " +
            "stage of early prevention is rather rare, we see a large potential for contributing to the Swiss national " +
            "NCD strategy with relatively easy measures. This intention is in line with the object of the BAG to " +
            "reach vulnerable society based on tailored and easily accessible projects.<sup>1</sup> ";

        container.appendChild(new_paragraph);

        let new_hr = document.createElement("hr");
        new_hr.className = "my-4";
        container.appendChild(new_hr);

        let href = document.createElement("a");
        href.href = "javascript: load_more_text(5)";
        href.innerHTML = "<i>Click here to read more.</i>";

        let paragraph = document.createElement("p");
        paragraph.style.fontFamily = "serif"
        paragraph.setAttribute("id", "click");
        paragraph.style.textAlign = "center";
        paragraph.appendChild(href);
        container.appendChild(paragraph);
    }

    if (counter === 5) {
        document.getElementById("click").remove();
        new_paragraph.innerHTML = "On the other hand, we can have a share in establishing a better NCD monitoring for the Swiss health " +
            "authority, as the data collected by our system helps to even increase the hit rate of prevention and " +
            "future research direction. As a main sphere of activity, the BAG defines to actively educate society " +
            "on NCD and increase awareness of the contribution of the own lifestyle.<sup>3</sup> " +
            "In line with this intention, we see great potential to reach in particular the younger " +
            "society with an interactive and free tool, such that we can increase awareness in the early stage.<sup>9</sup> <sup>4</sup> ";

        container.appendChild(new_paragraph);



        let new_hr = document.createElement("hr");
        new_hr.className = "my-4";
        container.appendChild(new_hr);

        let href = document.createElement("a");
        href.href = "javascript: load_more_text(6)";
        href.innerHTML = "<i>Click here to see the sources.</i>";

        let paragraph = document.createElement("p");
        paragraph.style.fontFamily = "serif"
        paragraph.setAttribute("id", "click");
        paragraph.style.textAlign = "center";
        paragraph.appendChild(href);
        container.appendChild(paragraph);

    }
    console.log(counter);


    if (counter === 6) {
        document.getElementById("click").remove();
        new_paragraph.innerHTML =
            "<sup>1</sup> <a href='https://www.bag.admin.ch/dam/bag/de/dokumente/nat-gesundheitsstrategien/ncd-strategie/ncd-strategie.pdf.download.pdf/ncd-strategie.pdf' style='font-size: 13px'>https://www.bag.admin.ch/dam/bag/de/dokumente/nat-gesundheitsstrategien/ncd-strategie/ncd-strategie.pdf.download.pdf/ncd-strategie.pdf</a> <br>"+
            "<sup>2</sup> <a href='https://www.bag.admin.ch/dam/bag/de/dokumente/npp/forschungsberichte/forschungsberichte-ncd/einfluss-risikofaktoren-ncd.pdf.download.pdf/NCD-Bericht_2020-03-06.pdf' style='font-size: 13px'>https://www.bag.admin.ch/dam/bag/de/dokumente/npp/forschungsberichte/forschungsberichte-ncd/einfluss-risikofaktoren-ncd.pdf.download.pdf/NCD-Bericht_2020-03-06.pdf</a> <br>"+
            "<sup>3</sup> <a href='https://www.bag.admin.ch/bag/de/home/krankheiten/krankheiten-im-ueberblick/diabetes.html' style='font-size: 13px'>https://www.bag.admin.ch/bag/de/home/krankheiten/krankheiten-im-ueberblick/diabetes.html</a> <br>"+
            "<sup>4</sup> <a href='https://www.who.int/publications/i/item/9789241565257' style='font-size: 13px'>https://www.who.int/publications/i/item/9789241565257</a> <br>"+
            "<sup>5</sup> <a href='https://diabetesatlas.org/en/' style='font-size: 13px'>https://diabetesatlas.org/en/</a> <br>"+
            "<sup>6</sup> <a href='https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(16)00618-8/fulltext' style='font-size: 13px'>https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(16)00618-8/fulltext</a> <br>"+
            "<sup>7</sup> <a href='https://www.oecd.org/health/health-systems/OECD-Policy-Brief-Primary-Health-Care-May-2019.pdf' style='font-size: 13px'>https://www.oecd.org/health/health-systems/OECD-Policy-Brief-Primary-Health-Care-May-2019.pdf</a> <br>"+
            "<sup>8</sup> <a href='https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(17)32129-3/fulltext' style='font-size: 13px'>https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(17)32129-3/fulltext</a> <br>"+
            "<sup>9</sup> <a href='https://iris.paho.org/handle/10665.2/7700' style='font-size: 13px'>https://iris.paho.org/handle/10665.2/7700</a>"

            container.appendChild(new_paragraph);
    }


    /*

    <sup>1</sup><a id="t_and_c_ref1"><span class="references">HERTIG PEA Agnes, la protection des données médicales est-elle efficace ? Basel 2003.</span></a>
                                            <br>



    1 bundesamt für gesundheit bag und schweiz
    2 zemp stutz ferrari dsa isch au bag
    3 bundesamt für gesundheit bag
    4 world health organisation 2016
    5 idf 2017
    6 zhou, lu, haji
    7 oecd 2015
    8 abarca gomez
    9 PanAmerican 2015
     */
}