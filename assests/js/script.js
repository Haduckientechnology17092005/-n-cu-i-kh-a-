let boxinput = document.getElementById("box-input");
let createbtn = document.getElementById("submit-create");

// Lấy các phần tử và thông báo lỗi
let headerInput = document.getElementById('header-input');
let titleInput = document.getElementById('title-input');
let contentInput = document.getElementById('content-input');

let errorHeader = document.getElementById('error-header');
let errorTitle = document.getElementById('error-title');
let errorContent = document.getElementById('error-content');

let createButton = document.getElementById("create-task");
let tableContainer = document.getElementById("border-fixed");
let closeadd = document.getElementById("submit-close-add");

let updateButton = document.querySelectorAll(".edit");
let borderfixed1 = document.getElementById("border-fixed-1");
let closeupdate = document.getElementById("submit-close-update");

let deleteButton = document.querySelectorAll(".delete");
let borderdelete = document.getElementById("border-delete");
let boxdelete = document.getElementById("box-delete");
let nodelete = document.getElementById("no-delete");

//Create
document.addEventListener("DOMContentLoaded", function() {

    // Hiển thị bảng khi nhấp vào nút "Create"
    createButton.addEventListener("click", function() {
        tableContainer.style.display = "flex";
    });

    // Ẩn bảng khi kích chuột vao close
    closeadd.addEventListener("click", function() {
        tableContainer.style.display = "none";
    })
});

//Edit
document.addEventListener("DOMContentLoaded", function() {

    //Hien thi bang khi nhan nut edit
    updateButton.forEach(function(button) {
        button.addEventListener("click", function() {
            borderfixed1.style.display = "flex";
        });
    });

    //An bang khi kich chuot vao close
    closeupdate.addEventListener("click", function() {
        borderfixed1.style.display = "none";
    })
})

//Delete
document.addEventListener("DOMContentLoaded", function() {

    //Hien thi khi nhan nut delete
    deleteButton.forEach(function(button) {
        button.addEventListener("click", function() {
            borderdelete.style.display = "flex";
        });
    })
    //An bang khi kich vao no
    nodelete.addEventListener("click", function() {
        borderdelete.style.display = "none";
    })
    //kich chuot ra ngoai va an
    boxdelete.addEventListener("blur", function() {
        borderdelete.style.display = "none";
    })
})
// Hàm để lấy danh sách các mục đã lưu trong local storage
function layDanhSachTuLocalStorage() {
    let danhSach = localStorage.getItem('danhSachMuc');
    return danhSach ? JSON.parse(danhSach) : [];
}

// Hàm để lưu một mục vào local storage
function luuMucVaoLocalStorage(muc) {
    let danhSach = layDanhSachTuLocalStorage();
    danhSach.push(muc);
    localStorage.setItem('danhSachMuc', JSON.stringify(danhSach));
}

// Hàm để lưu một mảng trung gian vào local storage
function luuMangTrungGianVaoLocalStorage(arr) {
    localStorage.setItem('mangTrungGian', JSON.stringify(arr));
}

// Hàm để lấy dữ liệu từ local storage
function layDuLieuTuLocalStorage() {
    let data = localStorage.getItem('mangTrungGian');
    return data ? JSON.parse(data) : [];
}

document.addEventListener("DOMContentLoaded", function() {
    // Render lại danh sách từ local storage khi trang được tải
    let dataFromStorage = layDuLieuTuLocalStorage();
    renderItems(dataFromStorage);
    let count = dataFromStorage.length;
    document.getElementById('number-1').innerHTML = count;

    // Xử lý sự kiện khi form được gửi
    document.getElementById('form').addEventListener('submit', function(event) {
        event.preventDefault();

        // Kiểm tra và hiển thị thông báo lỗi nếu các trường không được điền đầy đủ
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
                date: getCurrentDate()
            };

            // Thêm dữ liệu mới vào mảng trung gian
            let mangTrungGian = layDuLieuTuLocalStorage();
            mangTrungGian.push(newItem);
            luuMangTrungGianVaoLocalStorage(mangTrungGian);

            renderItems(mangTrungGian);

            count = mangTrungGian.length;
            document.getElementById('number-1').innerHTML = count;

            headerInput.value = '';
            titleInput.value = '';
            contentInput.value = '';
        }
    });
});

