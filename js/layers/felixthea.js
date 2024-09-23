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
.register()