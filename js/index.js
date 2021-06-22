var arrNhanVien = [];
var kiemTraDuLieu = new Validation();
document.querySelector('#btnXacNhan').onclick = function (event) {
    event.preventDefault();
    var nhanVien = new NhanVien();
    nhanVien.maNhanVien = document.querySelector('#ipMaNhanVien').value;
    nhanVien.tenNhanVien = document.querySelector('#ipTenNhanVien').value;
    nhanVien.chucVu = document.querySelector('#chucVu')[document.querySelector('#chucVu').selectedIndex].innerHTML;
    nhanVien.luongCoBan = document.querySelector('#ipLuongCoBan').value;
    nhanVien.soGioLamTrongThang = document.querySelector('#ipSoGioLam').value;
    //----------------------Validation------------------------------
    //Kiểm tra rỗng
    var valid = true;

    //Kiểm tra các ký tự
    valid &= kiemTraDuLieu.kiemTraRong(nhanVien.tenNhanVien, '#error_required_tenNhanVien', 'Mã nhân viên') & kiemTraDuLieu.kiemTraTatCaCacKyTu(nhanVien.tenNhanVien, '#error_required_tenNhanVien', 'Tên nhân viên');

    // //Kiểm tra các số
    valid &= kiemTraDuLieu.kiemTraRong(nhanVien.luongCoBan, '#error_required_luongCoBan', 'Lương cơ bản') & kiemTraDuLieu.kiemTraTatCaSo(nhanVien.luongCoBan, '#error_required_luongCoBan', 'Lương cơ bản') & kiemTraDuLieu.kiemTraGiaTri(nhanVien.luongCoBan, '#error_required_luongCoBan', 1000000, 20000000, 'Lương cơ bản') & kiemTraDuLieu.kiemTraRong(nhanVien.soGioLamTrongThang, '#error_required_soGioLam', 'Số giờ làm') & kiemTraDuLieu.kiemTraTatCaSo(nhanVien.soGioLamTrongThang, '#error_required_soGioLam', 'Số giờ làm') & kiemTraDuLieu.kiemTraGiaTri(nhanVien.soGioLamTrongThang, '#error_required_soGioLam', 50, 150, 'Số giờ làm');

    //Kiểm tra độ dài
    valid &= kiemTraDuLieu.kiemTraRong(nhanVien.maNhanVien, '#error_required_maNhanVien', 'Mã nhân viên') & kiemTraDuLieu.kiemTraDoDai(nhanVien.maNhanVien, '#error_required_maNhanVien', 4, 6, 'Mã nhân viên');

    if(!valid) {
        return;
    }

    var promise = axios({
        url:`http://svcy.myclass.vn/api/QuanLyNhanVienApi/ThemNhanVien`,
        method: `POST`,
        data: nhanVien
    })

    promise.then (function (result) {
        console.log(result.data);
        getNhanVienApi();
    })

    promise.catch(function (error){
        console.log(error.response.data);
    })
}

//Lấy API Nhân Viên về
function getNhanVienApi() {
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayDanhSachNhanVien',
        method: 'GET',
        responseType: 'json'
    });

    promise.then(function (result) {
        console.log(result.data);
        renderTableNhanVien(result.data)
    });

    promise.catch(function (error) {
        console.log(error.reponnse.data);
    })
}

getNhanVienApi();

//Chạy hàm tạo bảng nhân viên đã lấy lên
function renderTableNhanVien(arrNV) {
    let content = '';
    for (var index = 0; index < arrNV.length; index++) {
        var nv = arrNV[index];
        var nhanVien = new NhanVien(nv.maNhanVien, nv.tenNhanVien, nv.chucVu, nv.heSoChucVu, nv.luongCoBan, nv.soGioLamTrongThang);
        var trNhanVien = `
                            <tr>
                                <td>${nhanVien.maNhanVien}</td>
                                <td>${nhanVien.tenNhanVien}</td>
                                <td>${nhanVien.chucVu}</td>
                                <td>${nhanVien.luongCoBan}</td>
                                <td>${nhanVien.tongLuong(nhanVien.heSoChucVu,nhanVien.luongCoBan)}</td>
                                <td>${nhanVien.soGioLamTrongThang}</td>
                                <td>${nhanVien.xepLoai(nhanVien.soGioLamTrongThang)}</td>
                                <td>
                                <button class="btn btn-danger" onclick="xoaNhanVien('${nhanVien.maNhanVien}')" >Xoá
                                </button>
                                <button class="btn btn-primary" onclick="suaThongTin('${nhanVien.maNhanVien}')" >Chỉnh sửa
                                </button>
                                </td>
                            </tr>
                        `;
        content += trNhanVien;
    }
    document.querySelector('#tblNhanVien').innerHTML = content;
}

//Chọn mã nhân viên cần sửa và load lên input
function suaThongTin(maNhanVien) {
    var promise = axios({
        url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayThongTinNhanVien?maNhanVien=${maNhanVien}`,
        method: 'GET'
    });

    promise.then(function (result) {
        var nhanVien = result.data;
        console.log("nhanVien", nhanVien);
        document.querySelector('#ipMaNhanVien').value = nhanVien.maNhanVien;
        document.querySelector('#ipTenNhanVien').value = nhanVien.tenNhanVien;
        document.querySelector('#chucVu').value = nhanVien.chucVu;
        document.querySelector('#ipLuongCoBan').value = nhanVien.luongCoBan;
        document.querySelector('#ipSoGioLam').value = nhanVien.soGioLamTrongThang;
    });

    promise.then(function (result) {
        console.log(result.data);
    })
    document.querySelector('#btnLuuThongTin').disabled = false;
}

//Cập nhật dữ liệu và data và in bảng nhân viên lại
document.querySelector('#btnLuuThongTin').onclick = function () {

    //Lấy thông tin người dùng sau khi sửa đổi trên giao diện
    var nhanVien = new NhanVien();
    nhanVien.maNhanVien = document.querySelector('#ipMaNhanVien').value;
    nhanVien.tenNhanVien = document.querySelector('#ipTenNhanVien').value;
    nhanVien.chucVu = document.querySelector('#chucVu').value;
    nhanVien.luongCoBan = document.querySelector('#ipLuongCoBan').value;
    nhanVien.soGioLamTrongThang = document.querySelector('#ipSoGioLam').value;

    //Gọi api
    var promise = axios({
        url:`http://svcy.myclass.vn/api/QuanLyNhanVienApi/CapNhatThongTinNhanVien?maNhanVien=${nhanVien.maNhanVien}`,
        method:  'PUT',
        data:nhanVien
    });

    promise.then(function(result) {
        console.log(result.data);
        getNhanVienApi();
    })

    promise.catch(function(error) {
        console.log(error.reponnse.data)
    })
}

//Xóa nhân viên
function xoaNhanVien (maNhanVienClick) {
    var promise = axios ({
        url:`http://svcy.myclass.vn/api/QuanLyNhanVienApi/XoaNhanVien?maSinhVien=${maNhanVienClick}`,
        method: 'DELETE'
    });

    promise.then(function (result){
        console.log(result.data);
        getNhanVienApi();
    });

    promise.catch(function (error) {
        console.log(error).response.data;
    });
}

