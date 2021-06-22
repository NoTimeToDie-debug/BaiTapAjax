function NhanVien(maNV,tenNV,cVu,heSCV,luong,gio) {
    this.maNhanVien = maNV;
    this.tenNhanVien = tenNV;
    this.chucVu = cVu;
    this.heSoChucVu = heSCV;
    this.luongCoBan = luong;
    this.soGioLamTrongThang = gio;
    this.tongLuong = function (heSCV,luong) {
        return heSCV*luong;
    }
    this.xepLoai = function (gio) {
        var output = '';
        if (gio < 50) {
            output = 'Yếu';
        } else {
            if (gio >= 120) {
                output = 'Xuất sắc';
            } else if (gio >= 100 && gio < 120) {
                output = 'Giỏi';
            } else if (gio >= 50 && gio < 100) {
                output = 'Khá';
            } else {
                output = 'Không hợp lệ !';
            }
        }
        return output;
    }
}