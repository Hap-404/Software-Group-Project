const filterbtn = document.querySelectorAll('.filter-button button');
const filtercard = document.querySelectorAll('.slidebtn .card');
// console.log(filterbtn,filtercard);

const filtercd = e => {
    document.querySelector(".active").classList.remove("active");
    e.target.classList.add('active')
    // console.log(e.target);

    filtercard.forEach(card => {
        card.classList.add("hide");
        // console.log(card)

        if(card.dataset.name === e.target.dataset.name || e.target.dataset.name === "all"){
            card.classList.remove("hide");
        }
    });
}

filterbtn.forEach(button => button.addEventListener('click',filtercd))