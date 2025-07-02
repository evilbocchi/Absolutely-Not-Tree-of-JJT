export default createLayer({
    name: "Unimpossible",
    branches: ["thelowergap"],
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
                const boost = new OmegaNum(0.01).mul(x.add($ONE).div(10).floor())
                return new OmegaNum(1.04).add(boost).pow(x)
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
                const boost = new OmegaNum(0.01).mul(x.add($ONE).div(10).floor())
                return new OmegaNum(1.05).add(boost).pow(x)
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
                return $ONE.add(new OmegaNum(0.1).mul(x))
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