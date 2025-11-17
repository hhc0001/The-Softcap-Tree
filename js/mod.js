let modInfo = {
	name: "The Softcap Tree",
	author: "hhc0001",
	pointsName: "点数",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0",
	name: "",
	pre: "1"
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0 Pre-Release 1</h3><br>
		- 加入了点数软上限 1<br>
		- 加入了 P 层与 3 个 PU<br>`

let winText = `游戏的终局...吗？`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints() {
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints() {
	return true // it is always true
}

function pSC1() {
	let point = new Decimal(1)
	if(hasUpgrade('P', 13)) point = point.mul(upgradeEffect('P', 13))
	return point
}

function pSC1Effect() {
	return player.points.sub(pSC1()).add(1).root(1.6)
}

function pSC2() {
	let point = new Decimal(20)
	return point
}

function pSC2Effect() {
	return player.points.sub(pSC2()).add(10).log10().pow(3)
}

// Calculate points/sec!
function getPointGen() {
	let gain = new Decimal(1)
  // Effects before Softcap
	if(hasUpgrade('P', 11)) gain = gain.mul(2)
	if(hasUpgrade('P', 12)) gain = gain.mul(upgradeEffect('P', 12))

	// Softcaps
	if(player.points.gte(pSC1())) gain = gain.dividedBy(pSC1Effect())
	if(player.points.gte(pSC2())) gain = gain.dividedBy(pSC2Effect())

	// Effects After Softcap
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	"作者曾经被里程碑之树的更新坑过一次，所以我要在这里放一个文字警示后人，不要以为 Endgame 了就可以不玩了"
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("10"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion) {
}