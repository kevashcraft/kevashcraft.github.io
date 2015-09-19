window.addEventListener('DOMContentLoaded', ready);
window.addEventListener('mousewheel', onWheel);
window.addEventListener('keydown', onKeyDown);
window.addEventListener('resize', onWindowResize);

window.addEventListener('touchstart', onTouch);
window.addEventListener('touchmove', onTouch);
window.addEventListener('touchend', onTouch);



function ready () {

	anchorsReset();

	sections = document.getElementsByTagName('section');

	// sectionPositionReset();
	var sectionHash = location.hash || '#Intro';
	var sectionIndex = sectionIndexGet(sectionHash);
	sectionMove(false, sectionIndex);


}
