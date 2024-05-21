         // Sample data for IPs và biểu đồ
         var ipData = {
            "404": [
                { ip: "192.168.1.10", os: "Win 10", cpuData: [], ramData: [], diskData: [], networkData: [] },
                { ip: "192.168.1.13", os: "Win 11", cpuData: [], ramData: [], diskData: [], networkData: [] },
                { ip: "192.168.1.16", os: "Win 7", cpuData: [], ramData: [], diskData: [], networkData: [] },
                { ip: "192.168.1.22", os: "Win 7", cpuData: [], ramData: [], diskData: [], networkData: [] },
                { ip: "192.168.1.32", os: "Win 7", cpuData: [], ramData: [], diskData: [], networkData: [] }
            ],
            "405": [
                { ip: "192.168.1.11", os: "Ubuntu", cpuData: [], ramData: [], diskData: [], networkData: [] },
                { ip: "192.168.1.14", os: "Ubuntu", cpuData: [], ramData: [], diskData: [], networkData: [] },
                { ip: "192.168.1.17", os: "Ubuntu", cpuData: [], ramData: [], diskData: [], networkData: [] }
            ],
            "406": [
                { ip: "192.168.1.12", os: "Macbook", cpuData: [], ramData: [], diskData: [], networkData: [] },
                { ip: "192.168.1.15", os: "Macbook", cpuData: [], ramData: [], diskData: [], networkData: [] },
                { ip: "192.168.1.18", os: "Macbook", cpuData: [], ramData: [], diskData: [], networkData: [] }
            ]
        };

        // Function to draw the chart
        function drawChart(canvasId, data, chartData, label, color) {
            var ctx = document.getElementById(canvasId).getContext('2d');
            var chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: Array.from(Array(chartData.length), (_, i) => (i + 1).toString()),
                    datasets: [{
                        label: label,
                        data: chartData,
                        backgroundColor: 'rgba(' + color.join(',') + ', 0.2)',
                        borderColor: 'rgba(' + color.join(',') + ', 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    animation: {
                        animateRotate: true
                    }
                }
            });
            return chart; // Return the chart object
        }
        

        document.addEventListener("DOMContentLoaded", function () {
            // Get the tbody element of the hardware table
            var hardwareTableBody = document.getElementById('hardwareTableBody');

            // Get the room buttons
            var roomButtons = document.querySelectorAll('.room-button');

            // Create an empty array to store chart objects
            var charts = [];

            // Iterate through each button and add a click event listener
            roomButtons.forEach(function (button) {
                button.addEventListener('click', function () {
                    // Clear existing rows in the hardware table
                    hardwareTableBody.innerHTML = '';

                    // Get the list of IPs for the corresponding room
                    var ips = ipData[button.innerText];

                    // Create new data rows based on the selected room and IP list
                    ips.forEach(function (data, index) {
                        var hardwareRow = document.createElement('tr');
                        hardwareRow.innerHTML = '<td>PC</td><td>' + data.ip + '</td><td>' + data.os + '</td><td><canvas id="cpuChart' + button.innerText + '_' + index + '"></canvas></td><td><canvas id="ramChart' + button.innerText + '_' + index + '"></canvas></td><td><canvas id="diskChart' + button.innerText + '_' + index + '"></canvas></td><td><canvas id="networkChart' + button.innerText + '_' + index + '"></canvas></td>';
                        hardwareTableBody.appendChild(hardwareRow);

                        // Draw the initial charts and store the chart objects
                        var cpuChart = drawChart('cpuChart' + button.innerText + '_' + index, data, data.cpuData, 'CPU Usage', [255, 99, 132]);
                        var ramChart = drawChart('ramChart' + button.innerText + '_' + index, data, data.ramData, 'RAM Usage', [54, 162, 235]);
                        var diskChart = drawChart('diskChart' + button.innerText + '_' + index, data, data.diskData, 'Disk Usage', [255, 206, 86]);
                        var networkChart = drawChart('networkChart' + button.innerText + '_' + index, data, data.networkData, 'Network Traffic', [75, 192, 192]);
                        
                        charts.push(cpuChart); // Store the CPU chart object in the array
                        charts.push(ramChart); // Store the RAM chart object in the array
                        charts.push(diskChart); // Store the Disk chart object in the array
                        charts.push(networkChart); // Store the Network chart object in the array
                    });

                    // Start updating the hardware data periodically
                    setInterval(function () {
                        // Iterate through each chart object
                        charts.forEach(function (chart, index) {
                            // Get the corresponding IP data
                            var dataIndex = Math.floor(index / 4); // 4 charts per IP
                            var dataType = index % 4; // 0: CPU, 1: RAM, 2: Disk, 3: Network
                            var data = ipData[button.innerText][dataIndex];

                            // Choose which data array to update
                            var chartData;
                            switch (dataType) {
                                case 0:
                                    chartData = data.cpuData;
                                    break;
                                case 1:
                                    chartData = data.ramData;
                                    break;
                                case 2:
                                    chartData = data.diskData;
                                    break;
                                case 3:
                                    chartData = data.networkData;
                                    break;
                                default:
                                    break;
                            }

                            // Add a new random value to the data array
                            chartData.push(Math.floor(Math.random() * 50));
                            // Remove the oldest value if the array length exceeds 999
                            if (chartData.length > 90) {
                                chartData.shift();
                            }
                            // Update the chart with the new data
                            chart.data.labels = Array.from(Array(chartData.length), (_, i) => (i + 1).toString());
                            chart.data.datasets[0].data = chartData;
                            chart.update(); // Update the chart
                        });
                    }, 800); // Update data every 3 seconds
                });
            });
        });
   

    // Lấy thẻ tbody của bảng phần cứng
    var hardwareTableBody = document.getElementById('hardwareTableBody');
    
    // Lấy thẻ tbody của bảng mạng
    var networkTableBody = document.getElementById('networkTableBody');
    
    // Lấy danh sách các button room
    var roomButtons = document.querySelectorAll('.room-button');
    
    // Lặp qua từng button và thêm sự kiện click
    roomButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            // Xóa hết các dòng hiện tại trong bảng phần cứng
            hardwareTableBody.innerHTML = '';
    
            // Xóa hết các dòng hiện tại trong bảng mạng
            networkTableBody.innerHTML = '';
    
            // Lấy danh sách IP cho phòng tương ứng
            var ips = ipData[button.innerText];
    
            // Tạo ra các dòng dữ liệu mới dựa trên room được chọn và danh sách IP
            ips.forEach(function (data, index) {
                var hardwareRow = document.createElement('tr');
                hardwareRow.innerHTML = '<td>PC</td><td>' + data.ip + '</td><td>' + data.os + '</td><td><canvas id="cpuChart' + button.innerText + '_' + index + '" width="100" height="100"></canvas></td><td><canvas id="ramChart' + button.innerText + '_' + index + '" width="100" height="100"></canvas></td><td><canvas id="diskChart' + button.innerText + '_' + index + '" width="100" height="100"></canvas></td>';
                hardwareTableBody.appendChild(hardwareRow);
    
                var networkRow = document.createElement('tr');
                networkRow.innerHTML = '<td>PC</td><td>' + data.ip + '</td><td>' + data.os + '</td><td><canvas id="networkChart' + button.innerText + '_' + index + '" width="100" height="100"></canvas></td><td class="border px-4 py-2"><a><i class="fas fa-desktop"></i></a></td>';
                networkTableBody.appendChild(networkRow);
    
                // Gọi lại hàm vẽ biểu đồ sau khi thêm dữ liệu mới
                drawCharts(button.innerText + '_' + index, data);
            });
        });
    });
    
    // Hàm vẽ biểu đồ
    function drawCharts(room, data) {
        // Dữ liệu biểu đồ
        var cpuData = data.cpuData;
        var ramData = data.ramData;
        var diskData = data.diskData;
        var networkData = data.networkData;
    
        // Tạo biểu đồ CPU
        var cpuCtx = document.getElementById('cpuChart' + room).getContext('2d');
        var cpuChart = new Chart(cpuCtx, {
            type: 'line',
            data: {
                labels: Array.from(Array(cpuData.length), (_, i) => (i + 1).toString()), // Nhãn trục X (ví dụ)
                datasets: [{
                    label: 'CPU',
                    data: cpuData,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                animation: {
                    animateRotate: true // Kích hoạt hiệu ứng quay
                }
            }
        });
    
        // Tạo biểu đồ RAM
        var ramCtx = document.getElementById('ramChart' + room).getContext('2d');
        var ramChart = new Chart(ramCtx, {
            type: 'line',
            data: {
                labels: Array.from(Array(ramData.length), (_, i) => (i + 1).toString()), // Nhãn trục X (ví dụ)
                datasets: [{
                    label: 'RAM',
                    data: ramData,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                animation: {
                    animateRotate: true // Kích hoạt hiệu ứng quay
                }
            }
        });
    
        // Tạo biểu đồ Disk
        var diskCtx = document.getElementById('diskChart' + room).getContext('2d');
        var diskChart = new Chart(diskCtx, {
            type: 'line',
            data: {
                labels: Array.from(Array(diskData.length), (_, i) => (i + 1).toString()), // Nhãn trục X (ví dụ)
                datasets: [{
                    label: 'Disk',
                    data: diskData,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                animation: {
                    animateRotate: true // Kích hoạt hiệu ứng quay
                }
            }
        });
    
        // Tạo biểu đồ Network
        var networkCtx = document.getElementById('networkChart' + room).getContext('2d');
        var networkChart = new Chart(networkCtx, {
            type: 'line',
            data: {
                labels: Array.from(Array(networkData.length), (_, i) => (i + 1).toString()), // Nhãn trục X (ví dụ)
                datasets: [{
                    label: 'Network',
                    data: networkData,
                    backgroundColor: 'rgba(255, 205, 86, 0.2)',
                    borderColor: 'rgba(255, 205, 86, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                animation: {
                    animateRotate: true // Kích hoạt hiệu ứng quay
                }
            }
        });
    }
    
    //kiểm tra mạng
        // Hàm ping từng địa chỉ IP từ API và xác định mạng WAN hoặc LAN
        function checkNetwork(ipAddress) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', 'https://www.google.com', true);
            xhr.onload = function () {
                if (xhr.status >= 200 && xhr.status < 300) {
                    // Mạng WAN
                    console.log(ipAddress + ' - WAN');
                    // Thực hiện các hành động phù hợp cho mạng WAN
                    updateIcon(ipAddress, true);
                } else {
                   // Mạng LAN
                    console.log(ipAddress + ' - LAN');
                    // Thực hiện các hành động phù hợp cho mạng LAN
                    updateIcon(ipAddress, false);
                }
            };
            xhr.onerror = function () {
                // Mạng LAN
                console.log(ipAddress + ' - LAN');
                // Thực hiện các hành động phù hợp cho mạng LAN
                updateIcon(ipAddress, false);
            };
            xhr.send();
        }
    
    // Hàm cập nhật màu icon dựa trên kết quả kiểm tra mạng
    function updateIcon(ipAddress, isWAN) {
        var iconElement = document.querySelector('[data-ip="' + ipAddress + '"]');
        if (isWAN) {
            // Mạng WAN - Cập nhật màu icon thành xanh
            iconElement.style.color = 'green';
        } else {
            // Mạng LAN - Cập nhật màu icon thành đen
            iconElement.style.color = 'black';
        }
    }
    
    // Lặp qua danh sách các IP từ API và gọi hàm kiểm tra mạng cho mỗi IP
    var rooms = Object.keys(ipData);
    rooms.forEach(function (room) {
        ipData[room].forEach(function (data) {
            checkNetwork(data.ip);
        });
    });
    
    // Define the export function
    function exportTableToExcel(tableId, chartData, fileName) {
      const table = document.querySelector(tableId);
      const wb = XLSX.utils.book_new();
      
      // Convert table data to worksheet
      const ws = XLSX.utils.table_to_sheet(table, { sheet: "Table Data" });
    
      // Convert chart data to worksheet
      const chartWs = XLSX.utils.aoa_to_sheet(chartData);
    
      // Append both worksheets to the workbook
      XLSX.utils.book_append_sheet(wb, ws, "Table Data");
      XLSX.utils.book_append_sheet(wb, chartWs, "Chart Data");
    
      // Save the workbook as an Excel file
      XLSX.writeFile(wb, fileName + ".xlsx");
    }
    
    // Add a click event listener to the export button
    document.getElementById("exportButton").addEventListener("click", function() {
      // Gather chart data
      const chartData = [];
    
      // Get the CPU data from the table
      const cpuTableRows = document.querySelectorAll("#hardwareTableBody tr");
      const cpuData = Array.from(cpuTableRows).map(tr => {
        const cpuCanvas = tr.querySelector("td:nth-child(4) canvas");
        const chart = Chart.getChart(cpuCanvas);
        const chartData = chart.data.datasets[0].data;
        return chartData;
      });
    
      // Get the RAM data from the table
      const ramData = Array.from(cpuTableRows).map(tr => {
        const ramCanvas = tr.querySelector("td:nth-child(5) canvas");
        const chart = Chart.getChart(ramCanvas);
        const chartData = chart.data.datasets[0].data;
        return chartData;
      });
    
      // Get the disk data from the table
      const diskData = Array.from(cpuTableRows).map(tr => {
        const diskCanvas = tr.querySelector("td:nth-child(6) canvas");
        const chart = Chart.getChart(diskCanvas);
        const chartData = chart.data.datasets[0].data;
        return chartData;
      });
    
      // Get the network data from the table
      const networkTableRows = document.querySelectorAll("#networkTableBody tr td:nth-child(4) canvas");
      const networkData = Array.from(networkTableRows).map(canvas => {
        const chart = Chart.getChart(canvas);
        const chartData = chart.data.datasets[0].data;
        return chartData;
      });
    
      // Get the IP data from the table
      const ipTableRows = document.querySelectorAll("#ipTableBody tr");
      const ipData = Array.from(ipTableRows).map(tr => {
        const ipSpan = tr.querySelector("td:nth-child(3) span");
        const ip = ipSpan.innerText;
        return ip;
      });
    
      // Add the CPU, RAM, disk, network, and IP data to the chartData array
      for (let i = 0; i < cpuData.length; i++) {
        chartData.push(["CPU Data", ...cpuData[i]]);
        chartData.push(["RAM Data", ...ramData[i]]);
        chartData.push(["Disk Data", ...diskData[i]]);
        chartData.push(["Network Data", ...networkData[0]]);
        chartData.push(["IP Data", ipData[i]]);
      }
    
      // Call the export function with chartData
      exportTableToExcel("#hardwareTableBody", chartData, "HardwareTable");
    });
