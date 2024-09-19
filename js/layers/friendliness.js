createLayer({
    name: "Friendliness",
    symbol: "Friendliness",
    startData() { return {
        unlocked: true,
    }},
    color: "#fff",
    buttonStyle: {
        color: "rgb(0, 50, 0)"
    },
    image: "https://static.wikia.nocookie.net/jtohs-joke-towers/images/c/c8/FPnew.png",
})
.addUpgrade({
    description: "Boost Skill by tickspeed",
    effectFormula: () => new Formula().pow(0.2),
    effectX: () => player.tickspeed,
    effectFormulaX: "tickspeed",
    effectOperation: "mul",
    overrideDisplay: true,
    cost: 6.35e6,
    currency: "points",
})
.addUpgrade({
    description: "x4 Skill and x3 Cash gain",
    cost: 10.75e6,
    currency: "points",
    effects: [
        {
            effect: () => 4,
            effectOperation: 'mul',
        },
        {
            effect: () => 3,
            effectCurrency: "Cash",
            effectOperation: 'mul',
        },
    ]
    
})
.addUpgrade({
    description: "RT Playtime boosts tickspeed",
    cost: 40e6,
    effectX: () => new OmegaNum(player.timePlayed),
    effectFormula: () => new Formula().log(2).pow(0.65),
    effectFormulaX: "playtime",
    effectCurrency: "tickspeed",
    effectOperation: 'mul',
    overrideDisplay: true,
    currency: "points",
})
.addUpgrade({
    description: "x1.75 Cash gain",
    cost: 2000,
    currency: "Cash",
    effect: () => 1.75,
    effectOperation: 'mul',
    effectCurrency: "Cash"
})
.addUpgrade({
    description: "x2 Skill gain",
    cost: 100e6,
    currency: "points",
    effect: () => 2,
    effectOperation: 'mul',
})
.register()