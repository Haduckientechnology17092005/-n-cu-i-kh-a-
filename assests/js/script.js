let boxinput = document.getElementById("box-input");
let createbtn = document.getElementById("submit-create");

// Lấy các phần tử và thông báo lỗi
var headerInput = document.getElementById('header-input');
var titleInput = document.getElementById('title-input');
var contentInput = document.getElementById('content-input');

var errorHeader = document.getElementById('error-header');
var errorTitle = document.getElementById('error-title');
var errorContent = document.getElementById('error-content');
//Create
document.addEventListener("DOMContentLoaded", function() {
    let createButton = document.getElementById("create-task");
    let tableContainer = document.getElementById("border-fixed");
    let closeadd = document.getElementById("submit-close-add");

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
    let updateButton = document.querySelectorAll(".edit");
    let borderfixed1 = document.getElementById("border-fixed-1");
    let closeupdate = document.getElementById("submit-close-update");

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
    let deleteButton = document.querySelectorAll(".delete");
    let borderdelete = document.getElementById("border-delete");
    let boxdelete = document.getElementById("box-delete");
    let nodelete = document.getElementById("no-delete");

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
let newtask = document.getElementById("new-task");
let todo = document.getElementById("border-to-do");
let todoitem = document.getElementById("to-do-item");
let doing = document.getElementById("border-doing");
let doingitem = document.getElementById("doing-item");
let completed = document.getElementById("border-completed");
let completeditem = document.getElementById("completed-item");
let blocked = document.getElementById("border-blocked");
let blockeditem = document.getElementById("blocked-item");
newtask = [todo, doing, completed, blocked];
todo = [];
todoitem = [{
    header: "Marketing",
    title: "Title",
    content: "Content",
    time: "June 30, 2022"
}]
doing = [];
doingitem = [
    {
        header: "Marketing",
        title: "Title",
        content: "Content",
        time: "June 30, 2022"
    }
];
completed = [];
completeditem = [
    {
        header: "Marketing",
        title: "Title",
        content: "Content",
        time: "June 30, 2022"
    }
];
blocked = [];
blockeditem = [
    {
        header: "Marketing",
        title: "Title",
        content: "Content",
        time: "June 30, 2022"
    }
];
// Hàm để lấy danh sách các mục đã lưu trong local storage
function layDanhSachTuLocalStorage() {
    let danhSach = localStorage.getItem('danhSachMuc');
    return danhSach ? JSON.parse(danhSach) : [];
}

// Hàm để lưu một mục vào local storage
function luuMucVaoLocalStorage(muc) {
    var danhSach = layDanhSachTuLocalStorage();
    danhSach.push(muc);
    localStorage.setItem('danhSachMuc', JSON.stringify(danhSach));
}
document.getElementById('form').addEventListener('submit', function(event) {
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

    // Ngăn chặn gửi biểu mẫu nếu có trường nhập liệu nào còn thiếu thông tin
    if (headerInput.value.trim() === '' || titleInput.value.trim() === '' || contentInput.value.trim() === '') {
        event.preventDefault();
    } else {
        // Lưu thông tin của mục mới vào local storage
        let formData = {
            header: headerInput.value,
            title: titleInput.value,
            content: contentInput.value
        };
        luuMucVaoLocalStorage(formData);
    }
});

function laydulieuStorage(){
    if(localStorage.getItem('danhSachMuc'))
    {
        let formData = JSON.parse(localStorage.getItem('danhSachMuc'));
        console.log(formData);
        return formData;
    }
    else 
    {
        console.log('Khong tim thay du lieu');
        return null;
    }
}
let dataFromStorage = laydulieuStorage();
