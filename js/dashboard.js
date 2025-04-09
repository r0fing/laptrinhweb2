$(document).ready(function() {
    // Biểu đồ phân bố hàng hóa theo danh mục
    var ctxCategory = document.getElementById('categoryChart').getContext('2d');
    var categoryChart = new Chart(ctxCategory, {
      type: 'pie',
      data: {
        labels: ['Điện thoại', 'Laptop', 'Máy tính bảng', 'Phụ kiện', 'Khác'],
        datasets: [{
          data: [35, 25, 15, 20, 5],
          backgroundColor: [
            '#007bff',
            '#28a745',
            '#ffc107',
            '#17a2b8',
            '#6c757d'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          position: 'right',
          labels: {
            fontFamily: 'Roboto',
            fontSize: 12
          }
        },
        tooltips: {
          backgroundColor: 'rgba(0,0,0,0.7)',
          titleFontFamily: 'Roboto',
          bodyFontFamily: 'Roboto',
          bodyFontSize: 13,
          titleFontSize: 14,
          callbacks: {
            label: function(tooltipItem, data) {
              var dataset = data.datasets[tooltipItem.datasetIndex];
              var total = dataset.data.reduce(function(previousValue, currentValue) {
                return previousValue + currentValue;
              });
              var currentValue = dataset.data[tooltipItem.index];
              var percentage = Math.floor(((currentValue/total) * 100)+0.5);
              return data.labels[tooltipItem.index] + ': ' + currentValue + ' (' + percentage + '%)';
            }
          }
        }
      }
    });
    
    // Biểu đồ doanh thu theo tháng
    var ctxRevenue = document.getElementById('revenueChart').getContext('2d');
    var revenueChart = new Chart(ctxRevenue, {
      type: 'line',
      data: {
        labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
        datasets: [{
          label: 'Doanh thu (triệu VNĐ)',
          data: [150, 180, 210, 250, 230, 280, 300, 320, 290, 350, 380, 420],
          backgroundColor: 'rgba(0, 123, 255, 0.1)',
          borderColor: '#007bff',
          borderWidth: 2,
          pointBackgroundColor: '#007bff',
          pointRadius: 4,
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              fontFamily: 'Roboto',
              callback: function(value) {
                return value + ' tr';
              }
            },
            gridLines: {
              color: 'rgba(0,0,0,0.05)',
              zeroLineColor: 'rgba(0,0,0,0.1)'
            }
          }],
          xAxes: [{
            ticks: {
              fontFamily: 'Roboto'
            },
            gridLines: {
              color: 'rgba(0,0,0,0.05)'
            }
          }]
        },
        legend: {
          labels: {
            fontFamily: 'Roboto'
          }
        },
        tooltips: {
          backgroundColor: 'rgba(0,0,0,0.7)',
          titleFontFamily: 'Roboto',
          bodyFontFamily: 'Roboto',
          callbacks: {
            label: function(tooltipItem, data) {
              return 'Doanh thu: ' + tooltipItem.yLabel + ' triệu VNĐ';
            }
          }
        }
      }
    });
  
    // Xử lý các truy cập nhanh
    $('.quick-action').click(function() {
      var action = $(this).find('h4').text();
      
      switch(action) {
        case 'Thêm mặt hàng':
          window.location.href = 'products.html?action=add';
          break;
        case 'Nhập/Xuất kho':
          window.location.href = 'inventory.html?action=transaction';
          break;
        case 'Tạo báo cáo':
          window.location.href = 'reports.html?action=new';
          break;
        case 'Quản lý người dùng':
          window.location.href = 'users.html';
          break;
      }
    });
  
    // Hiệu ứng hover cho các hàng trong bảng
    $('.table-striped tbody tr').hover(
      function() {
        $(this).css('background-color', '#f1f8ff');
      },
      function() {
        $(this).css('background-color', '');
      }
    );
  
    // Cập nhật thời gian thực
    function updateClock() {
      var now = new Date();
      var hours = now.getHours();
      var minutes = now.getMinutes();
      var seconds = now.getSeconds();
      
      // Định dạng thời gian
      hours = hours < 10 ? '0' + hours : hours;
      minutes = minutes < 10 ? '0' + minutes : minutes;
      seconds = seconds < 10 ? '0' + seconds : seconds;
      
      // Hiển thị thời gian
      var timeString = hours + ':' + minutes + ':' + seconds;
      $('#current-time').text(timeString);
      
      // Cập nhật mỗi giây
      setTimeout(updateClock, 1000);
    }
    
    // Khởi chạy đồng hồ nếu phần tử tồn tại
    if ($('#current-time').length) {
      updateClock();
    }
  
    // Xử lý thông báo
    var notificationCount = $('.badge').text();
    
    // Hiệu ứng nhấp nháy nếu có thông báo mới
    if (parseInt(notificationCount) > 0) {
      setInterval(function() {
        $('.fa-bell').fadeOut(500).fadeIn(500);
      }, 2000);
    }
  });
  