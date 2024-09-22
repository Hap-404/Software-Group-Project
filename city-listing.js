const search = () =>{
    const searchbox = document.getElementById('input-box').value.toUpperCase();
    const storeitems = document.getElementById('result-list');
    const products = document.querySelectorAll('.activitycard');
    const pname = storeitems.getElementsByTagName("h3");

    for (var i=0; i<pname.length; i++){
        let match = products[i].getElementsByTagName('h3')[0];

        if(match){
            let textvalue = match.textContent || match.innerHTML;

            if(textvalue.toUpperCase().indexOf(searchbox) > -1){
                products[i].style.display = "";
            } else{
                products[i].style.display = "none";
            }
        }
    }
}

const filterbtn =document.querySelectorAll(".filter-button button");
const filtercard = document.querySelectorAll(".activitycard");
console.log(filterbtn,filtercard)

const filterablecards = e => {
    document.querySelector(".active").classList.remove("active")
    e.target.classList.add("active");
    // console.log(e.target);
    filtercard.forEach(activitycard => {
        activitycard.classList.add("hide");
        // console.log(activitycard);
        if(activitycard.dataset.name === e.target.dataset.name || e.target.dataset.name === "all"){
            activitycard.classList.remove("hide");
            console.log(activitycard)
        }
    });
};

filterbtn.forEach(button => button.addEventListener("click", filterablecards));

const checkbtn = document.querySelectorAll(".theme-options-list1 input");
const pricebtn = document.querySelectorAll(".activitycard")
console.log(checkbtn,pricebtn)

const priceablebtn = e => {
    document.querySelector(".active1").classList.remove("active1");
    e.target.classList.add("active1");
    // console.log(e.target)
    filtercard.forEach(activitycard => {
        activitycard.classList.add("hide");
        if(activitycard.dataset.list === e.target.dataset.list || e.target.dataset.list === "all"){
            activitycard.classList.remove("hide");
            console.log(activitycard)
        };
    });
};

checkbtn.forEach(input => input.addEventListener("click", priceablebtn))

