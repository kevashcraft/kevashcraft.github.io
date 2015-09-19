var sections;

var sectionIndex = -1;
var sectionNextIndex = 0;

var sectionMovingInterval;
var sectionNextMovingInterval;


function anchorsReset () {
	var anchors = document.getElementsByTagName('a');
	var hrefIndex = location.href.length;
	for(var i = 0; i < anchors.length; i++) {
		var a = anchors[i];
		if(a.href.substr(hrefIndex,1) == '#') {
			var id = a.href.substr(hrefIndex + 1);
			a.onclick = function(e) {
				var hrefIndex = location.href.length;
				var id = this.href.substr(hrefIndex + 1);
				e.preventDefault();
				var sections = document.getElementsByTagName('section');
				for(var i = 0; i < sections.length; i++) {
					if(sections[i].id == id) {
						var sectionIndex = sectionIndexGet();
						sectionMove(i < sectionIndex, i);
					}
				}
			}
		}
	}
}

function sectionIndexGet (sectionHash) {

	if(sectionHash) {
		var id = sectionHash.substr(1);
		for (var i = 0; i < sections.length; i++) {
			if(sections[i].id == id) return i;
		};
	} else {
		return sectionIndex;
	}
}

// moves from current index to next index
function sectionMove (back, next) {

	// exit if actively moving
	if(sectionMovingInterval || sectionNextMovingInterval) return;

	// get section
	var section = sections[sectionIndex] || false;

	// find next section
	sectionNextIndex = next ? next : back ? sectionIndex - 1 : sectionIndex + 1;
	var sectionNext = sections[sectionNextIndex] || false;

	// set rate of change
	var delta = back ? 15 : -15;

	// reset offsets
	var sectionMovingOffset = 0;
	var sectionNextMovingOffset = 0;

	// move focused section
	sectionMovingInterval = section && sectionNext ? setInterval(function(){
		var top = parseInt(section.style.top);
		var margin = (window.innerHeight - section.offsetHeight) / 2;

		if( (back && top > window.innerHeight) ||
		 		(!back && top < -section.offsetHeight) ) {
			clearInterval(sectionMovingInterval);
			sectionMovingInterval = false;
			section.style.display = 'none';
			if(!sectionNextMovingInterval) sectionIndex = sectionNextIndex;
		} else {
			section.style.top = top + delta + 'px';
		}
	}, 15) : false;

	// set next section
	if(sectionNext) {
		var margin = (window.innerHeight - sectionNext.offsetHeight) / 2;
		sectionNext.style.display = 'block';
		sectionNext.style.top = (back ? -(sectionNext.offsetHeight) : window.innerHeight) + 'px';
		sectionNext.style.left =  ((window.innerWidth - sectionNext.offsetWidth) / 2) + 'px';
	}

	// move next section
	sectionNextMovingInterval = sectionNext ? setInterval(function(){
		var top = parseInt(sectionNext.style.top);
		var middle = parseInt((window.innerHeight - sectionNext.offsetHeight) / 2);
		if( (!back && top <= middle) || (back && top >= middle) ) {
			clearInterval(sectionNextMovingInterval);
			sectionNextMovingInterval = false;
			if(!sectionMovingInterval) sectionIndex = sectionNextIndex;
		} else {
			sectionNext.style.top = top + delta + 'px';
		}
	}, 15) : false;
}

function sectionPositionReset () {
	sections[sectionIndex].style.left =  ((window.innerWidth - sections[sectionIndex].offsetWidth) / 2) + 'px';
	sections[sectionIndex].style.top =  ( (window.innerHeight - sections[sectionIndex].offsetHeight) / 2 ) + 'px';
}


function onKeyDown (e) {
	var e = window.event || e; // old IE support
	if (e.keyCode == 40) sectionMove();
	if (e.keyCode == 38) sectionMove(true);
}

function onWindowResize () {
	sectionPositionReset();
}

var scrolling = false;
function onWheel (e) {
	var e = window.event || e; // old IE support
	var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
	if(scrolling == delta) {
		var back = delta < 0 ? false : true;		
		sectionMove(back);
	} else {
		scrolling = delta;
		setTimeout(function(){
			scrolling = false;
		}, 150);
	}

}