const swipe = document.getElementById("swipe");
const swipeTitle = document.getElementById("swipeTitle");
const swipeTitleHeight = swipeTitle.offsetHeight;
const swipeImportFile = document.getElementById("swipeImportFile");
const swipeImportFileWidth = swipeImportFile.offsetWidth;
const swipeImportFileHeight = swipeImportFile.offsetHeight;
const menuFile = document.getElementById("menuFile");
const menuFileHeight = swipeImportFile.offsetHeight;
const uploadedFile = document.getElementById("uploadedFile");

const swiping = () => {
    const positionScroll = swipe.scrollTop;
    swipeTitle.style.opacity = 1 - positionScroll / swipeTitleHeight;
    // swipeTitle.style.transform = `translateY(-${positionScroll / 2}px) scaleY(${1 - positionScroll / swipeTitleHeight})`;
    swipeTitle.style.webkitMaskPositionY = `-${positionScroll}px`;
    const deltaImportFile = Math.max(0, positionScroll - swipeImportFileHeight + swipeTitleHeight);
    swipeImportFile.style.opacity = 1 - deltaImportFile / swipeImportFileHeight;
    // swipeImportFile.style.transform = `translateY(-${deltaImportFile / 2}px) scaleY(${1 - deltaImportFile / swipeImportFileHeight})`;
}

document.addEventListener("DOMContentLoaded", swiping);

swipeTitle.style.maskSize = `${swipeImportFileWidth}px ${swipeTitleHeight + 20}px`;
swipeTitle.style.webkitMaskSize = `${swipeImportFileWidth}px ${swipeTitleHeight + 20}px`;