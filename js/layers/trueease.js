createLayer({
    name: "True Ease",
    symbol: "TrueEase",
    startData() { return {
        unlocked: true,
    }},
    color: "#fff",
    image: "https://static.wikia.nocookie.net/jtohs-joke-towers/images/5/53/True_Ease_%28New%29.webp",
})
.addUpgrade({
    description: "Let's slow down a little now. x3 Skill gain but x0.75 tickspeed",
    cost: 225e6,
    currency: "points",
    style: {
        color: "red"
    },
    effects: [
        {
            effect: () => 3,
            effectOperation: 'mul'
        },
        {
            effect: () => 0.75,
            effectOperation: 'mul',
            effectCurrency: 'tickspeed'
        }
    ]
})
.addUpgrade({
    description: "Cash is boosted by Reset Time",
    cost: 840e6,
    currency: "points",
    effectX: () => player.resetTime,
    effectFormula: () => new Formula().pow(0.1).div(2).add(0.5),
    effectFormulaX: "reset",
    effectCurrency: 'Cash',
    effectOperation: 'mul',
    overrideDisplay: true,
    style: {
        color: "orange"
    },
})
.addUpgrade({
    description: "Without these grey strokes, this text would be painful to read. x2 Cash gain for understanding",
    cost: 16000,
    effect: () => 2,
    effectCurrency: "Cash",
    effectOperation: 'mul',
    currency: "Cash",
    style: {
        color: "yellow",
        'text-shadow': `1px 1px 2px black, 
        -1px -1px 2px black, 1px -1px 2px black, -1px 1px 2px black`
    },
})
.addUpgrade({
    description: "At least not as bad as yellow. x3 Skill gain if less than 100B Skill, otherwise x2.",
    cost: 3e9,
    currency: "points",
    effect: () => player.points.lt(100e9) ? 3 : 2,
    effectOperation: 'mul',
    style: {
        color: "lime",
    },
})
.addUpgrade({
    description: "Boost Skill gain by Cash again",
    cost: 9.5e9,
    currency: "points",
    effectX: () => new OmegaNum(player.cash.points),
    effectFormula: () => new Formula().pow(0.05),
    effectFormulaX: "cash",
    effectOperation: 'mul',
    overrideDisplay: true,
    style: {
        color: "blue"
    }
})
.register()