// Hàm để render danh sách mục
function renderItems(items) {
    let todoList = document.getElementById("border-to-do");
    todoList.innerHTML = "";

    items.forEach(function(item) {
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

        // Thêm sự kiện "click" cho nút "Edit" của mỗi mục
        let updateButton = todoItemDiv.querySelector(".edit");
        updateButton.addEventListener("click", function() {
            borderfixed1.style.display = "flex";
        });

        // Thêm sự kiện "click" cho nút "Delete" của mỗi mục
        let deleteButton = todoItemDiv.querySelector(".delete");
        deleteButton.addEventListener("click", function() {
            borderdelete.style.display = "flex";
        });
    });
}

function getCurrentDate() {
    let date = new Date();
    let options = { month: 'long', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// script.js

// Hàm để xóa một mục từ mảng trung gian và cập nhật lại local storage
function xoaMucKhoiLocalStorage(index) {
    let mangTrungGian = layDuLieuTuLocalStorage();
    mangTrungGian.splice(index, 1); // Xóa mục khỏi mảng trung gian
    luuMangTrungGianVaoLocalStorage(mangTrungGian); // Cập nhật local storage
}

document.addEventListener("DOMContentLoaded", function() {
    let deleteButtons = document.querySelectorAll(".delete");
    let deleteConfirmationBox = document.getElementById("border-delete");

    deleteButtons.forEach(function(button) {
        button.addEventListener("click", function() {
            let listItem = button.closest(".to-do-item"); // Tìm phần tử cha của nút xóa
            if (listItem) {
                let index = Array.from(deleteButtons).indexOf(button); // Lấy vị trí của nút xóa trong mảng deleteButtons
                let itemId = listItem.getAttribute("to-do-item");
                deleteConfirmationBox.style.display = "flex"; 
                document.getElementById("yes-delete").addEventListener("click", function() {
                    xoaMucKhoiLocalStorage(index); // Xóa mục khỏi local storage
                    listItem.remove();
                    updateItemCount();
                    deleteConfirmationBox.style.display = "none";
                });

                document.getElementById("no-delete").addEventListener("click", function() {
                    deleteConfirmationBox.style.display = "none";
                });
                deleteConfirmationBox.addEventListener("click", function(event) {
                    if (event.target === deleteConfirmationBox) {
                        deleteConfirmationBox.style.display = "none";
                    }
                });
            }
        });
    });

    function updateItemCount() {
        let todoCount = document.querySelectorAll(".to-do-item").length;
        document.getElementById("number-1").textContent = todoCount;
    }
});
//Edit
document.addEventListener("DOMContentLoaded", function() {
    function renderEditForm(index) {
        let items = layDuLieuTuLocalStorage();
        let itemToEdit = items[index];
        headerInput1.value = itemToEdit.header; 
        titleInput1.value = itemToEdit.title; 
        contentInput1.value = itemToEdit.content; 1

        borderfixed1.style.display = "flex";
        document.getElementById('edit-item-index').value = index;
    }

    updateButton.forEach(function(button, index) {
        button.addEventListener("click", function() {
            renderEditForm(index);
        });
    });

    document.getElementById('form-1').addEventListener('submit', function(event) {
        event.preventDefault();

        let index = document.getElementById('edit-item-index').value;

        let updatedItem = {
            header: headerInput1.value.trim(),
            title: titleInput1.value.trim(), 
            content: contentInput1.value.trim(), 
            date: getCurrentDate()
        };

        let items = layDuLieuTuLocalStorage();
        
        items[index] = updatedItem;

        luuMangTrungGianVaoLocalStorage(items);

        renderItems(items);

        borderfixed1.style.display = "none";
    });
});

