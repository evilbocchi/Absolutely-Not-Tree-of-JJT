createLayer({
    name: "The First Difficulty",
    symbol: "TFirD",
    startData() { return {
        unlocked: true,
    }},
    color: "rgb(25, 25, 25)",
    style: {
        color: "white",
    },
    buttonStyle: {
        color: "#ffffff",
        "background-color": "rgb(25, 25, 25)",
    },
    image: "https://static.wikia.nocookie.net/jtohs-joke-towers/images/5/51/Tfird.png",
    update() {
        player.tickspeed = getBoost("tickspeed", $ONE)
    }
})
.addUpgrade({
    description: "Start producing Skill",
    cost: 0,
    currency: "points",
})
.addUpgrade({
    description: "Double your Skill gain",
    cost: 1,
    effect: () => 2,
    effectOperation: 'mul',
    currency: "points",
})
.addUpgrade({
    description: "Triple your Skill gain",
    cost: 2,
    effect: () => 3,
    effectOperation: 'mul',
    currency: "points",
})
.addUpgrade({
    description: "Skill boosts itself by its amount",
    cost: 5,
    currency: "points",
    effectX: () => player.points,
    effectFormula: () => new Formula().add(5).log(25).pow(1.5).add(1),
    effectFormulaX: 'skill',
    effectOperation: 'mul',
    overrideDisplay: true
})
.addUpgrade({
    description: "Boost Skill gain based on how many Class Negative upgrades you own",
    cost: 10,
    currency: "points",
    effectX: () => {
        let upgradeCount = 0
        for (const diff of clnDiffs) {
            const len = player[diff]?.upgrades.length;
            if (len !== undefined)
                upgradeCount += len
        }
        return new OmegaNum(upgradeCount)
    },
    effectFormula: () => new Formula().add(1).log(5).pow(2).add(1),
    effectFormulaX: '#clnUpgs',
    effectOperation: 'mul',
    overrideDisplay: true
})
.register()