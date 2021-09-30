// // mengambil total kemenangan
let kemenangan = document.getElementById("total-menang");
kemenangan.innerHTML = `Total kemenangan: ${localStorage.getItem("menang") ? localStorage.getItem("menang") : 0}`

// pilihan
let pilihan = [
	{
		tipe: "ganjil",
		nomor: [1, 3, 5, 7, 9]
	},
	{
		tipe: "genap",
		nomor: [2, 4, 6, 8, 10]
	}
]

let pilihan2 = [
	{
		tipe: "ganjil",
		nomor: [1, 3, 5]
	},
	{
		tipe: "genap",
		nomor: [2, 4]
	}
]

// player
let player = {
	kelereng: 10,
	target: 20
}

// robot
let robot = {
	kelereng: 10,
	target: 20,
	pilihan: () => {
		let a = pilihan2[Math.floor(Math.random() * pilihan2.length)];
		let pilihanRobot = a.nomor[Math.floor(Math.random() * a.nomor.length)];

		return {
			pilihan: pilihanRobot,
			tipe: a.tipe
		}
	}
}

function tebak() {
	// mengambil tebakan dan taruhan
	let input = document.getElementById("tebakan");
	let inputTaruhan = document.getElementById("taruhan")
	// tebakan
	let tebakan = input.value;
	let taruhan = inputTaruhan.value;

	if (!taruhan || taruhan == "") {
		alert("Masukan taruhan");
		return inputTaruhan.value = "";
	}
	if (!tebakan || tebakan == "") {
		alert("Masukan tebakan")
		return input.value = "";
	}

	if (taruhan > player.kelereng) {
		return alert("Kelereng mu tidak cukup")
	}

	if (!tebakan == "ganjil" || !tebakan == "genap") {
		input.value = ""
		return alert("Pilih salah satu, ganjil atau genap")
	}

	let pilihanRobot = robot.pilihan();

	if (tebakan == pilihanRobot.tipe) {
		player.kelereng += parseInt(taruhan);
		robot.kelereng -= parseInt(taruhan);

		updateStatus()

		if (robot.kelereng <= 0) {
			alert("Kamu menang!")
			localStorage.setItem("menang", localStorage.getItem("menang") + 1 || 1)
			return location.reload()
		}

		alert(`Kamu benar dan kamu mendapatkan ${taruhan}`)
	} else {
		player.kelereng -= parseInt(pilihanRobot.pilihan);
		robot.kelereng += parseInt(pilihanRobot.pilihan);
		
		updateStatus()

		if (player.kelereng <= 0) {
			alert("Kamu kalah!")
			return location.reload()
		}
		alert(`Kamu kalah dan robot mengambil ${pilihanRobot.pilihan} kelereng mu`)
	}
}

function updateStatus() {
	let statusPlayer = document.getElementById("status-kelereng");
	let statusRobot = document.getElementById("status-kelereng-robot");

	statusPlayer.innerHTML = `Kelereng mu: ${player.kelereng}`;
	statusRobot.innerHTML = `Kelereng robot: ${robot.kelereng}`;
}