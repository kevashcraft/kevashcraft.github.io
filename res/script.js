window.addEventListener('DOMContentLoaded', ready);
window.addEventListener('mousewheel', onWheel);
window.addEventListener('keydown', onKeyDown);
window.addEventListener('resize', onWindowResize)

function ready () {

	anchorsReset();

	sections = document.getElementsByTagName('section');

	// sectionPositionReset();
	var sectionHash = location.hash || '#Intro';
	var sectionIndex = sectionIndexGet(sectionHash);
	sectionMove(false, sectionIndex);


}
