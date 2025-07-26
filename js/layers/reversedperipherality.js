export default createLayer({
    name: "Reversed Peripherality",
    startData() { return {
        unlocked: true
    }},
    color: "#ffffff",
    buttonStyle: {
        color: "black",
        "background-color": "#ffffff",
    },
    image: "https://static.wikia.nocookie.net/jtohs-joke-towers/images/e/e6/Exist_Difficulty_Squared.png",
    update() {

    }
})
.addUpgrade({
    description: "7x Skill gain. (Extension: The First Difficulty)",
    cost: 1e16, // 10DTg approximation
    currency: "points",
    effect: () => 7,
    effectOperation: 'mul',
    style: {
        color: "black",
        "background-color": "#333"
    },
})
.addUpgrade({
    description: "Tickspeed is boosted based on Total Playtime. (Extension: The Lower Gap)",
    cost: 3.33e17, // 333TTg approximation
    currency: "points",
    effectX: () => new OmegaNum(player.timePlayed),
    effectFormula: () => new Formula().log(5).pow(1.25),
    effectFormulaX: 'TP',
    effectCurrency: 'tickspeed',
    effectOperation: 'mul',
    overrideDisplay: true,
    style: {
        color: "green"
    },
})
.addUpgrade({
    description: "+^0.5 to SK5's exponential. (Extension: Negativity)",
    cost: 5.5e20, // 550QnTg approximation
    currency: "points",
    formulaEdit: {
        layer: "thefirstdifficulty",
        upgrade: 5,
        callback: (formula) => {
            formula.operations[2].amount = formula.operations[2].amount.add(0.5)
            return formula
        }
    },
    style: {
        color: "purple"
    },
})
.addUpgrade({
    description: "+^0.01 Skill gain. (Extension: Unimpossible)",
    cost: 7.75e22, // 77.5SpTg approximation
    currency: "points",
    effect: () => 1.01,
    effectOperation: 'pow',
    style: {
        color: "violet"
    },
})
.addUpgrade({
    description: "+0.03 UP31's base. (Extension: Friendliness)",
    cost: 1.65e25, // 16.5NoTg approximation
    currency: "points",
    formulaEdit: {
        layer: "friendliness",
        upgrade: 3,
        callback: (formula) => {
            formula.operations[0].amount = formula.operations[0].amount.add(0.03);
            return formula;
        }
    },
    style: {
        color: "orange"
    },
})
.addUpgrade({
    description: "1000x current Skill. (Extension: True Ease)",
    cost: 1e29, // 100qg approximation
    currency: "points",
    onPurchase() {
        player.points = player.points.mul(1000)
    },
    style: {
        color: "white",
        "background-color": "lightblue"
    },
})
.addUpgrade({
    description: "5x Tickspeed. (Extension: A)",
    cost: 2.5e30, // 2.5Uqg approximation  
    currency: "points",
    effect: () => 5,
    effectCurrency: 'tickspeed',
    effectOperation: 'mul',
    style: {
        color: "red"
    },
})
.addUpgrade({
    description: "Skill is boosted by V3 Slamos. (Extension: Felix the ДA)",
    cost: 5e31, // 50Dqg approximation
    currency: "points",
    effect: () => 1.5, // Placeholder since V3 Slamos not implemented
    effectOperation: 'mul',
    style: {
        color: "yellow"
    },
})
.addUpgrade({
    description: "Give a Weak Speed Coil to all players. (Extension: Exist)",
    cost: 250000, // 250k V1 Slamos - placeholder cost in points
    currency: "points",
    effect: () => 1.1,
    effectCurrency: 'tickspeed',
    effectOperation: 'mul',
    style: {
        color: "cyan"
    },
})
.addUpgrade({
    description: "2x Tickspeed, Cash, Multiplier, +1k V1 and V2 Slamos, +100 MaxHp, Time Orb gives +15 seconds worth of its stats. (Extension: Reversed Peripherality)",
    cost: 1e35, // 100 DuoEon ResetTime approximation
    currency: "points",
    effects: [
        {
            effect: () => 2,
            effectCurrency: 'tickspeed',
            effectOperation: 'mul'
        },
        {
            effect: () => 2,
            effectCurrency: 'Cash',
            effectOperation: 'mul'
        }
    ],
    style: {
        color: "white",
        "background-color": "black"
    },
})
.register()