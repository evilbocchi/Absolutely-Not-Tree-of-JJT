export default createLayer({
    name: "Unimpossible",
    branches: ["thelowergap"],
    startData() {
        return {
            unlocked: true,
        }
    },
    color: "rgb(100, 0, 150)",
    style: {
        color: "white",
    },
    buttonStyle: {
        color: "#ffffff",
        "background-color": "rgb(100, 0, 150)",
    },
    image: "https://static.wikia.nocookie.net/jtohs-joke-towers/images/5/5b/Unimpossible_New.png",
    tabFormat: [
        "upgrades",
        "buyables"
    ],
    buyables: {
        107: {
            title: "Better Income",
            description: "Increase Cash gain by 20% compounding per Quantity, and for every 10 Quantities, the compounding amount increases by 1%.",
            cost(x) {
                return new OmegaNum(20).mul(OmegaNum.pow(1.4, x.add($ONE)))
            },
            effect(x) {
                const boost = new OmegaNum(0.01).mul(x.add($ONE).div(10).floor())
                return new OmegaNum(1.2).add(boost).pow(x)
            },
            effectCurrency: "Cash",
            effectOperation: 'mul',
            overrideDisplay: true,
            currency: "Cash",
            style: {
                "background-image": "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.7)), url(https://storage.needpix.com/rsynced_images/money-29047_1280.png)",
                "background-size": 'contain',
                'background-repeat': 'no-repeat',
                "background-color": "rgb(10, 150, 0)",
                color: "white"
            },
            unlocked: () => hasUpgrade("unimpossible", 106),
            purchaseLimit: 150
        },
        108: {
            title: "Obby Grinding",
            description: "Increase Skill gain by 15% per Quantity, and for every 10 Quantities, doubles the effect.",
            cost(x) {
                return new OmegaNum(55).mul(OmegaNum.pow(1.5, x.add($ONE)))
            },
            effect(x) {
                const base = new OmegaNum(0.15).mul(x).mul(x.add($ONE).div(10).floor())
                return new OmegaNum(1).add(base)
            },
            effectOperation: 'mul',
            overrideDisplay: true,
            currency: "Cash",
            style: {
                "background-image": "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.7)), url(https://storage.needpix.com/rsynced_images/cube-35776_1280.png)",
                "background-size": '100%',
                "background-size": 'contain',
                'background-repeat': 'no-repeat',
                "background-color": "rgb(100, 50, 0)",
                color: "white"
            },
            unlocked: () => hasUpgrade("unimpossible", 106),
            purchaseLimit: 150
        },
    }
})
    .addUpgrade({
        description: "Multiplies Skill gain based on ResetTime, caps at 1Ce ResetTime.",
        cost: 50000,
        currency: "points",
        effectX: () => player.resetTime,
        effectFormula: () => new Formula().add(42).log(42),
        effectFormulaX: "ResetTime",
        effectOperation: 'mul',
        overrideDisplay: true,
    })
    .addUpgrade({
        description: "4x Skill gain, 2x Cash gain.",
        cost: 225000,
        currency: "points",
        effects: [
            {
                effect: () => 4,
                effectOperation: 'mul',
                effectCurrency: 'skill',
            },
            {
                effect: () => 2,
                effectOperation: 'mul',
                effectCurrency: 'Cash'
            }
        ]
    })
    .addUpgrade({
        description: "1.01x Skill gain. Overpowered.",
        cost: 1000000,
        currency: "points",
        effect: () => 1.01,
        effectOperation: 'mul',
    })
    .addUpgrade({
        description: "Multiplies Skill gain based on Total Playtime.",
        cost: 1500000,
        currency: "points",

    })
    .addUpgrade({
        description: "Subtracts 13 from the base of Unimpossible 1's logarithm.",
        cost: 5000000,
        currency: "points",
        formulaEdit: {
            layer: "unimpossible",
            upgrade: 101,
            callback: (formula) => {
                formula.operations[1].amount = formula.operations[1].amount.sub(13)
                return formula
            }
        },
    })
    .addUpgrade({
        description: "1.5x Tickspeed.",
        cost: 10000000,
        currency: "points",
        effect: () => 1.5,
        effectOperation: 'mul',
        effectCurrency: 'tickspeed',
    })
    .addUpgrade({
        description: "Unlocks Upgrade Board I.",
        cost: 25000000,
        currency: "points",
    })
    .addUpgrade({
        description: "Expand the tree.",
        cost: 300,
        currency: "Cash",
    })
    .register()