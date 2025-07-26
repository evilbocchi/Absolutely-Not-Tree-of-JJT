export default createLayer({
    name: "Negativity",
    startData() {
        return {
            unlocked: true,
        }
    },
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
        description: "Increases the exponent of The First Difficulty 5 by .25.",
        cost: 4000,
        currency: "points",
        formulaEdit: {
            layer: "thefirstdifficulty",
            upgrade: 5,
            callback: (formula) => {
                formula.operations[2].amount = formula.operations[2].amount.add(0.25)
                return formula
            }
        },
    })
    .addUpgrade({
        description: "1.5x Skill gain.",
        cost: 5000,
        currency: "points",
        effect: () => 1.5,
        effectOperation: 'mul',
    })
    .addUpgrade({
        description: "Decreases the log of The First Difficulty 5 by 2.5.",
        cost: 8000,
        currency: "points",
        formulaEdit: {
            layer: "thefirstdifficulty",
            upgrade: 5,
            callback: (formula) => {
                formula.operations[1].amount = formula.operations[1].amount.sub(2.5)
                return formula
            }
        },
    })
    .addUpgrade({
        description: "2x Skill gain.",
        cost: 12500,
        currency: "points",
        effect: () => 2,
        effectOperation: 'mul',
    })
    .addUpgrade({
        description: "Extends a branch from UP17 and expands tree on Island 2.",
        cost: 30000,
        currency: "points",
        req: () => hasUpgrade("negativity", 12), // Requires UP17 to be bought
        effect: () => 1.125,
        effectOperation: 'mul',
    })
    .register()