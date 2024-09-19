createLayer({
    name: "Negativity",
    symbol: "Negativity",
    startData() { return {
        unlocked: true,
    }},
    color: "rgb(200, 0, 227)",
    style: {
        color: "white",
    },
    buttonStyle: {
        color: "#ffffff",
        "background-color": "rgb(120, 0, 150)",
    },
    image: "https://static.wikia.nocookie.net/jtohs-joke-towers/images/9/90/Negativity.png",
})
.addUpgrade({
    description: "Make TFirD 4's Skill-Skill boost better",
    formulaEdit: {
        layer: "tfird",
        upgrade: 104,
        callback: (formula) => {
            formula.operations[1].amount = formula.operations[1].amount.sub(8)
            formula.operations[2].amount = formula.operations[2].amount.add(0.25)
            return formula
        }
    },
    cost: 2250,
    currency: "points",
})
.addUpgrade({
    description: "x1.75 Skill gain",
    cost: 4000,
    currency: "points",
    effect: () => 1.75,
    effectOperation: 'mul',
})
.addUpgrade({
    description: "RT Playtime boosts Skill gain",
    cost: 7000,
    effectX: () => new OmegaNum(player.timePlayed),
    effectFormula: () => new Formula().log(10).pow(2).div(2),
    effectFormulaX: "playtime",
    effectOperation: 'mul',
    overrideDisplay: true,
    currency: "points",
})
.addUpgrade({
    description: "x1.25 Tickspeed. Tickspeed increases the speed each in-game second takes per real second",
    cost: 21000,
    currency: "points",
    effect: () => 1.25,
    effectOperation: 'mul',
    effectCurrency: "tickspeed"
})
.addUpgrade({
    description: "x1.5 Tickspeed and Skill",
    cost: 60000,
    currency: "points",
    effects: [
        {
            effect: () => 1.5,
            effectOperation: 'mul',
        },
        {
            effect: () => 1.5,
            effectOperation: 'mul',
            effectCurrency: 'tickspeed'
        }
    ]
})
.register()