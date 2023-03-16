const menuFile = document.getElementsByClassName("menu-file");

const setFileStyle = (file, index, scale = 0, marginTop = 0, zIndex = 2, background = "rgba(248, 248, 248, 0.2)", backdropFilter = "blur(25px)") => {
    file[index].style.scale = scale;
    file[index].style.marginTop = marginTop;
    file[index].style.zIndex = zIndex;
    file[index].style.background = background;
    file[index].style.backdropFilter = backdropFilter;
}

const isFileVisible = () => {
    const position = 30 + menuFile[0].scrollTop;
    const files = menuFile[0].getElementsByClassName('menu-file__item');
    const excludedIndexes = [0 + Math.floor(position / 67), 1 + Math.floor(position / 67), 2 + Math.floor(position / 67)];
    setFileStyle(files, excludedIndexes[0], 1);
    setFileStyle(files, excludedIndexes[1], 1);
    const scaleNewElement = 0.9 + 0.1 / 67 * (position % 67);
    const marginTopNewElement = `-${67 - (position % 67)}px`;
    const backgroundNewElement = `rgba(248, 248, 248, ${0.1 + 0.1 / 67 * (position % 67)})`;
    const backdropFilterNewElement = `blur(${50 - 25 / 67 * (position % 67)}px)`;
    console.log(backgroundNewElement, backdropFilterNewElement)
    setFileStyle(files, excludedIndexes[2], scaleNewElement, marginTopNewElement, 1, backgroundNewElement, backdropFilterNewElement);
    for (let i = 0; i < files.length; ++i) {
        if (excludedIndexes[0] - 1 >= 0 && 67 - (position % 67))
            setFileStyle(files, excludedIndexes[0] - 1, 1);
        if (!(excludedIndexes.includes(i))) {
            setFileStyle(files, i);
        }
    }
};

document.addEventListener("DOMContentLoaded", isFileVisible);