var app = (function()
{
	// Application object.
	var app = {};
	// Dictionary of beacons.
	var beacons = {};
	// Timer that displays list of beacons.
	var updateTimer = null;

	app.initialize = function()
	{
		document.addEventListener('deviceready', onDeviceReady, false);
	};

	function onDeviceReady()
	{
		startScan();
		updateTimer = setInterval(displayBeaconList, 100);
	}

	function startScan()
	{
		function onBeaconsRanged(beaconInfo)
		{
			for (var i in beaconInfo.beacons)
			{
				var beacon = beaconInfo.beacons[i];
				if (beacon.rssi < 0)
				{
					beacon.timeStamp = Date.now();
					var key = beacon.uuid + ':' + beacon.major + ':' + beacon.minor;
					beacons[key] = beacon;
				}
			}
		}

		function onError(errorMessage)
		{
			console.log('Ranging beacons did fail: ' + errorMessage);
		}

		estimote.beacons.requestAlwaysAuthorization();
		estimote.beacons.startRangingBeaconsInRegion({}, onBeaconsRanged, onError);
	}

	function displayBeaconList()
	{
		$.each(beacons, function(key, beacon) {

			if(beacon.distance < 0.05) {
					if(beacon.major == 8981 && beacon.minor == 49281) {
						$('body').css('background-color', 'green');
					} else if (beacon.major == 33613 && beacon.minor == 1285) {
						$('body').css('background-color', 'blue');
					} else if (beacon.major == 56449 && beacon.minor == 6595) {
						$('body').css('background-color', 'purple');
					} else if (beacon.major == 4851 && beacon.minor == 360) {
						$('body').css('background-color', '#00FF00');
					} else if (beacon.major == 23124 && beacon.minor == 41840) {
						$('body').css('background-color', '#3366FF');
					}


			// if(beacon.distance < 0.07) {
			// 		if(beacon.major == 8981 && beacon.minor == 49281) {
			// 			$('body').css('background-color', 'green');
			// 		} else if (beacon.major == 33613 && beacon.minor == 1285) {
			// 			$('body').css('background-color', 'blue');
			// 		} else if (beacon.major == 56449 && beacon.minor == 6595) {
			// 			$('body').css('background-color', 'purple');
			// 		} else if (beacon.major == 4851 && beacon.minor == 360) {
			// 			$('body').css('background-color', '#00FF00');
			// 		} else if (beacon.major == 23124 && beacon.minor == 41840) {
			// 			$('body').css('background-color', '#3366FF');
			// 		}
			};
		});
	}

	return app;
})();

app.initialize();
