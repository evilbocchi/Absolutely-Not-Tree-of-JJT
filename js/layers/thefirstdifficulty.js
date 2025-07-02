export default createLayer({
    name: "The First Difficulty",
    startData() {
        return {
            unlocked: true,
        }
    },
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
        description: "Begins Skill gain.",
        cost: 0,
        currency: "points",
    })
    .addUpgrade({
        description: "1.5x Skill gain.",
        cost: 0.1,
        effect: () => 1.5,
        effectOperation: 'mul',
        currency: "points",
    })
    .addUpgrade({
        description: "2x Skill gain.",
        cost: 0.15,
        effect: () => 2,
        effectOperation: 'mul',
        currency: "points",
    })
    .addUpgrade({
        description: "1.1x Skill gain for every #CLN upgrade bought.",
        cost: 0.4,
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
        effectFormula: () => new Formula().mul(0.1).add(1),
        effectFormulaX: '#clnUpgs',
        effectOperation: 'mul',
        overrideDisplay: true
    })
    .addUpgrade({
        description: "Skill now boosts itself, with a cap at 1Ce Skill.",
        cost: 1,
        currency: "points",
        effectX: () => player.points,
        effectFormula: () => new Formula().add(1).log(15).pow(1.25).add(1),
        effectFormulaX: 'Skill',
        effectOperation: 'mul',
        overrideDisplay: true
    })
    .register()