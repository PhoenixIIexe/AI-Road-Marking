const menuFile = document.getElementById("menuFile");
const heightmenuFile = menuFile.offsetHeight;
const uploadedFile = document.getElementById("uploadedFile");
const heightUploadedFile = uploadedFile.offsetHeight;
const appsMove = document.getElementsByClassName("app--move");

const setFileStyle = (item, scale = 0, top = 0, zIndex = 2, background = "rgba(248, 248, 248, 0.2)", backdropFilter = "blur(25px)") => {
    if (typeof (item) != 'undefined') {
        item.style.scale = scale;
        item.style.transform = top;
        item.style.zIndex = zIndex;
        item.style.background = background;
        item.style.backdropFilter = backdropFilter;
    }
}

// const isFileVisible = () => {
//     const files = menuFile[0].getElementsByClassName('menu-file__item');
//     if (typeof (isFileVisible.counter) == 'undefined')
//         isFileVisible.counter = [0, 1, 2];
//     setFileStyle(files, isFileVisible.counter[1]);
//     setFileStyle(files, isFileVisible.counter[2]);
//     const heightBlock = 68;
//     const position = 30 + menuFile[0].scrollTop;
//     isFileVisible.counter = [0 + Math.floor(position / heightBlock), 1 + Math.floor(position / heightBlock), 2 + Math.floor(position / heightBlock)];
//     setFileStyle(files, isFileVisible.counter[0], 1);
//     setFileStyle(files, isFileVisible.counter[1], 1);
//     const scaleNewElement = 0.9 + 0.1 / heightBlock * (position % heightBlock);
//     const topNewElement = `-${heightBlock - (position % heightBlock)}px`;
//     const backgroundNewElement = `rgba(248, 248, 248, ${0.1 + 0.1 / heightBlock * (position % heightBlock)})`;
//     const backdropFilterNewElement = `blur(${50 - 25 / heightBlock * (position % heightBlock)}px)`;
//     setFileStyle(files, isFileVisible.counter[2], scaleNewElement, topNewElement, 1, backgroundNewElement, backdropFilterNewElement);
//     // menuFile[0].style.paddingTop = `${position - 30}px`
//     menuFile[0].style.maxHeight = `${158 + position - 30}px`
//     // menuFile[0].style.top = `${position - 30}px`
//     for (let appMove of appsMove)
//         appMove.style.top = `-${(position - 30) > 245 ? 245 : position - 30}px`;

// };

class SwapperItem {
    heightBlock = 68;
    stackChangeItem = []
    item = -1

    __defualtItem(item) {
        item.style.scale = 1;
        item.style.transform = `translateY(0px)`;
        item.style.zIndex = 10;
        item.style.background = `rgba(248, 248, 248, 0.2`;
        item.style.backdropFilter = `blur(50px)`;
    }

    setPositionScroll(positionScroll) {
        console.log(positionScroll);
        const files = menuFile.getElementsByClassName('menu-file__item');
        if (Math.floor((positionScroll + 50) / 38) > this.item) {
            if (files[2 + this.item + 1] != 'undefined')
                this.stackChangeItem.push({
                    "item": files[2 + (++this.item)],
                    "scale": 0.9 - 0.1 * this.stackChangeItem.length,
                    "translate": -38 - 38 * this.stackChangeItem.length,
                    "background": 0.1,
                    "backdropFilter": 50,
                    "lastPositionScroll": 0,
                })
        } else if (Math.floor((positionScroll + 50) / 38) < this.item) {
            // let delItem = this.stackChangeItem.pop();
            // this.__defualtItem(delItem.item);
            if (files[2 + this.item - 1] != 'undefined')
                this.stackChangeItem.unshift({
                    "item": files[2 + (--this.item)],
                    "scale": 1,
                    "translate": 0,
                    "background": 0.2,
                    "backdropFilter": 50,
                    "lastPositionScroll": 0,
                })
        }

        for (let i = 0; i < this.stackChangeItem.length; ++i) {
            let deltaPositionScroll = positionScroll - this.stackChangeItem[i].lastPositionScroll;
            this.stackChangeItem[i].lastPositionScroll = positionScroll;
            this.stackChangeItem[i].scale += 0.1 / this.heightBlock * deltaPositionScroll;
            this.stackChangeItem[i].translate += Math.floor(deltaPositionScroll);
            this.stackChangeItem[i].background += 0.1 / this.heightBlock * deltaPositionScroll;
            this.stackChangeItem[i].backdropFilter += 25 / this.heightBlock * deltaPositionScroll;
            this.stackChangeItem[i].translate = Math.min(0, this.stackChangeItem[i].translate);
            if (this.stackChangeItem[i].scale >= 1) {
                this.__defualtItem(this.stackChangeItem[i].item);
                this.stackChangeItem.shift();
                --i;
            } else if (this.stackChangeItem[i].scale <= 0.9 - 0.1 * this.stackChangeItem.length) {
                this.stackChangeItem.pop();
                --i;
            }
        }

    }

    update() {
        for (const [index, changeItem] of this.stackChangeItem.entries()) {
            changeItem.item.style.scale = changeItem.scale;
            changeItem.item.style.transform = `translateY(${changeItem.translate}px)`;
            changeItem.item.style.zIndex = this.stackChangeItem.length - index;
            changeItem.item.style.background = `rgba(248, 248, 248, ${changeItem.background})`;
            changeItem.item.style.backdropFilter = `blur(${changeItem.backdropFilter}px)`;
        }
    }
}

const isFileVisible = () => {
    const files = menuFile.getElementsByClassName('menu-file__item');
    const positionScroll = menuFile.scrollTop;
    menuFile.style.maxHeight = `${heightmenuFile + positionScroll}px`;
    let deltaHeightUploadedFile = heightUploadedFile - positionScroll
    uploadedFile.style.height = `${deltaHeightUploadedFile < 245 ? 245 : deltaHeightUploadedFile}px`
    for (let appMove of appsMove)
        appMove.style.transform = `translateY(-${positionScroll > 245 ? 245 : positionScroll}px)`;

    swapperItem.setPositionScroll(positionScroll);
    swapperItem.update();
    // const heightBlock = 68;
    // const nextItem = files[2 + Math.floor(position / 68)];
    // const scaleNewElement = 0.9 + 0.1 / heightBlock * (position % heightBlock);
    // const topNewElement = `translateY(-${heightBlock - (position % heightBlock)}px)`;
    // const backgroundNewElement = `rgba(248, 248, 248, ${0.1 + 0.1 / heightBlock * (position % heightBlock)})`;
    // const backdropFilterNewElement = `blur(${50 - 25 / heightBlock * (position % heightBlock)}px)`;
    // setFileStyle(nextItem, scaleNewElement, topNewElement, 1, backgroundNewElement, backdropFilterNewElement);
}

document.addEventListener("DOMContentLoaded", isFileVisible);
var swapperItem = new SwapperItem()