export class NguoiDung{
    TaiKhoan: string;
    MatKhau: string;
    Email: string;
    SoDT: string;
    MaNhom: string;
    MaLoaiNguoiDung: string;
    HoTen: string;
    constructor(taikhoan: string, matkhau: string, email: string, sodt: string, manhom: string, maloainguoidung: string, hoten: string){
        this.TaiKhoan = taikhoan;
        this.MatKhau = matkhau;
        this.Email = email;
        this.SoDT = sodt;
        this.MaNhom = manhom;
        this.MaLoaiNguoiDung = maloainguoidung;
        this.HoTen = hoten;
    }
}