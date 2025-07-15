export default createLayer({
    name: "The Lower Gap",
    startData () {
        return {
            unlocked: true
        };
    },
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
    update (diff) {
        player.resetTime = player.resetTime.add(player.tickspeed.mul(diff).mul(getBoost("resetTime", $ONE)));
    }
})
    .addUpgrade({
        description: "Skill gain is multiplied based on ResetTime, with a cap at 1Ce Skill.",
        cost: 1.25,
        currency: "points",
        effectX: () => player.resetTime,
        effectFormula: () => new Formula().add(20).log(20),
        effectFormulaX: "ResetTime",
        effectOperation: 'mul',
        overrideDisplay: true,
    })
    .addUpgrade({
        description: "2x Skill gain.",
        cost: 3.75,
        effect: () => 2,
        effectOperation: 'mul',
        currency: "points",
    })
    .addUpgrade({
        description: "Subtracts 5 from the base of The First Difficulty 5's log.",
        cost: 8,
        currency: "points",
        formulaEdit: {
            layer: "thefirstdifficulty",
            upgrade: 5,
            callback: (formula) => {
                formula.operations[1].amount = formula.operations[1].amount.sub(5);
                return formula;
            }
        },
    })
    .addUpgrade({
        description: "Skill gain is now multiplied based on Total Playtime.",
        cost: 12.5,
        currency: "points",
        effectX: () => new OmegaNum(player.timePlayed),
        effectFormula: () => new Formula().add(15).log(15),
        effectFormulaX: "TP",
        effectOperation: 'mul',
        overrideDisplay: true,
    })
    .addUpgrade({
        description: "Increases the base of The First Difficulty 4's boost by 0.025",
        cost: 30,
        currency: "points",
        formulaEdit: {
            layer: "thefirstdifficulty",
            upgrade: 4,
            callback: (formula) => {
                formula.operations[0].amount = formula.operations[0].amount.add(0.025);
                return formula;
            }
        },
    })
    .addUpgrade({
        description: "1.75x Skill gain.",
        cost: 80,
        currency: "points",
        effect: () => 1.75,
        effectOperation: 'mul',
    })
    .addUpgrade({
        description: "1.25x Tickspeed.",
        cost: 175,
        currency: "points",
        effect: () => 1.25,
        effectOperation: 'mul',
        effectCurrency: 'tickspeed',
    })
    .addUpgrade({
        description: "Skill boosts itself again by Skill, with a cap at 1Ce Skill.",
        cost: 240,
        currency: "points",
        effectX: () => player.points,
        effectFormula: () => new Formula().log(23).sqrt(),
        effectFormulaX: 'Skill',
        effectOperation: 'mul',
        overrideDisplay: true
    })
    .addUpgrade({
        description: "1.5x Tickspeed.",
        cost: 500,
        currency: "points",
        effect: () => 1.5,
        effectOperation: 'mul',
        effectCurrency: 'tickspeed',
    })
    .addUpgrade({
        description: "Expand the tree.",
        cost: 1000,
        currency: "points",
        effect: () => 1,
        effectOperation: 'mul',
        effectCurrency: 'tickspeed'
    })
    .register();