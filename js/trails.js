const TRAILS_DATA = [
	{name: 'Szlak Bursztynowy', desc: 'Some desc'},
	{name: 'Szlak Grunwaldzki', desc: 'Some desc'},
	{name: 'Szlak Gorących Żródeł', desc: 'Some desc'},
	{name: 'Szlak Rowerowy w Centrum Polski', desc: 'Some desc'},
	{name: 'Łódzka Magistrala W-E', desc: 'Some desc'},
	{name: 'Łódzka Magistrala N-S', desc: 'Some desc'},
]

// Trails mapping

window.onload = function () {
	if (TRAILS_DATA) {
		const trailsContainer = document.querySelector('.trails_container')

		if (trailsContainer) {
			TRAILS_DATA.forEach((trailsObj, index) => {
				const div = document.createElement('div')

				div.className = `trail trail_${index + 1}`
				div.style.backgroundImage = `url('../img/trail_${index + 1}.jpg')`

				div.innerHTML = `
				<h3>${trailsObj.name}</h3>
				<span class='desc'>${trailsObj.desc}</span>
				`

				const rand = Math.floor(Math.random() * 45) + 5
				const rand2 = Math.floor(Math.random() * 359)
				let translate

				if (rand2 < 90) {
					translate = '0 -.75rem'
				} else if (rand2 >= 90 && rand2 < 180) {
					translate = '-.75rem 0'
				} else if (rand2 >= 180 && rand2 < 270) {
					translate = '0 .75rem'
				} else if (rand2 >= 270 && rand2 < 360) {
					translate = '.75rem 0'
				}

				const hover = `
				.trails_container .trail_${index + 1}:hover { 
					border-radius: ${rand}%; 
					filter: hue-rotate(${rand2}deg);
					translate: ${translate};
				}
				`
				const style = document.createElement('style')

				if (style.styleSheet) {
					style.styleSheet.cssText = hover
				} else {
					style.appendChild(document.createTextNode(hover))
				}

				document.getElementsByTagName('head')[0].appendChild(style)

				trailsContainer.appendChild(div)
			})
		}
	}
}
