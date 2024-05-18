
$(document).ready(function () {
    $('.serviceColumn').hide(); // Ẩn tất cả các cột service ban đầu
    $('.service-checkbox').change(function () {
        var service = $(this).val(); // Lấy giá trị của checkbox đã thay đổi
        if (this.checked) {
            $('.' + service + 'Column').show(); // Hiển thị cột tương ứng nếu checkbox được chọn
        } else {
            $('.' + service + 'Column').hide(); // Ẩn cột tương ứng nếu checkbox không được chọn
        }
    });
});

const computerData = [
    { status: "Online", engineRoom: "404", name: "PC1", ip: "192.168.0.1", macAddress: "00:11:22:33:44:55", cpu: "2", ram: "4", disk: "24", network: "NAT" },
    { status: "Online", engineRoom: "404", name: "PC2", ip: "192.168.0.2", macAddress: "00:11:22:33:44:55", cpu: "2", ram: "4", disk: "24", network: "NAT" },
    { status: "Online", engineRoom: "404", name: "PC3", ip: "192.168.0.3", macAddress: "00:11:22:33:44:55", cpu: "2", ram: "4", disk: "24", network: "NAT" },
    { status: "Online", engineRoom: "404", name: "PC4", ip: "192.168.0.4", macAddress: "00:11:22:33:44:55", cpu: "2", ram: "4", disk: "24", network: "NAT" },
    { status: "Online", engineRoom: "404", name: "PC5", ip: "192.168.0.5", macAddress: "00:11:22:33:44:55", cpu: "2", ram: "4", disk: "24", network: "NAT" },
    // Thêm các dữ liệu khác nếu cần
];

document.addEventListener("DOMContentLoaded", function () {
    var tableBody = document.getElementById("tableBody");

    computerData.forEach(function (computer) {
        var row = document.createElement("tr");
        row.classList.add("highlight-row");

        row.innerHTML = `
        <td>${computer.status}</td>
        <td>${computer.engineRoom}</td>
        <td>${computer.name}</td>
        <td>${computer.ip}</td>
        <td>${computer.macAddress}</td>
        <td class="serviceColumn cpuColumn">${computer.cpu}</td>
        <td class="serviceColumn ramColumn">${computer.ram}</td>
        <td class="serviceColumn diskColumn">${computer.disk}</td>
        <td class="serviceColumn networkColumn">${computer.network}</td>
    `;

        tableBody.appendChild(row);
    });
});
