const swipe = document.getElementById("swipe");
const swipeTitle = document.getElementById("swipeTitle");
const swipeTitleHeight = swipeTitle.offsetHeight;
const swipeImportFile = document.getElementById("swipeImportFile");
const swipeImportFileHeight = swipeImportFile.offsetHeight;
const menuFile = document.getElementById("menuFile");

const swiping = () => {
    const positionScroll = swipe.scrollTop;
    console.log(positionScroll);
    swipeTitle.style.opacity = 1 - positionScroll / swipeTitleHeight;
    swipeTitle.style.transform = `translateY(-${positionScroll / 2}px) scaleY(${1 - positionScroll / swipeTitleHeight})`;
    const deltaImportFile = Math.max(0, positionScroll - swipeImportFileHeight + swipeTitleHeight);
    swipeImportFile.style.opacity = 1 - deltaImportFile / swipeImportFileHeight;
    swipeImportFile.style.transform = `translateY(-${deltaImportFile / 2}px) scaleY(${1 - deltaImportFile / swipeImportFileHeight})`;
    // if (deltaImportFile > swipeImportFileHeight) {
    //     swipe.style.overflowY = "hidden";
    //     menuFile.style.overflowY = "scroll";
    // } else {
    //     swipe.style.overflowY = "scroll";
    //     menuFile.style.overflowY = "hidden";
    // }
}

document.addEventListener("DOMContentLoaded", swiping);