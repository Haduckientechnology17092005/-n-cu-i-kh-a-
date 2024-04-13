let headerInput = document.getElementById('header-input');
let titleInput = document.getElementById('title-input');
let contentInput = document.getElementById('content-input');

let errorHeader = document.getElementById('error-header');
let errorTitle = document.getElementById('error-title');
let errorContent = document.getElementById('error-content');

let createButton = document.getElementById("create-task");
let tableContainer = document.getElementById("border-fixed");
let closeadd = document.getElementById("submit-close-add");

let updateButtons = document.querySelectorAll(".edit");
let borderfixed1 = document.getElementById("border-fixed-1");
let closeupdate = document.getElementById("submit-close-update");

let deleteButtons = document.querySelectorAll(".delete");
let borderdelete = document.getElementById("border-delete");
let boxdelete = document.getElementById("box-delete");
let nodelete = document.getElementById("no-delete");

let headerInput1 = document.getElementById('header-input-1');
let titleInput1 = document.getElementById('title-input-1');
let contentInput1 = document.getElementById('content-input-1');
let checktodo = document.getElementById('option1');
let checkdoing = document.getElementById('option2');
let checkcompleted = document.getElementById('option3');
let checkblocked = document.getElementById('option4');

createButton.addEventListener("click", function() {
    tableContainer.style.display = "flex";
});

closeadd.addEventListener("click", function() {
    tableContainer.style.display = "none";
});

updateButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        borderfixed1.style.display = "flex";
    });
});

closeupdate.addEventListener("click", function() {
    borderfixed1.style.display = "none";
});

deleteButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        borderdelete.style.display = "flex";
    });
});

nodelete.addEventListener("click", function() {
    borderdelete.style.display = "none";
});

boxdelete.addEventListener("blur", function() {
    borderdelete.style.display = "none";
});

function layDanhSachTuLocalStorage() {
    let danhSach = localStorage.getItem('danhSachMuc');
    return danhSach ? JSON.parse(danhSach) : [];
}

function luuMucVaoLocalStorage(muc) {
    let danhSach = layDanhSachTuLocalStorage();
    danhSach.push(muc);
    localStorage.setItem('danhSachMuc', JSON.stringify(danhSach));
}

function layDuLieuTuLocalStorage() {
    let data = localStorage.getItem('mangTrungGian');
    return data ? JSON.parse(data) : [];
}

function luuMangTrungGianVaoLocalStorage(arr) {
    localStorage.setItem('mangTrungGian', JSON.stringify(arr));
}

function renderItems(items) {
    let todoList = document.getElementById("border-to-do");
    todoList.innerHTML = "";
    console.log(items);
    items.forEach(function(item, index) {
        let todoItemDiv = document.createElement("div");
        todoItemDiv.classList.add("to-do-item");
        todoItemDiv.innerHTML = `
            <div class="Marketing">
                <div class="Marketing-text">${item.header}</div>
            </div>
            <div class="edit">
                <img src="./assests/img/êdit.svg" alt="">
            </div>
            <div class="delete">
                <img src="./assests/img/recycle.svg" alt="">
            </div>
            <div class="body-item">
                <div class="body-item-text">${item.title}</div>
            </div>
            <div class="under-line"></div>
            <div class="footer-item">
                <div class="footer-item-text">${item.content}</div>
            </div>
            <div class="clock">
                <img src="./assests/img/clock.svg" alt="">
            </div>
            <div class="day-month-year">
                <div class="day-month-year-text">${item.date}</div>
            </div>
        `;
        todoList.appendChild(todoItemDiv);

        let updateButton = todoItemDiv.querySelector(".edit");
        updateButton.addEventListener("click", function() {
            borderfixed1.style.display = "flex";
            renderEditForm(index);
        });

        let deleteButton = todoItemDiv.querySelector(".delete");
        deleteButton.addEventListener("click", function() {
            borderdelete.style.display = "flex";
            document.getElementById("yes-delete").addEventListener("click", function() {
                xoaMucKhoiLocalStorage(index);
                renderItems(layDuLieuTuLocalStorage());
                borderdelete.style.display = "none";
            });
        });
    });
    let mangTrungGian = layDuLieuTuLocalStorage();
    let count = mangTrungGian.length;
    document.getElementById("number-1").innerHTML = count;
}

function renderEditForm(index) {
    let items = layDuLieuTuLocalStorage();
    let itemToEdit = items[index]
    console.log(itemToEdit);
    headerInput1.value = itemToEdit.header; 
    titleInput1.value = itemToEdit.title; 
    contentInput1.value = itemToEdit.content;
    checktodo.checked = itemToEdit.option;
    borderfixed1.style.display = "flex";
    document.getElementById('edit-item-index').value = index;
}
document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();

    if (headerInput.value.trim() === '') {
        errorHeader.style.display = 'block';
    } else {
        errorHeader.style.display = 'none';
    }

    if (titleInput.value.trim() === '') {
        errorTitle.style.display = 'block';
    } else {
        errorTitle.style.display = 'none';
    }

    if (contentInput.value.trim() === '') {
        errorContent.style.display = 'block';
    } else {
        errorContent.style.display = 'none';
    }

    if (headerInput.value.trim() !== '' && titleInput.value.trim() !== '' && contentInput.value.trim() !== '') {
        tableContainer.style.display = "none";

        let newItem = {
            header: headerInput.value.trim(),
            title: titleInput.value.trim(),
            content: contentInput.value.trim(),
            date: getCurrentDate(),
            option: true,
        };
        console.log(newItem);
        let mangTrungGian = layDuLieuTuLocalStorage();
        mangTrungGian.push(newItem);
        luuMangTrungGianVaoLocalStorage(mangTrungGian);

        renderItems(mangTrungGian);

        headerInput.value = '';
        titleInput.value = '';
        contentInput.value = '';
    }
});
document.getElementById('form-1').addEventListener('submit', function(event) {
    event.preventDefault();

    let index = document.getElementById('edit-item-index').value;

    let updatedItem = {
        header: headerInput1.value.trim(),
        title: titleInput1.value.trim(), 
        content: contentInput1.value.trim(), 
        date: getCurrentDate(),
        option: true,
    };
    let mangTrungGian = layDuLieuTuLocalStorage();
    console.log(mangTrungGian);

    let items = layDuLieuTuLocalStorage();
    items[index] = updatedItem;

    luuMangTrungGianVaoLocalStorage(items);

    renderItems(items);

    borderfixed1.style.display = "none";
});

function getCurrentDate() {
    let date = new Date();
    let options = { month: 'long', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function xoaMucKhoiLocalStorage(index) {
    let mangTrungGian = layDuLieuTuLocalStorage();
    mangTrungGian.splice(index, 1);
    luuMangTrungGianVaoLocalStorage(mangTrungGian);
}

// Render lại danh sách từ local storage khi trang được tải
let dataFromStorage = layDuLieuTuLocalStorage();
renderItems(dataFromStorage);
