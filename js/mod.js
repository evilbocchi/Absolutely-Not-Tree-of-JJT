let modInfo = {
	name: "tree of jjt",
	id: "tojjt",
	author: "evilbocchi",
	pointsName: "Skill",
    modFiles: [],
    
	discordName: "",
	discordLink: "",
	initialStartPoints: new OmegaNum(0), // Used for hard resets and new players
	
	offlineLimit: 6,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.0",
	name: "",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.0</h3><br>
		- Added things.<br>
		- Added stuff.`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

const difficulties = {
    [-2]: ["thefirstdifficulty", "thelowergap", "negativity", "cash", "unimpossible", "friendliness", "trueease", "a", "felixthea", "exist", "slamo"],
    [-1]: []
}
const clnDiffs = [...difficulties[-2], ...difficulties[-1]]

const sortedDiffs = []
for (const [_, diffList] of Object.entries(difficulties))
    for (const difficulty of diffList) {
        sortedDiffs.push(difficulty)
        modInfo.modFiles.push("layers/" + difficulty + ".js")
    }
        

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new OmegaNum(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return hasUpgrade('thefirstdifficulty', 101)
}

// Calculate points/sec!
setTimeout(() => {
    player.devSpeed = 1
}, 500);
const base = new OmegaNum(0.01);
function getPointGen() {
	if(!canGenPoints())
		return $ZERO
	return getBoost(undefined, base)
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
    tickspeed: $ONE,
    resetTime: $ZERO,
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return false
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
function fixOldSave(oldVersion){
}

const ALL_UPGRADES = new Array()
const POINT_UPGRADES = new Array()
const UPPGRADES_PER_CURRENCY = new Map()
async function loadLayers() {
    for (const file of modInfo.modFiles) {
        try {
           await import("./" + file)
        } catch (error) {
            console.log(error)
        }
    }
    
    for (const sortedUpgrades of upgradesSortedPerLayer) {
        if (sortedUpgrades === undefined)
            continue
        for (const upgrade of sortedUpgrades) {
            if (upgrade.effectCurrency === undefined) {
               POINT_UPGRADES.push(upgrade) 
            }
            else {
                const lower = upgrade.effectCurrency.toLowerCase()
                let current = UPPGRADES_PER_CURRENCY.get(lower)
                if (current === undefined)
                    current = [upgrade]
                else
                    current.push(upgrade)
                UPPGRADES_PER_CURRENCY.set(lower, current)
            }
                
            ALL_UPGRADES.push(upgrade)
        }
    }
}

/**
 * Get the boost on a currency based on the upgrades that affect it.
 * 
 * @param {string} currency The currency to get the boost for, or undefined for points 
 * @param {OmegaNum} base The base value to apply the upgrades to.
 * @param {boolean?} affectedByTickSpeed If the boost should be affected by tick speed. Defaults to true if not specified. 
 * @returns 
 */
function getBoost(currency, base, affectedByTickSpeed) {
    const upgrades = currency === undefined ? POINT_UPGRADES : UPPGRADES_PER_CURRENCY.get(currency.toLowerCase())
    if (upgrades === undefined)
        return base
    for (const upgrade of upgrades) {
        const x = upgrade.effectX ? upgrade.effectX() : undefined
        if (upgrade.effectAt !== undefined && upgrade.effectAt.gt(x))
            continue
        const calculated = upgrade.effect(x)
        if (upgrade.overrideDisplay === true) {
            upgrade.effectDisplayStatic = getOperationSymbol(upgrade.effectOperation) + format(calculated)
        }

        if ((upgrade.pseudo === true || hasUpgrade(upgrade.layerId, upgrade.upgradeId)) && !$ZERO.eq(calculated)) {
            base = base[upgrade.effectOperation](calculated)
        }
    }

    // Apply Slamo milestone effects
    if (typeof hasMilestone !== 'undefined') {
        // Milestone 1: 25 Slamos incinerated - 1.5x skill
        if (currency === undefined && hasMilestone("slamo", 1)) {
            base = base.mul(1.5)
        }
        
        // Milestone 2: 75 Slamos incinerated - 1.5x cash
        if (currency === "cash" && hasMilestone("slamo", 2)) {
            base = base.mul(1.5)
        }
        
        // Milestone 3: 200 Slamos incinerated - 1.5x tickspeed
        if (currency === "tickspeed" && hasMilestone("slamo", 3)) {
            base = base.mul(1.5)
        }
    }

    if (currency !== "tickspeed" && affectedByTickSpeed !== false)
        base = base.mul(player.tickspeed)
	return base
}

loadLayers()