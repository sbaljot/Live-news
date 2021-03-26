$(document).ready(function () {
    var firebaseConfig = {
        apiKey: "AIzaSyC9RqHiuwxfkQgusDmW9O90P97uPn5QwsA",
        authDomain: "complaint-form-d4e6b.firebaseapp.com",
        projectId: "complaint-form-d4e6b",
        storageBucket: "complaint-form-d4e6b.appspot.com",
        messagingSenderId: "1004288507296",
        appId: "1:1004288507296:web:c046e69f2293903f19f8c5"
    };
    firebase.initializeApp(firebaseConfig);
    var db = firebase.firestore();

    function updateDB(str, arr) {
        db.collection("Users").add({
            Name: str,
            CountriesSearchedFor: arr.length / 2,
            TopicsSearchedFor: arr.length / 2
        });
    }
    $('#downarrow').hover(function () {
        $(this).fadeOut(300);
        $(this).fadeIn(500);
    });
    $('#uparrow').hover(function () {
        $(this).fadeOut(300);
        $(this).fadeIn(500);
    });
    $("#cn").mouseenter(function () {
        $(this).animate({ fontSize: "2.5ch" }, 200);
    });
    $("#cn").mouseout(function () {
        $(this).css({ fontSize: "2.3ch" }, 1);
    });
    $("#tn").mouseenter(function () {
        $(this).animate({ fontSize: "2.5ch" }, 200);
    });
    $("#tn").mouseout(function () {
        $(this).css({ fontSize: "2.3ch" }, 1);
    });
    $("#submitbtn").click(function () {
        if ($("#submail").val().length != 0) {
            $("#tytext").show(500);
            updateDB($("#submail").val(), history);
        }
    });
    let section = document.getElementById("section");
    const key = '6b207010f47899942bf924161014b435';
    var history = [];
    var country = document.getElementById("country");
    var selectedCountry = "in";
    country.addEventListener('change', function () {
        selectedCountry = country.options[country.selectedIndex].text;
        var country_list = ["India", "in", "US", "us", "Canada", "ca", "Singapore", "sg"];
        for (i = 0; i <= 7; i++) {
            if (selectedCountry == country_list[i]) {
                selectedCountry = country_list[i + 1];
                break;
            }
        }
    });
    var topic = document.getElementById("topic");
    var selectedTopic = "politics";
    topic.addEventListener('change', function () {
        selectedTopic = topic.options[topic.selectedIndex].text;
    });
    $("#searchbtn").click(function () {
        history.push(selectedCountry);
        history.push(selectedTopic);
        console.log(history);
        $("#submitbtn").css("visibility", "hidden");
        $("#submail").css("visibility", "hidden");
        $('#templeft').hide(2500);
        $('#tempright').hide(2500);
        let url = `https://gnews.io/api/v4/search?q=${selectedTopic}&lang=en&country=${selectedCountry}&token=${key}`;
        fetch(url)
            .then(function (response) {
                response.json()
                    .then(function (data) {
                        let newsHTML = "";
                        let articles = data.articles;
                        for (i in articles) {
                            let news = `<div class="col-6">
                                             <div class="p-3">
                                                 <p class="h4">${articles[i].title}</p>
                                             <p class="fw-light">By ${articles[i].source.name}<br>
                                                     <p>${articles[i].description}
                                                         <a href="${articles[i].url}" target="_blank">
                                                             Read more</a>
                                                     </p>
                                             </div>
                                         </div>`;
                            newsHTML += news;
                        }
                        section.innerHTML = newsHTML;
                        $("#submitbtn").css("visibility", "visible");
                        $("#submail").css("visibility", "visible");
                    });
            });
    });
});