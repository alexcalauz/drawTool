Math.sq = function(e) {
	return this.pow(e, 2);
}

Number.prototype.toDeg = function() {
	return this * (180 / Math.PI);
}

Number.prototype.toRad = function() {
	return this * (Math.PI / 180);
}

Number.prototype.between = function(a, b) {
	var min = Math.min.apply(Math, [a, b]),
			max = Math.max.apply(Math, [a, b]);
	return this > min && this < max;
};

HTMLElement.prototype.getTop = function() {
	return parseFloat(this.style.top.replace('px', '')).toFixed(2) * 1;
}

HTMLElement.prototype.getLeft = function() {
	return parseFloat(this.style.left.replace('px', '')).toFixed(2) * 1;
}

HTMLElement.prototype.isChildOf = function(parent) {
	return parent.contains(this);
}



HTMLElement.prototype.moveUp = function() {
	if(!this.previousElementSibling && this.parentElement.classList.contains('is-child-locked')) {
		return;
	}
	if(this.previousElementSibling) {
		this.previousElementSibling.parentNode.insertBefore(this, this.previousElementSibling);
	} else {
		this.parentElement.parentElement.insertBefore(this, this.parentElement);
	}
}

HTMLElement.prototype.moveDown = function() {
	if(!this.nextElementSibling && this.parentElement.classList.contains('is-child-locked')) {
		return;
	}
	if(this.nextElementSibling) {
		this.nextElementSibling.parentNode.insertBefore(this, this.nextElementSibling.nextElementSibling);
	} else {
		this.parentElement.parentElement.insertBefore(this, this.parentElement.nextSibling);
	}
}

HTMLElement.prototype.prependToNext = function() {
	if(!this.nextElementSibling) {
		return;
	}
	this.nextElementSibling.prepend(this);
}

HTMLElement.prototype.appendToPrev = function() {
	if(!this.previousElementSibling) {
		return;
	}
	this.previousElementSibling.append(this);
}

HTMLElement.prototype.insert = function(tagName, className, innerHTML, events) {
	innerHTML = innerHTML || false;
	className = className || false;
	events = events || false;
	var element = document.createElement(tagName);
	if(className) {
		element.setAttribute('class', className);
	}
	if(innerHTML) {
		element.innerHTML = innerHTML;
		element.setAttribute('data-layer-name', innerHTML)
	}
	this.appendChild(element);
	if(events) {
		for(let i in events) {
			element.addEventListener(i, events[i]);
		}
	}
	return element;
}


HTMLCollection.prototype.forEach = function(callback) {
	for(let i in this) {
		if(this[i].tagName == undefined) {
			continue;
		}
		callback(this[i]);
	}
}

HTMLElement.prototype.empty = function() {
	this.innerHTML = '';
}


HTMLElement.prototype.wrap = function() {
	if(this.parentElement.classList.contains('wrapper')) {
		return;
	}
	var element = document.createElement('div');
	element.classList.add('wrapper');
	var rect = this.getBoundingClientRect();
	element.style.left = this.style.left;
	element.style.top = (this.style.top.replace('px', '') * 1) + 'px';
	element.style.width = rect.width + 'px';
	element.style.height = rect.height + 'px';
	this.parentElement.insertBefore(element, this);
	this.style.top = '0px';
	this.style.left = '0px';
	element.appendChild(this);
}

HTMLElement.prototype.unwrap = function() {
	if(!this.parentElement.classList.contains('wrapper')) {
		return;
	}
	var parent = this.parentElement.parentElement;
	var rect = this.parentElement.getBoundingClientRect();
	this.style.top = rect.y - (100 / getZoom()) + 'px';
	this.style.left = rect.x + 'px';
	parent.insertBefore(this, parent.querySelector('.wrapper'));
	parent.querySelector('.wrapper').remove();
}

HTMLElement.prototype.drg = function(callback) {
	callback = callback || function() {};
	var x,y;
	this.classList.add('draggable');
	this.onmousedown = function(e) {
		console.log('start');
		x = e.pageX;
		y = e.pageY;
		posX = this.style.left.replace('px', '') * 1;
		posY = this.style.top.replace('px', '') * 1;
		activeElement = this;
	}
	var self = this;
	this.onmouseup = function(e) {
		window.setTimeout(function(){
			activeElement = null;
		}, 0);
		console.log('end');
	}
	this.mouseMove = function(e) {
		console.log('drag');
		activeElement.style.top = e.pageY - y + posY + 'px';
		activeElement.style.left = e.pageX - x + posX + 'px';
		callback(e);
	}
}

window.onmousemove = function(e) {
	if(typeof(activeElement) == 'undefined') {
		return;
	}
	if(activeElement) {
		activeElement.mouseMove(e);
	}
}
		
Number.prototype.toHex = function() {
	return this.toString(16);
}

String.prototype.toNumber = function () {
	return !isNaN(this * 1) ? this * 1 : 0;
}