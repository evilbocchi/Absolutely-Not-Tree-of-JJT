export default createLayer({
    name: "Friendliness",
    startData() {
        return {
            unlocked: true,
        }
    },
    color: "#fff",
    buttonStyle: {
        color: "rgb(0, 50, 0)"
    },
    image: "https://static.wikia.nocookie.net/jtohs-joke-towers/images/c/c8/FPnew.png",
})
    .addUpgrade({
        description: "Multiplies Skill gain based on Tickspeed, also opens the path to the Slamo V1 Generator.",
        cost: 150e6,
        currency: "points",
        effectFormula: () => new Formula().pow(0.2),
        effectX: () => player.tickspeed,
        effectFormulaX: "tickspeed",
        effectCurrency: "Skill",
        effectOperation: "mul",
        overrideDisplay: true,
    })
    .addUpgrade({
        description: "x2 Skill gain.",
        cost: 200e6,
        currency: "points",
        effect: () => 2,
        effectOperation: 'mul',
    })
    .addUpgrade({
        description: "Tickspeed is increased by compounding 1.01x per Class Negative main upgrade you have. (#CLN).",
        cost: 350e6,
        currency: "points",
        effectX: () => {
            let upgradeCount = 0
            for (const diff of clnDiffs) {
                const len = player[diff]?.upgrades.length;
                if (len !== undefined)
                    upgradeCount += len
            }
            return new OmegaNum(1.01).pow(upgradeCount)
        },
        effectFormula: () => new Formula(),
        effectFormulaX: "#clnUpgs",
        effectCurrency: "tickspeed",
        effectOperation: 'mul',
        overrideDisplay: true,
    })
    .addUpgrade({
        description: "Multiplies Skill gain based on Cash, with a cap at 1Ce Cash.",
        cost: 525e6,
        currency: "Skill",
        effectFormula: () => new Formula().pow(0.04),
        effectX: () => player.cash.points,
        effectFormulaX: "cash",
        effectCurrency: "Skill",
        effectOperation: "mul",
        overrideDisplay: true,
    })
    .addUpgrade({
        description: "Subtracts 10 from the base of The Lower Gap 1's logarithm.",
        cost: 2.5e9,
        currency: "points",
        formulaEdit: {
            layer: "thelowergap",
            upgrade: 101,
            callback: (formula) => {
                formula.operations[1].amount = formula.operations[1].amount.sub(10)
                return formula
            }
        },
    })
    .addUpgrade({
        description: "2x Skill gain.",
        cost: 3e9,
        currency: "points",
        effect: () => 2,
        effectOperation: 'mul',
        effectCurrency: 'Skill',
    })
    .register()