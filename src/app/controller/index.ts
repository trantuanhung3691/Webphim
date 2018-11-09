import '../../assets/css/index.css';
import { PhimService } from '../services/phimSV';
import { Phim } from '../models/phim';
import { NguoiDung } from '../models/nguoidung';
import { NguoiDungService } from '../services/nguoidungSV';
import swal from 'sweetalert2';

//Khởi tạo instance từ lớp PhimService
const phimSV = new PhimService();
let danhSachPhim: Phim[] = [];
let danhSachGioHang: Array<Phim> = [];
//khi html load lên hết thì chạy code trong này

//Khởi tạo instance từ lớp NguoiDungService
const nguoiDungSV = new NguoiDungService();


window.onload = () => {
    phimSV.layDanhSachPhim().done((res) => {
        danhSachPhim = res;
        renderMovieItem();
        // console.log(res);
    }).fail((err) => {
        console.log(err);
    })
    getUser();
}
let renderMovieItem = () => {
    let content: string = '';
    for (let movie of danhSachPhim) {
        //destructering
        let { MaPhim, TenPhim, Trailer, HinhAnh, MoTa, MaNhom, NgayKhoiChieu, DanhGia } = movie;
        content += `
                <div class="col-sm-6 col-md-3 text-center">
                    <div class="movie__item">
                        <img src="${HinhAnh}" onerror="this.onerror === null; this.src='http://www.safexone.com/images/old/default.gif'" style="height:350px" class="img-fluid w-100">
                        <div class="movie__overlay"></div>
                        <div class="movie__detail w-100 text-center text-white">
                            <i class="fa fa-play d-block mx-auto mb-3 video-playvenobox vbox-item" href="https://youtu.be/aOXvyd9v1cg" data-vbtype="video"></i>
                            <p>
                                <a class="movie__icon"><i class="fa fa-file"></i></a>
                                <a 
                                    data-maphim = ${MaPhim}
                                    data-tenphim = ${TenPhim}
                                    data-trailer = ${Trailer}
                                    data-hinhanh = ${HinhAnh}
                                    data-mota = ${MoTa}
                                    data-manhom = ${MaNhom}
                                    data-ngaykhoichieu = ${NgayKhoiChieu}
                                    data-danhgia = ${DanhGia}
                                class="movie__icon btnAddToCard"> <i class="fa fa-shopping-cart"></i> </a>
                            </p>
                            <span>Released: ${NgayKhoiChieu ? NgayKhoiChieu.substr(0, 10) : '2018-20-10'}</span>
                        </div>
                    </div>
                    <p class="movie__name text-center my-3">${TenPhim}</p>
                    ${renderStar(parseInt(DanhGia))}
                </div>
        `;
    }
    //DOM đến đối tượng, lưu ý trong typeScript thì khi DOM đến cũng phải bắt kiểu dữ liệu
    (<HTMLDivElement>document.getElementById('moveList')).innerHTML = content;
    themPhimVaoGioaHang('btnAddToCard');
};

export let renderStar = (num: number) => {
    let stars = '';
    if (num) {
        for (let i = 0; i < num; i++) {
            stars += `
                <i class="fa fa-star movie__star"></i>
            `
        }
        for (let k = 0; k < 5 - num; k++) {
            stars += `
                <i class="fa fa-star-o movie__star"></i>
            `
        }
    }
    else {
        for (let i = 0; i < 5; i++) {
            stars += `
                <i class="fa fa-star-o movie__star"></i>
            `
        }
    }
    return stars;
}

let themPhimVaoGioaHang = (btnClass) => {
    let btns: any = (<HTMLCollection>document.getElementsByClassName(btnClass));
    for (let btn of btns) {
        btn.addEventListener('click', () => {
            let maphim = btn.getAttribute('data-maphim');
            let tenphim = btn.getAttribute('data-tenphim');
            let trailer = btn.getAttribute('data-trailer');
            let hinhanh = btn.getAttribute('data-hinhanh');
            let mota = btn.getAttribute('data-mota');
            let manhom = btn.getAttribute('data-manhom');
            let ngaykhoichieu = btn.getAttribute('data-ngaykhoichieu');
            let danhgia = btn.getAttribute('data-danhgia');

            let PhimItem = new Phim(maphim, tenphim, trailer, hinhanh, mota, manhom, ngaykhoichieu, danhgia);
            //kiểm tra sản phẩm đã có trong giỏ hàng hay chưa
            let index = timPhimTheoMa(maphim);
            if (index === -1) {
                //spread operator
                danhSachGioHang = [...danhSachGioHang, PhimItem];
            }
            //lưu xuống local storage
            localStorage.setItem('cartList', JSON.stringify(danhSachGioHang));
            //hiển thị tổng phim trong giỏ hàng
            (<HTMLSpanElement>document.getElementById('totalAmount')).innerHTML = danhSachGioHang.length.toString();
        });
    }
}

let timPhimTheoMa = (maphim: string) => {
    for (let movie of danhSachGioHang) {
        if (movie.MaPhim === maphim) {
            return 1;
        }
    }
    return -1;
}

//Đăng ký
let dangKy = () => {
    let taiKhoan = (<HTMLInputElement>document.getElementById('TaiKhoan')).value;
    let matKhau = (<HTMLInputElement>document.getElementById('MatKhau')).value;
    let hoTen = (<HTMLInputElement>document.getElementById('HoTen')).value;
    let email = (<HTMLInputElement>document.getElementById('Email')).value;
    let soDT = (<HTMLInputElement>document.getElementById('SoDT')).value;
    let maNhom = 'GP01';
    let maLoaiNguoiDung = 'KhachHang';
    let NguoiDungMoi: NguoiDung = new NguoiDung(taiKhoan, matKhau, email, soDT, maNhom, maLoaiNguoiDung, hoTen);
    // console.log(NguoiDungMoi);
    nguoiDungSV.DangKy(NguoiDungMoi).done((res) => {
        // console.log(res);
        if (typeof (res) !== 'string') {
            swal({
                title: 'Thành công!'
            });
            window.location.assign('index.html');
        }
        else {
            // SweetAlert popup
            swal({
                title: 'Không thành công!',
                text: res,
                imageWidth: 400,
                imageHeight: 200,
            });
        }

    }).fail((err) => {
        console.log(err);
    })
}

(<HTMLButtonElement>document.getElementById('btnDangKy')).addEventListener('click', dangKy);

//Đăng nhập
let dangNhap = () => {
    let taiKhoan = (<HTMLInputElement>document.getElementById('txtTaiKhoan')).value;
    let matKhau = (<HTMLInputElement>document.getElementById('txtMatKhau')).value;

    // console.log(NguoiDungMoi);
    nguoiDungSV.DangNhap(taiKhoan, matKhau).done((res) => {
        // console.log(res);
        if (typeof (res) !== 'string') {
            (<HTMLButtonElement>document.getElementById('btnClose')).click();
            localStorage.setItem('currentUser', JSON.stringify(res));
            getUser();
        }
        else {
            // SweetAlert popup
            swal({
                title: 'Đăng nhập không thành công!',
                text: res,
                imageWidth: 400,
                imageHeight: 200,
            });
        }

    }).fail((err) => {
        console.log(err);
    })
}

(<HTMLButtonElement>document.getElementById('btnDangNhap')).addEventListener('click', dangNhap);

let getUser = () =>{
    if (localStorage.getItem('currentUser')) {
        let nd = JSON.parse(localStorage.getItem('currentUser'));
        (<HTMLAnchorElement>document.getElementById('navSign')).innerHTML = 'Hi ' + nd.HoTen;
    }
}