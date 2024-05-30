let TRAILS_DATA, popUpWindow

// Trails mapping

window.onload = async function () {
	const response = await fetch('../data/trails.json')

	const json = await response.json()
	TRAILS_DATA = JSON.parse(json)

	popUpWindow = document.querySelector('.pop-up')

	if (popUpWindow) {
		popUpWindow.addEventListener('click', e => {
			if (e.target && e.target.className && e.target.className === 'pop-up') {
				popUpWindow.style.display = 'none'
			}
		})
	}

	if (TRAILS_DATA) {
		const trailsContainer = document.querySelector('.trails_container')

		if (trailsContainer) {
			TRAILS_DATA.forEach((trailObj, index) => {
				const div = document.createElement('div')

				div.className = `trail trail_${index + 1}`
				div.style.backgroundImage = `url('../img/trail_${index + 1}.jpg')`

				div.innerHTML = `
				<h3>${trailObj.name}</h3>
				<span class='desc'>${trailObj.desc}</span>
				`

				div.onclick = function () {
					if (!popUpWindow) {
						popUpWindow = document.querySelector('.pop-up')
					}

					if (popUpWindow) {
						popUpWindow.style.display = 'block'

						const content = popUpWindow.querySelector('.content')

						if (content) {
							content.innerHTML = `
							<img src='../img/trail_${index + 1}.jpg'/>
							<h2>${trailObj.name}</h2>
							<span>Województwo łódzkie</span>
							<p>${trailObj.about}</p>
							<iframe src="${
								trailObj.mapLink
							}" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
							`
						}
					}
				}

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
