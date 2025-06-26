window.addEventListener("DOMContentLoaded",() => {
	const clock = new BouncyBlockClock(".clock");
});

class BouncyBlockClock {
	constructor(qs) {
		this.el = document.querySelector(qs);
		this.time = { a: [], b: [] };
		this.rollClass = "clock__block--bounce";
		this.digitsTimeout = null;
		this.rollTimeout = null;
		this.mod = 0 * 60 * 1000;

		this.loop();
	}
	animateDigits() {
		const groups = this.el.querySelectorAll("[data-time-group]");

		Array.from(groups).forEach((group,i) => {
			const { a, b } = this.time;

			if (a[i] !== b[i]) group.classList.add(this.rollClass);
		});

		clearTimeout(this.rollTimeout);
		this.rollTimeout = setTimeout(this.removeAnimations.bind(this),900);
	}
	displayTime() {
		// screen reader time
		const timeDigits = [...this.time.b];
		const ap = timeDigits.pop();

		this.el.ariaLabel = `${timeDigits.join(":")} ${ap}`;

		// displayed time
		Object.keys(this.time).forEach(letter => {
			const letterEls = this.el.querySelectorAll(`[data-time="${letter}"]`);

			Array.from(letterEls).forEach((el,i) => {
				el.textContent = this.time[letter][i];
			});
		});
	}
	loop() {
		this.updateTime();
		this.displayTime();
		this.animateDigits();
		this.tick();
	}
	removeAnimations() {
		const groups = this.el.querySelectorAll("[data-time-group]");
	
		Array.from(groups).forEach(group => {
			group.classList.remove(this.rollClass);
		});
	}
	tick() {
		clearTimeout(this.digitsTimeout);
		this.digitsTimeout = setTimeout(this.loop.bind(this),1e3);	
	}
	updateTime() {
		const rawDate = new Date();
		const date = new Date(Math.ceil(rawDate.getTime() / 1e3) * 1e3 + this.mod);
		let h = date.getHours();
		const m = date.getMinutes();
		const s = date.getSeconds();
		const ap = h < 12 ? "AM" : "PM";

		if (h === 0) h = 12;
		if (h > 12) h -= 12;

		this.time.a = [...this.time.b];
		this.time.b = [
			(h < 10 ? `0${h}` : `${h}`),
			(m < 10 ? `0${m}` : `${m}`),
			(s < 10 ? `0${s}` : `${s}`),
			ap
		];

		if (!this.time.a.length) this.time.a = [...this.time.b];
	}
}

const buttons = document.querySelectorAll(".card-buttons button");
const sections = document.querySelectorAll(".card-section");
const card = document.querySelector(".card");

const handleButtonClick = (e) => {
  const targetSection = e.target.getAttribute("data-section");
  const section = document.querySelector(targetSection);
  targetSection !== "#about"
    ? card.classList.add("is-active")
    : card.classList.remove("is-active");
  card.setAttribute("data-state", targetSection);
  sections.forEach((s) => s.classList.remove("is-active"));
  buttons.forEach((b) => b.classList.remove("is-active"));
  e.target.classList.add("is-active");
  section.classList.add("is-active");
};

buttons.forEach((btn) => {
  btn.addEventListener("click", handleButtonClick);
});

function closePp() {
	document.getElementById("formCont").classList.remove("form-visible");
	setTimeout(() => {
    document.getElementById("formSh").style.display = "none";
}, 400);}

function myFunction(){
document.getElementById("formSh").style.display = "flex";
setTimeout(() => {
document.getElementById("formCont").classList.add("form-visible");}, 10);
}

function updateAOSBasedOnWidth() {
	const element = document.getElementById("bl1");
	const element2 = document.getElementById("bl2");
	if(window.innerWidth <= 400){
		element.setAttribute("data-aos","zoom-in");
		element2.setAttribute("data-aos","zoom-in");
	}

	AOS.refresh();
}

updateAOSBasedOnWidth();

window.addEventListener("resize",updateAOSBasedOnWidth);


function validateForm() {
	 e.preventDefault();
	 
	const nam = document.getElementById("nm").value.trim();
	const phon = document.getElementById("pN").value.trim();
	const loc = document.getElementById("loce").value.trim();

	const nameError = document.getElementById("nameErr");
	const phneError = document.getElementById("phoneErr");
	const locationError = document.getElementById("locationErr");

	let valid = true;
	nameError.textContent = "";
	phneError.textContent = "";
	locationError.textContent = "";	
	document.getElementById("pN").style.border = "2px solid green";
	document.getElementById("loce").style.border = "2px solid green";
	document.getElementById("nm").style.border = "2px solid green";
	document.getElementById("loader").style.display = "block";

	if (nam === "") {
		nameError.textContent = "Name is required.";
		valid = false;
	}

	if (phon === "") {
		phneError.textContent = "Phone number is required.";
		valid = false;
	}else if(!/^\d{10}$/.test(phon)) {
		phneError.textContent = "Enter a valid phone number (10 digits).";
		document.getElementById("pN").style.border = "2px solid red";
		document.getElementById("loader").style.display = "none";
		valid = false;
		
	}

	if (loc === "Select your Location") {
		locationError.textContent = "Select your location";
		document.getElementById("loce").style.border = "2px solid red";
		document.getElementById("loader").style.display = "none";
		valid = false;
	}

	if(valid) {
		document,getElementById("form").reset();
		
	}

	return false;
}
	