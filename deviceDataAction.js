	//load data from json file
		var jsonData;
		var receiveData=[];
		var receiveDataLabel=[];
		var config = [];
		
		function loadData() {
		  var start = new Date().getTime();
		  var xhttp = new XMLHttpRequest();
		  xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
			  var ctx = document.getElementById('canvas').getContext('2d');			   
			  var deviceNo = 5;
			  var tagsNo = 1;
			  jsonData = JSON.parse(this.responseText); //Parse the txt to JSON object	
			  console.log(jsonData);
			  console.log(jsonData.DeviceList[deviceNo].Tags[tagsNo].TagDatas);
			  receiveData=[];      //Clear the buffer array
			  receiveDataLabel=[]; //Clear the buffer array
			  //Push data into buffer array from the json Data
			  for(i=0;i<jsonData.DeviceList[deviceNo].Tags[tagsNo].TagDatas.length;i++)
			  {
				  receiveData.push(jsonData.DeviceList[deviceNo].Tags[tagsNo].TagDatas[i].b);				  
				  receiveDataLabel.push(i.toString());
			  }
			  
			 //update to config variable
			  config = {
					type: 'line',
					data: {
						labels: receiveDataLabel, //Give an string array data for x-axis-label
						datasets: [{
							label: jsonData.DeviceList[deviceNo].DeviceName + "  " +jsonData.DeviceList[deviceNo].Tags[tagsNo].TagName,
							backgroundColor: window.chartColors.blue,
							borderColor: window.chartColors.blue,
							data: receiveData,//Give an array data for y-axis-value
							pointRadius: 0,
							fill: false,
							yAxisID: 'y-axis-1'
						}]
					},
					options: {
							responsive: true,
							hoverMode: 'index',							
							stacked: false,
							title: {
								display: true,
								text: 'Line Chart'
							},
							scales: {
								yAxes: [{
									type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
									display: true,
									position: 'left',
									id: 'y-axis-1',
								}, {
									type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
									display: true,
									position: 'right',
									id: 'y-axis-2',

									// grid line settings
									gridLines: {
										drawOnChartArea: false, // only want the grid lines for one axis to show up
									},
								}],
							},
							
							pan: {
								enabled: true,
								mode: 'xy'
							},
							zoom: {
								enabled: true,								
								mode: 'xy'								
							}
							
						}
					
				};
			  
			    window.myLine = new Chart(ctx, config);
			    //addDataset();			
				window.myLine.options.elements.line.tension = 0;
				window.myLine.update();
				loadSelectOption();
				  
				var end = new Date().getTime()
				console.log('milliseconds passed', end - start);
			}
		  };
		  xhttp.open("GET", "000013.txt", true);
		  xhttp.send();
		}
		
		
		
		var colorNames = Object.keys(window.chartColors);
		function addDataset(deviceNo,tagsNo) {
			//Remove original data
			config.data.datasets.pop();
			config.data.labels=[];
			//add data		
			receiveData=[];      //Clear the buffer array
			receiveDataLabel=[]; //Clear the buffer array
			//Push data into buffer array from the json Data
			for(i=0;i<jsonData.DeviceList[deviceNo].Tags[tagsNo].TagDatas.length;i++)
			{
				receiveData.push(jsonData.DeviceList[deviceNo].Tags[tagsNo].TagDatas[i].b);				  
				receiveDataLabel.push(i.toString());
			}
			var colorName = colorNames[config.data.datasets.length % colorNames.length];
			var newColor = window.chartColors.blue;//window.chartColors[colorName];
			var newDataset = {
				label: 'Data ' + config.data.datasets.length,
				backgroundColor: newColor,
				borderColor: newColor,
				//borderDash: [5, 5],
				data: receiveData,
				pointRadius: 0,
				fill: false,
				yAxisID: 'y-axis-1'
			};
			
			config.data.labels=receiveDataLabel;
			config.data.datasets.push(newDataset);
			window.myLine.update();
			
			//reset grid scale
			resetScale();
		}
		
		function loadSelectOption()
		{
			for(i=0;i<jsonData.DeviceList.length;i++)
			{
				var x = document.getElementById("deviceNameList");
				var c = document.createElement("option");
				c.text = jsonData.DeviceList[i].DeviceName;
				x.options.add(c, x.options.length);				
			}
			changeDeviceList();
		}
		
		function changeDeviceList()
		{
			var deviceList = document.getElementById("deviceNameList");
			var tagsList = document.getElementById("tagsList");
			
			while (tagsList.options.length) {
				tagsList.remove(0);
			}
			
			for (i = 0; i < jsonData.DeviceList[deviceList.selectedIndex].Tags.length; i++) {
				var tag = new Option(jsonData.DeviceList[deviceList.selectedIndex].Tags[i].TagName, i);
				tagsList.options.add(tag);
			}		
			
			addDataset(deviceList.selectedIndex,tagsList.selectedIndex);
		}
		
		function changeTagsList()
		{
			var deviceList = document.getElementById("deviceNameList");
			var tagsList = document.getElementById("tagsList");
			addDataset(deviceList.selectedIndex,tagsList.selectedIndex);
		}
		
		function resetScale()
		{
			window.myLine.resetZoom();
		}
		
		window.onload = function() {			
			loadData();				
		};
		