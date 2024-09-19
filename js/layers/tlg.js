createLayer({
    name: "The Lower Gap",
    symbol: "TLG",
    startData() { return {
        unlocked: true
    }},
    color: "rgb(0, 30, 0)",
    style: {
        color: "white",
    },
    buttonStyle: {
        color: "#ffffff",
        "background-color": "rgb(0, 30, 0)",
    },
    componentStyles: {
        "main-display": {
            color: "white"
        }
    },
    image: "https://static.wikia.nocookie.net/jtohs-joke-towers/images/4/47/TheLowerGapRemake.png",
    update(diff) {
        player.resetTime = player.resetTime.add(player.tickspeed.mul(diff).mul(getBoost("resetTime", $ONE)))
    }
})
.addUpgrade({
    description: "x1 Skill gain. This is an upgrade after TFirD 5",
    cost: 25,
    currency: "points",
})
.addUpgrade({
    description: "Skill gain is boosted by Reset Time, the time elapsed before a reset",
    cost: 40,
    currency: "points",
    effectX: () => player.resetTime,
    effectFormula: () => new Formula().add(5).pow(0.1).add(0.6),
    effectFormulaX: "reset",
    effectOperation: 'mul',
    overrideDisplay: true,
})
.addUpgrade({
    description: "Double your Skill gain",
    cost: 85,
    effect: () => 2,
    effectOperation: 'mul',
    currency: "points",
})
.addUpgrade({
    description: "Boost Skill gain by itself again",
    cost: 200,
    currency: "points",
    effectX: () => player.points,
    effectFormula: () => new Formula().add(100).log(25).sqrt(),
    effectFormulaX: "skill",
    effectOperation: 'mul',
    overrideDisplay: true
})
.addUpgrade({
    description: "x1.5 Skill gain",
    cost: 450,
    currency: "points",
    effect: () => 1.5,
    effectOperation: 'mul',
})
.addUpgrade({
    description: "Make TLG 2's Reset Time-Skill boost better",
    cost: 900,
    currency: "points",
    formulaEdit: {
        layer: "tlg",
        upgrade: 102,
        callback: (formula) => {
            formula.operations[1].amount = formula.operations[1].amount.add(0.1)
            return formula
        }
    },
})
.register()