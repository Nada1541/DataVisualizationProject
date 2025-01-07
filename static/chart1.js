function createEnrollmentTrendsChart() {
  fetch('/get-enrollment-trends')
      .then(response => response.json())
      .then(data => {
          renderEnrollmentTrendsChart(data);
      })
      .catch(error => console.error('Error:', error));
}

function renderEnrollmentTrendsChart(data) {
  am5.ready(function() {
      var root = am5.Root.new("enrollmentTrendsChart");

      root.setThemes([am5themes_Animated.new(root)]);
      var chart = root.container.children.push(am5xy.XYChart.new(root, {
          responsive: true
      }));

      var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
          categoryField: "Country",
          renderer: am5xy.AxisRendererX.new(root, {})
      }));

      var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
          renderer: am5xy.AxisRendererY.new(root, {})
      }));

      var series = chart.series.push(am5xy.LineSeries.new(root, {
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "Monthly Revenue",
          categoryXField: "Country"
      }));

      series.strokes.template.setAll({
          strokeWidth: 2
      });

      series.bullets.push(function() {
          return am5.Bullet.new(root, {
              sprite: am5.Circle.new(root, {
                  radius: 4,
                  fill: am5.color(0x0077ff)
              })
          });
      });

      xAxis.data.setAll(data);
      series.data.setAll(data);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  createEnrollmentTrendsChart();
});