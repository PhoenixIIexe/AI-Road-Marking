const menuFile = document.getElementsByClassName("menu-file");

const setFileStyle = (file, index, scale = 0, marginTop = 0, zIndex = 2, background = "rgba(248, 248, 248, 0.2)", backdropFilter = "blur(25px)") => {
    if (typeof (file[index]) != 'undefined') {
        file[index].style.scale = scale;
        file[index].style.top = marginTop;
        file[index].style.zIndex = zIndex;
        file[index].style.background = background;
        file[index].style.backdropFilter = backdropFilter;
    }
}

const isFileVisible = () => {
    const files = menuFile[0].getElementsByClassName('menu-file__item');
    if (typeof (isFileVisible.counter) == 'undefined')
        isFileVisible.counter = [0, 1, 2];
    setFileStyle(files, isFileVisible.counter[1]);
    setFileStyle(files, isFileVisible.counter[2]);
    const heightBlock = 68;
    const position = 30 + menuFile[0].scrollTop;
    isFileVisible.counter = [0 + Math.floor(position / heightBlock), 1 + Math.floor(position / heightBlock), 2 + Math.floor(position / heightBlock)];
    setFileStyle(files, isFileVisible.counter[0], 1);
    setFileStyle(files, isFileVisible.counter[1], 1);
    const scaleNewElement = 0.9 + 0.1 / heightBlock * (position % heightBlock);
    const marginTopNewElement = `-${heightBlock - (position % heightBlock)}px`;
    const backgroundNewElement = `rgba(248, 248, 248, ${0.1 + 0.1 / heightBlock * (position % heightBlock)})`;
    const backdropFilterNewElement = `blur(${50 - 25 / heightBlock * (position % heightBlock)}px)`;
    setFileStyle(files, isFileVisible.counter[2], scaleNewElement, marginTopNewElement, 1, backgroundNewElement, backdropFilterNewElement);
};

document.addEventListener("DOMContentLoaded", isFileVisible);