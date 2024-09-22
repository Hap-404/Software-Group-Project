






function showInfo(section) {
    // Hide all info boxes
    var infoBoxes = document.querySelectorAll('.info-box');
    infoBoxes.forEach(function(box) {
        box.classList.remove('active');
    });

    // Show the clicked section
    var activeSection = document.getElementById(section);
    activeSection.classList.add('active');
}


