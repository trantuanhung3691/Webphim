import '../../assets/css/cart.css';
import { PhimService } from '../services/phimSV';
import { Phim } from '../models/phim';
import { renderStar } from '.';
import * as Highcharts from 'highcharts';
// Alternatively, this is how to load Highstock. Highmaps is similar.
// import Highcharts from 'highcharts/highstock';
// Load the exporting module.
import * as Exporting from 'highcharts/modules/exporting';
// Initialize exporting module.
Exporting(Highcharts);
// Generate the chart
Highcharts.chart('statistic', {

    title: {
        text: 'Solar Employment Growth by Sector, 2010-2016'
    },

    subtitle: {
        text: 'Source: thesolarfoundation.com'
    },

    yAxis: {
        title: {
            text: 'Number of Employees'
        }
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },

    plotOptions: {
        series: {
            label: {
                connectorAllowed: false
            },
            pointStart: 2010
        }
    },

    series: [{
        name: 'Installation',
        data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
    }, {
        name: 'Manufacturing',
        data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
    }, {
        name: 'Sales & Distribution',
        data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
    }, {
        name: 'Project Development',
        data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
    }, {
        name: 'Other',
        data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
    }],

    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
    }

});


//Khởi tạo instance từ lớp PhimService
const phimSV = new PhimService;
let danhSachGioHang: Array<Phim> = [];
//khi html load lên hết thì chạy code trong này
window.onload = () => {
    if (localStorage.getItem('cartList')) {
        danhSachGioHang = JSON.parse(localStorage.getItem('cartList'));
        taoBang(danhSachGioHang);
    }
}

// Hàm tạo bảng Table
function taoBang(danhSachGioHang) {
    var content = "";
    for (let i in danhSachGioHang) {
        let { MaPhim, TenPhim, Trailer, HinhAnh, MoTa, MaNhom, NgayKhoiChieu, DanhGia } = danhSachGioHang[i];
        content += `
        <tr>
            <td>${parseInt(i) + 1}</td>
            <td>${TenPhim}</td>
            <td>${MoTa}</td>
            <td><img src=${HinhAnh} style="width:100px;"</td>
            <td>${NgayKhoiChieu ? NgayKhoiChieu.substr(0, 10) : '2018-20-10'}</td>
            <td>${renderStar(parseInt(DanhGia))}</td>
            <td>
                <button class="btn btn-info btnXoa" data-maphim= "${MaPhim}" >Xoá</button>
            </td>
        </tr>
        `;
    }
    (<HTMLTableElement>document.getElementById('tbodyDSGioHang')).innerHTML = content;
    xoaPhimKhoiGioHang('btnXoa');
}

let xoaPhimKhoiGioHang = (btnClass: string) => {
    let btns: any = (<HTMLCollection>document.getElementsByClassName(btnClass));
    for (let btn of btns) {
        btn.addEventListener('click', () => {
            let maphim = btn.getAttribute('data-maphim');
            for (let i in danhSachGioHang) {
                if (danhSachGioHang[i].MaPhim == maphim) {
                    danhSachGioHang.splice(parseInt(i), 1);
                }
            }
            taoBang(danhSachGioHang);
            //lưu xuống local storage
            localStorage.setItem('cartList', JSON.stringify(danhSachGioHang));
        });
    }
}

//thanh toán
let btnThanhToan = (<HTMLButtonElement>document.getElementById('btnThanhToan'));
btnThanhToan.addEventListener('click', () => {
    danhSachGioHang = [];
    taoBang(danhSachGioHang);
    //lưu xuống local storage
    localStorage.setItem('cartList', JSON.stringify(danhSachGioHang));
});