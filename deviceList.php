<!DOCTYPE html>
<html>
<head>
<title>Device List</title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<!--Setup the chart-->
<script src="/Chart.bundle.js"></script>
<script src="/utils.js"></script>
<script src="/hammer.min.js"></script>
<script src="/chartjs-plugin-zoom.js"></script>

<style>
	canvas {
		-moz-user-select: none;
		-webkit-user-select: none;
		-ms-user-select: none;
	}
	
</style>

</head>
<body>
	<h2>Device Info Chart</h2>	
	
	<select id="deviceNameList" onchange="changeDeviceList()"></select>
	<select id="tagsList" onchange="changeTagsList()"></select>
	<button id="resetScale" onclick="resetScale()">RESET</button>
	
    <p>Current device: <?php echo $_GET["deviceName"]; ?><br></p>
	
	<canvas id="canvas"></canvas>
	
	<script src="deviceDataAction.js"></script>
	
</body>
</html>