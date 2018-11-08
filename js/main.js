document.addEventListener("DOMContentLoaded", init);

function init() {

    document.querySelector("#btnSend").addEventListener("click", getnumber);
    document.querySelector("#btnBack").addEventListener("click", startAgain);

}

function navigate(p){
    let page=document.querySelectorAll(".page");
    for(let i=0;i<page.length;i++){
        if(p==i){
            page[i].classList.add("active");
        }else{
            page[i].classList.remove("active");
        }
    }
}

function getnumber() {
    let number = document.querySelector("#digits").value;
    let maximum = document.querySelector("#max").value;


    let setting = {
        method: "POST",
        mode: "cors"

    };
    let url = "https://davidst.edumedia.ca/mad9014/nums.php?digits=" + number + "&max=" + maximum;
    let Req = new Request(url, setting);
    let error = document.querySelector("#errorMessage");

    fetch(Req)
        .then(function (response) {
            console.log(response);
            error.innerHTML = "";
            error.style.display = "none";
            return response.json();
        })
        .then(function (response) {
            let ul = document.querySelector(".num_list");
            ul.innerHTML = "";
            if (response.code == "0") {
                for (let data in response.numbers) {
                    let li = document.createElement("li");
                    li.innerHTML = response.numbers[data];
                    ul.append(li);

                }

                navigate(1);


            } else if (response.code == "522" || response.code == "534") {
                error.style.display = "block";
                error.innerHTML = "Please enter correct range!";
                navigate(1);
            }

        })
    .catch (function (e) {
        alert("Error: " + e.message);
    });
}

function startAgain() {
    navigate(0);
    document.querySelector("#digits").value = "";
    document.querySelector("#max").value = "";

}
