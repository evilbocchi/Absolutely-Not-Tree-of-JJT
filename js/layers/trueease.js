createLayer({
    name: "True Ease",
    symbol: "TrueEase",
    startData() { return {
        unlocked: true,
        points: $ZERO
    }},
    color: "#fff",
    image: "https://static.wikia.nocookie.net/jtohs-joke-towers/images/5/53/True_Ease_%28New%29.webp",
    tabFormat: [
        "upgrades",
        "blank",
        "clickables",
    ],
    resource: "Tommy Clicks",
    clickables: {
        107: {
            title: "TOMMY",
            canClick() {
                return this.unlocked()
            },
            display() {
                const clicks = player.trueease.points
                let d = "Click for some boosts!<br><br>Clicks: " + format(clicks)
                
                for (const effect of this.effects) {
                    effect.effectDisplayStatic = getOperationSymbol(effect.effectOperation) + format(effect.effect(effect.effectX()))
                    if (effect.effectAt !== undefined) {
                        const diff = effect.effectAt.sub(clicks)
                        if (diff.ispos()) {
                            d += "<br>(Click " + format(diff) + " more times to unlock this boost!)"
                            continue
                        }
                    }
                    d += "<br>" + effect.effectDisplayStatic + " " + (effect.effectCurrency ?? "Skill")
                }
                return d
            },
            onClick: () => {
                player.trueease.points = player.trueease.points.add($ONE)
            },
            style: {
                "background-color": "pink",
                "background-image": "url(/resources/tommy.png)",
                "width": "600px",
                "background-size": 'contain',
                'background-repeat': 'no-repeat',
            },
            effects: [
                {
                    effectX: () => new OmegaNum(player.trueease.points),
                    effectFormula: () => new Formula().add(1).log(2).pow(2).div(50).add(1),
                    effectFormulaX: "clicks",
                    effectOperation: 'mul',
                },
                {
                    effectX: () => new OmegaNum(player.trueease.points),
                    effectAt: new OmegaNum(500),
                    effectFormula: () => new Formula().sub(499).log(3).pow(2).div(50).add(1),
                    effectFormulaX: "clicks",
                    effectCurrency: "Cash",
                    effectOperation: 'mul',
                },
                {
                    effectX: () => new OmegaNum(player.trueease.points),
                    effectAt: new OmegaNum(1500),
                    effectFormula: () => new Formula().sub(1499).log(4).pow(2).div(50).add(1),
                    effectFormulaX: "clicks",
                    effectCurrency: "Tickspeed",
                    effectOperation: 'mul',
                },
            ],
            unlocked: () => hasUpgrade("trueease", 106),
        }
    }
})
.addUpgrade({
    description: "Let's slow down a little now. x3 Skill gain but x0.75 tickspeed",
    cost: 225e6,
    currency: "points",
    style: {
        color: "red"
    },
    effects: [
        {
            effect: () => 3,
            effectOperation: 'mul'
        },
        {
            effect: () => 0.75,
            effectOperation: 'mul',
            effectCurrency: 'tickspeed'
        }
    ]
})
.addUpgrade({
    description: "Cash is boosted by Reset Time",
    cost: 840e6,
    currency: "points",
    effectX: () => player.resetTime,
    effectFormula: () => new Formula().pow(0.1).div(2).add(0.5),
    effectFormulaX: "reset",
    effectCurrency: 'Cash',
    effectOperation: 'mul',
    overrideDisplay: true,
    style: {
        color: "orange"
    },
})
.addUpgrade({
    description: "Without these grey strokes, this text would be painful to read. x2 Cash gain for understanding",
    cost: 16000,
    effect: () => 2,
    effectCurrency: "Cash",
    effectOperation: 'mul',
    currency: "Cash",
    style: {
        color: "yellow",
        'text-shadow': `1px 1px 2px black, 
        -1px -1px 2px black, 1px -1px 2px black, -1px 1px 2px black`
    },
})
.addUpgrade({
    description: "At least not as bad as yellow. x3 Skill gain if less than 100B Skill, otherwise x2.",
    cost: 3e9,
    currency: "points",
    effect: () => player.points.lt(100e9) ? 3 : 2,
    effectOperation: 'mul',
    style: {
        color: "lime",
    },
})
.addUpgrade({
    description: "Boost Skill gain by Cash again",
    cost: 9.5e9,
    currency: "points",
    effectX: () => new OmegaNum(player.cash.points),
    effectFormula: () => new Formula().pow(0.05),
    effectFormulaX: "cash",
    effectOperation: 'mul',
    overrideDisplay: true,
    style: {
        color: "blue"
    }
})
.addUpgrade({
    description: "Spawn in TOMMY, the solution to all your monetary problems",
    cost: 20e9,
    currency: "points",
    style: {
        color: "magenta"
    }
})
.register()