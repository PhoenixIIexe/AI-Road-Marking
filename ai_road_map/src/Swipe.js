const swipe = document.getElementById("swipe");
const swipeTitle = document.getElementById("swipeTitle");
const swipeImportFile = document.getElementById("swipeImportFile");
const swipeImportFileWidth = swipeImportFile.offsetWidth;
const menuFile = document.getElementById("menuFile");
const menuFileHeight = swipeImportFile.offsetHeight;

const svgHeight = 820;

const swiping = () => {
    const swipeTitleHeight = swipeTitle.offsetHeight;
    const swipeImportFileHeight = swipeImportFile.offsetHeight;

    const positionScroll = swipe.scrollTop;
    swipeTitle.style.opacity = 1 - positionScroll / swipeTitleHeight;
    swipeTitle.style.webkitMaskPositionY = `-${positionScroll + svgHeight - swipeTitleHeight - 20}px`;
    const deltaImportFile = Math.max(0, positionScroll - swipeImportFileHeight + swipeTitleHeight);
    swipeImportFile.style.opacity = 1 - deltaImportFile / swipeImportFileHeight;
    swipeImportFile.style.webkitMaskPositionY = `-${deltaImportFile + svgHeight - swipeImportFileHeight}px`;
    menuFile.style.clipPath = `inset(${Math.max(0, positionScroll - swipeTitleHeight - swipeImportFileHeight)}px 0px 0px round 20px)`; // calc(100% - ${180 + positionScroll}px)
};

document.addEventListener("DOMContentLoaded", swiping);

swipeTitle.style.maskSize = `auto auto`;
swipeTitle.style.webkitMaskSize = `auto auto`;
swipeImportFile.style.maskSize = `auto auto`;
swipeImportFile.style.webkitMaskSize = `auto auto`;