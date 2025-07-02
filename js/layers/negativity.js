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
        description: "Increases the exponent of UP5 by .25.",
        cost: 4000,
        currency: "points",
        formulaEdit: {
            layer: "thefirstdifficulty",
            upgrade: 105,
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
        description: "Decreases the log of UP5 by 2.5.",
        cost: 8000,
        currency: "points",
        formulaEdit: {
            layer: "thefirstdifficulty",
            upgrade: 105,
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
        description: "Extend the tree.",
        cost: 30000,
        currency: "points"
    })
    .register()