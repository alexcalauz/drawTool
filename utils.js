
function getElementCoords(element) {
	var boundingClientRect = element.getBoundingClientRect();
	return {
		x: boundingClientRect.x,
		y: boundingClientRect.y,
	}
}

function getDistance(a, b) {
	return Math.sqrt(Math.sq(a[0] - b[0]) + Math.sq(a[1] - b[1]));
}

function getEqParams(start, end) {
	var yCoordDiff = end.y - start.y;
	var xCoordDiff = end.x - start.x;

	if(xCoordDiff != 0 && yCoordDiff != 0) {
		var m = (yCoordDiff) / (xCoordDiff);
		var n = start.y - (m * start.x);
	} else {
		if(yCoordDiff == 0) {
			var m = 'horizontal';
			var n = start.y;
		}
		if(xCoordDiff == 0) {
			var m = 'vertical';
			var n = start.x;
		}
	}
	return {
		slope: m,
		offset: n,
	}
}

function compensateAngleWidthLoss(slope) {
	//adds from 2 brush widths to a 45deg angle and nothing to a 90deg angle
	if(slope == 'vertical' || slope == 'horizontal') {
		return 0;
	}
	var angle = Math.atan(slope).toDeg();

	if(Math.abs(angle) > 45) {
		return (90 - Math.abs(angle)) * 2 / 45;
	}
	if(Math.abs(angle) <= 45) {
		return (Math.abs(angle)) * 2 / 45;
	}
}

function $(selector, nth) {
	if(nth != undefined) {
		selector += ':nth-of-type(' + parseInt(nth) + ')'
	}
	return document.querySelector(selector);
}

function $$(selector) {
	return document.querySelectorAll(selector);
}