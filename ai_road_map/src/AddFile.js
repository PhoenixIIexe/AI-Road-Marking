const importFileDesc = document.getElementById("importFileDesc");
const uploadedFile = document.getElementById("uploadedFile");
const appSubmit = document.getElementById("appSubmit");
const fileInput = document.getElementById("fileInput");

uploadedFile.classList.add('hide');
appSubmit.classList.add('hide');

const AddFile = () => {
    importFileDesc.classList.add('hide');
    uploadedFile.classList.remove('hide');
    appSubmit.classList.remove('hide');

    const fileList = fileInput.files;
    for (const file of fileList)
        CreateMuneItem(file);
};

const CreateMuneItem = (file) => {
    const li = document.createElement('li');
    li.classList.add('menu-file__item');
    li.classList.add('fade-out');
    li.setAttribute('id', file.name);

    // создаем div для информации о файле
    const infoFileDiv = document.createElement('div');
    infoFileDiv.classList.add('menu-file__info-file', 'info-file');

    // создаем img для типа файла
    const fileTypeImg = document.createElement('img');
    fileTypeImg.classList.add('info-file__type');
    fileTypeImg.setAttribute('id', 'image-container');
    fileTypeImg.setAttribute('onclick', 'Preview(this)');
    let reader = new FileReader();
    reader.onload = function (event) {
        fileTypeImg.src = event.target.result;
    };

    reader.readAsDataURL(file);

    // создаем div для характеристик файла
    const fileFeaturesDiv = document.createElement('div');
    fileFeaturesDiv.classList.add('info-file__features');

    // создаем p для названия файла
    const fileNameP = document.createElement('p');
    fileNameP.textContent = truncateFilename(file.name, 24);

    // создаем p для размера файла
    const fileSizeP = document.createElement('p');
    fileSizeP.textContent = `${file.size}B`;

    // добавляем p в div характеристик файла
    fileFeaturesDiv.appendChild(fileNameP);
    fileFeaturesDiv.appendChild(fileSizeP);

    // добавляем img и div характеристик файла в div информации о файле
    infoFileDiv.appendChild(fileTypeImg);
    infoFileDiv.appendChild(fileFeaturesDiv);

    // создаем div для удаления файла
    const deleteFileDiv = document.createElement('div');
    deleteFileDiv.classList.add('menu-file__delete-file', 'delete-file');
    deleteFileDiv.setAttribute('onclick', 'deleteFile(this)');

    // создаем img для крестика удаления файла
    const deleteCrossImg = document.createElement('img');
    deleteCrossImg.classList.add('delete-file__cross');
    deleteCrossImg.setAttribute('src', 'img/delete.svg');

    // добавляем img в div удаления файла
    deleteFileDiv.appendChild(deleteCrossImg);

    // добавляем div информации о файле и div удаления файла в li
    li.appendChild(infoFileDiv);
    li.appendChild(deleteFileDiv);

    // добавляем li в родительский ul или другой контейнер
    const fileList = document.getElementById('menuFile');
    li.classList.add('fade-in');
    fileList.appendChild(li);
};

const truncateFilename = (filename, maxLength) => {
    if (filename.length <= maxLength) {
        return filename;
    }
    const extension = filename.split('.').pop();
    const truncatedName = filename.substr(0, maxLength - extension.length - 1);
    return truncatedName + '... .' + extension;
}

const deleteFile = (clickedElement) => {
    const fileList = fileInput.files;

    var newFileList = new DataTransfer();

    for (let i = 0; i < fileList.length; i++)
        if (fileList[i].name !== clickedElement.parentElement.id)
            newFileList.items.add(fileList[i]);

    fileInput.files = newFileList.files;
    clickedElement.parentElement.classList.add('hide');

    clickedElement.parentElement.addEventListener('transitionend', (event) => {
        event.target.remove();
    });

    if (fileInput.files.length == 0) {
        importFileDesc.classList.remove('hide');
        uploadedFile.classList.add('hide');
        appSubmit.classList.add('hide');
        swipeTitle.style.opacity = 1;
        swipeTitle.style.webkitMaskPositionY = `0px`;
        swipeImportFile.style.opacity = 1;
        swipeImportFile.style.webkitMaskPositionY = `0px`;
    }
};