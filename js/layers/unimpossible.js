createLayer({
    name: "Unimpossible",
    symbol: "Unimpossible",
    branches: ["negativity", "cash"],
    startData() { return {
        unlocked: true,
    }},
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
            description: "Increase Cash gain by 4% compounding. Every 10 amount increases the compounding amount by 1%.",
            cost(x) {
                return new OmegaNum(100).mul(OmegaNum.pow(1.4, x.add($ONE)))
            },
            effect(x) {
                const v = x.add($ONE)
                const boost = new OmegaNum(0.01).mul(v.div(10).floor())
                return new OmegaNum(1.04).add(boost).pow(v)
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
            description: "Increase Skill gain by 5% compounding. Every 10 amounts increases the compounding amount by 1%.",
            cost(x) {
                return new OmegaNum(100).mul(OmegaNum.pow(1.5, x.add($ONE)))
            },
            effect(x) {
                const v = x.add($ONE)
                const boost = new OmegaNum(0.01).mul(v.div(10).floor())
                return new OmegaNum(1.05).add(boost).pow(v)
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
        109: {
            title: "Time Warping",
            description: "Increase tickspeed by 10% additively.",
            cost(x) {
                return new OmegaNum(1e6).mul(OmegaNum.pow(1.4, x.add($ONE)))
            },
            effect(x) {
                return $ONE.add(new OmegaNum(0.1).mul(x.add($ONE)))
            },
            effectCurrency: 'tickspeed',
            effectOperation: 'mul',
            overrideDisplay: true,
            currency: "points",
            style: {
                "background-image": "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.7)), url(https://cdn.icon-icons.com/icons2/1465/PNG/512/633hourglassnotdone2_100213.png)",
                "background-size": 'contain',
                'background-repeat': 'no-repeat',
                "background-color": "rgb(10, 100, 200)",
                color: "white"
            },
            unlocked: () => hasUpgrade("unimpossible", 106),
            purchaseLimit: 150
        },
    }
})
.addUpgrade({
    description: "x2 Cash gain",
    cost: 115000,
    currency: "points",
    effect: () => 2,
    effectOperation: 'mul',
    effectCurrency: "Cash",
})
.addUpgrade({
    description: "Boost Skill gain by Cash",
    cost: 40,
    currency: "Cash",
    effectX: () => new OmegaNum(player.cash.points),
    effectFormula: () => new Formula().pow(0.15),
    effectFormulaX: "cash",
    effectOperation: 'mul',
    overrideDisplay: true,
})
.addUpgrade({
    description: "Boost Cash gain by Skill",
    cost: 350e3,
    effectX: () => new OmegaNum(player.points),
    effectFormula: () => new Formula().pow(0.05),
    effectFormulaX: "skill",
    effectCurrency: "Cash",
    effectOperation: 'mul',
    overrideDisplay: true,
    currency: "points",
})
.addUpgrade({
    description: "Make TLG 4's Skill-Skill boost better",
    formulaEdit: {
        layer: "tlg",
        upgrade: 104,
        callback: (formula) => {
            formula.operations[1].amount = formula.operations[1].amount.sub(13)
            return formula
        }
    },
    cost: 600e3,
    currency: "points",
})
.addUpgrade({
    description: "x1.5 Tickspeed and Cash",
    cost: 160,
    currency: "Cash",
    effects: [
        {
            effect: () => 1.5,
            effectOperation: 'mul',
            effectCurrency: 'Cash',
        },
        {
            effect: () => 1.5,
            effectOperation: 'mul',
            effectCurrency: 'tickspeed'
        }
    ]
})
.addUpgrade({
    description: "Unlock 3 new buyables",
    cost: 2e6,
    currency: "points",
})
.register()