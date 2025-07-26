let added = $ZERO
const $HALF = new OmegaNum(0.5)

export default createLayer({
    name: `Felix the ДА`,
    symbol: "felixthea",
    startData() { return {
        unlocked: true,
        points: $ZERO,
    }},
    color: "rgb(0, 255, 0)",
    buttonStyle: {
        color: "#ffffff",
        "text-shadow": "0 0 3px black, 0 0 5px black",
        "background-color": "rgb(0, 255, 0)",
    },
    image: "https://static.wikia.nocookie.net/jtohs-joke-towers/images/d/d1/Square_Felix_The_AA.png",
    resource: "ccps",
    update(diff) {
        added = added.add(diff)
        if (hasUpgrade("felixthea", 105)) {
            if (getBoost("ccps", $HALF, false).rec().lt(added)) {
                added = $ZERO
                tmp.trueease.clickables[107].onClick()
            }
        }

        if (hasUpgrade("felixthea", 104)) {
            const amt = getBuyableAmount("unimpossible", 109)
            const purchaseAmt = OmegaNum.affordGeometricSeries(player.points, 1e6, 1.4, amt)
            if (purchaseAmt.ispos()) {
                setBuyableAmount("unimpossible", 109, amt.add(purchaseAmt))
            }
        }
    }
})
.addUpgrade({
    description: "Do you like Cash? x1.5 Cash gain",
    cost: 4e6,
    currency: "Cash",
    effect: () => 1.5,
    effectCurrency: 'Cash',
    effectOperation: 'mul'
})
.addUpgrade({
    description: "Boost Cash by itself",
    cost: 25e12,
    currency: "points",

    effectX: () => player.cash.points,
    effectFormula: () => new Formula().pow(0.03),
    effectFormulaX: 'cash',
    effectCurrency: "Cash",
    effectOperation: 'mul',
    overrideDisplay: true,
})
.addUpgrade({
    description: "x2 Cube Clicks/click",
    cost: 8.75e6,
    currency: "Cash",
    effect: () => 2,
    effectOperation: 'mul',
    effectCurrency: "ccpc",
})
.addUpgrade({
    description: "Automate the Time Warping buyable",
    cost: 70e12,
    currency: "points",
})
.addUpgrade({
    description: "Start auto-clicking Cube at 0.5 CPS",
    cost: 150e12,
    currency: "points",
})
.addUpgrade({
    description: "Skill gain is now multiplied based on V1 Slamos incinerated. Also opens another Parkour Upgrade and now you can buy the Other Choice Upgrade.",
    cost: 5e15, // 5Qn approximation
    currency: "points",
    effect: () => 1.5, // Placeholder since V1 Slamos not implemented
    effectOperation: 'mul',
})
.addUpgrade({
    description: "Skill gain is now also boosted based upon the V2 Slamos incinerated.",
    cost: 2.75e16, // 27.5Qn approximation
    currency: "points",
    effect: () => 1.2, // Placeholder since V2 Slamos not implemented
    effectOperation: 'mul',
})
.addUpgrade({
    description: "Skill boosts itself.",
    cost: 6.5e16, // 65Qn approximation
    currency: "points",
    effectX: () => player.points,
    effectFormula: () => new Formula().pow(1/30),
    effectFormulaX: 'Skill',
    effectOperation: 'mul',
    overrideDisplay: true
})
.addUpgrade({
    description: "Cash boosts itself.",
    cost: 1e18, // 1Sx approximation
    currency: "points",
    effectX: () => player.cash.points,
    effectFormula: () => new Formula().pow(1/25),
    effectFormulaX: 'Cash',
    effectCurrency: 'Cash',
    effectOperation: 'mul',
    overrideDisplay: true
})
.addUpgrade({
    description: "ResetTime boosts itself.",
    cost: 3.25e18, // 3.25Sx approximation
    currency: "points",
    effectX: () => player.resetTime,
    effectFormula: () => new Formula().log(15).sqrt(),
    effectFormulaX: 'ResetTime',
    effectCurrency: 'resetTime',
    effectOperation: 'mul',
    overrideDisplay: true
})
.register()