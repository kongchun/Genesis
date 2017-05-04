$(function() {


$('#myTabs a').click(function (e) {
  e.preventDefault()
  $(this).tab('show')
})


	chart1();
	chart2();
})

function chart1() {
	var myChart = echarts.init(document.getElementById('chart1'));
	//myChart.setTheme("macarons")
	option = {
		tooltip: {
			trigger: 'axis'
		},
		legend: {
			data: ['访问数']
		},
		calculable: true,
		xAxis: [{
			type: 'category',
			boundaryGap: false,
			data: ['8.27', '8.30', '9.2', '9.5', '9.8', '9.11', '9.15']
		}],
		yAxis: [{
			type: 'value'
		}],
		series: [{
				name: '访问数',
				type: 'line',
				stack: '总量',
				data: [120, 132, 101, 134, 90, 230, 210]
			}

		]
	};

	myChart.setOption(option);
}


function chart2() {
	var myChart = echarts.init(document.getElementById('chart2'));
	//myChart.setTheme("macarons")
	option = {
		tooltip: {
			trigger: 'axis'
		},
		legend: {
			data: ['下载数']
		},
		calculable: true,
		xAxis: [{
			type: 'category',
			boundaryGap: false,
			data: ['8.27', '8.30', '9.2', '9.5', '9.8', '9.11', '9.15']
		}],
		yAxis: [{
			type: 'value'
		}],
		series: [{
				name: '下载数',
				type: 'line',
				stack: '总量',
				data: [80, 92, 71, 94, 70, 130, 110]
			}

		]
	};

	myChart.setOption(option);
}