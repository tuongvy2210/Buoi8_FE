lst = [];
curItem = null;
$(function () {
    getStudents();
    $('#txtNgaySinh').datepicker({
        format: "dd/mm/yyyy"
    });
});

function getStudents1() {
    fetch("http://localhost:3000/students")
        .then(res => {
            return res.json();
        })
        .then(data => {
            lst = [];
            data.forEach((sv, i) => {
                sv.STT = i + 1;
                lst.push(sv);
            });
            if (lst.length > 0) {
                $("#tbodySV").html("");
                $("#svTemplate").tmpl(lst).appendTo("#tbodySV");
            }
            else {
                str = "<tr><td colspan='5'>No data found</td></tr>";
                $("#tbodySV").html(str);
            }
        })
        .catch(err => {
            str = "<caption>Error....</caption>";
            $("#tbodySV").html(str);
        });
}

async function getStudents(page, size){
    $.ajax({
        method: "GET",
        url: "http://localhost:3000/students_mysql",
        data: {
            page: 1,
            size: 5
        }
    })
    .done(function(data){
        lst=[];
        data.forEach((sv ,i)=> {
            sv.STT=i+1;
            lst.push(sv);            
        });
        if(lst.length > 0){
            $("#tbodySV").html("");
            $("#svTemplace").tmpl(lst).appendTo("#tbodySV");          
        }else{
            str = "<tr><td colspan='5'> No data found</td></tr>";
            $("#tbodySV").html(str);
        }
    })
    .error(function(err){
        str = "<caption>Error....</caption>";
            $("#tbodySV").html(str);
    });
}

function addStudent() {
    $.ajax({
        method: "POST",
        url: "http://localhost:3000/students",
        data: {
            "mssv": "21661045",
            "hoten": "Nguyễn Gia Đạt",
            "lop": "17CSI01",
            "tyleVang": 14.67
        }
    })
        .done(function (msg) {
            console.log("Data: " + msg + "\nStatus: " + status);
        });
    // $.post("http://localhost:3000/students",
    //     {
    //         "mssv": "21661045",
    //         "hoten": "Nguyễn Gia Đạt",
    //         "lop": "17CSI01",
    //         "tyleVang": 14.67
    //     },
    //     function (data, status) {
    //         console.log("Data: " + data + "\nStatus: " + status);
    //     });
}

function createSV() {
    console.log("Create SV....");
    gt = $('input[name="GioiTinh"]:checked').val();
    $.ajax({
        method: "POST",
        url: "http://localhost:3000/students",
        data: {
            "MaSV": $("#txtMSSV").val(),
            "HoTen": $("#txtHoTen").val(),
            "Lop": $("#txtLop").val(),
            "GioiTinh": gt,
            "NgaySinh": $("#txtNgaySinh").val(),
        }
    }).done(function (res) {
        console.log(res);
        if (res.success) {
            alert(res.msg);
            $('#ModalSinhVien').modal('toggle');
            getStudents();
        }
        else {
            alert(res.msg);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) { console.log(textStatus) });
}

function setModal(type) {
    if (type == "up") {
        $("#btnCreate").hide();
        $("#btnUpdate").show();
        $("#txtMSSV").attr("readonly", true);
    }
    else {
        $("#btnCreate").show();
        $("#btnUpdate").hide();
        $("#txtMSSV").attr("readonly", false);
    }
}

function upStudent(mssv) {
    $('#ModalSinhVien').modal('toggle');
    setModal("up");
    sv = lst.find(x => x.MaSV == mssv);
    $("#txtMSSV").val(sv.MaSV);
    $("#txtHoTen").val(sv.HoTen);
    $("#txtLop").val(sv.Lop);
    if (sv.GioiTinh == "Nam")
        $('#radioNam').prop('checked', true);
    else
        $('#radioNu').prop('checked', true);
    $("#txtNgaySinh").val(sv.NgaySinh);
}

function updateSV() {
    gt = $('input[name="GioiTinh"]:checked').val();
    $.ajax({
        method: "PUT",
        url: "http://localhost:3000/students",
        data: {
            "MaSV": $("#txtMSSV").val(),
            "HoTen": $("#txtHoTen").val(),
            "Lop": $("#txtLop").val(),
            "GioiTinh": gt,
            "NgaySinh": $("#txtNgaySinh").val(),
        }
    }).done(function (res) {
        console.log(res);
        if (res.success) {
            alert(res.msg);
            getStudents();
        }
        else {
            alert(res.msg);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) { console.log(textStatus) });
}

function delStudent(mssv) {
    if (confirm("Bạn có chắc chắn xoá??")) {
        $.ajax({
            method: "DELETE",
            url: "http://localhost:3000/students",
            data: {
                "MaSV": mssv,               
            }
        }).done(function (res) {
            console.log(res);
            if (res.success) {
                alert(res.msg);
                getStudents();
            }
            else {
                alert(res.msg);
            }
        }).fail(function (jqXHR, textStatus, errorThrown) { console.log(textStatus) });
    }
}