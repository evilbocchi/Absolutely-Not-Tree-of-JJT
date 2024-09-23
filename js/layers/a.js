export default createLayer({
    name: "A",
    startData() { return {
        unlocked: true,
    }},
    color: "rgb(255, 0, 0)",
    style: {
        color: "white",
    },
    buttonStyle: {
        color: "#ffffff",
        "background-color": "rgb(255, 0, 0)",
    },
    image: "https://static.wikia.nocookie.net/jtohs-joke-towers/images/e/eb/Screenshot_2020-10-06_at_11.58.11_AM.png",
    update() {
        player.ccpc = getBoost("ccpc", $ONE, false)
    }
})
.addUpgrade({
    description: "x2 Cube Clicks/click",
    cost: 500e9,
    currency: "points",
    effect: () => 2,
    effectCurrency: 'ccpc',
    effectOperation: 'mul'
})
.addUpgrade({
    description: "x2 Skill. Buying this locks A 3",
    cost: 1e12,
    unlocked: () => !hasUpgrade("a", 103),
    effect: () => 2,
    effectOperation: 'mul',
    currency: "points",
})
.addUpgrade({
    description: "x2 Cash. Buying this locks A 2",
    cost: 1e6,
    currency: "Cash",
    unlocked: () => !hasUpgrade("a", 102),
    effect: () => 2,
    effectOperation: 'mul',
    effectCurrency: "Cash",
})
.addUpgrade({
    description: "x1.4 Tickspeed",
    cost: 4.25e12,
    currency: "points",
    effect: () => 1.4,
    effectOperation: 'mul',
    effectCurrency: 'tickspeed'
})
.addUpgrade({
    description: "Boost Tickspeed by Reset Time",
    cost: 10.1e12,
    currency: "points",
    effectX: () => player.tickspeed,
    effectFormula: () => new Formula().pow(0.1).add($ONE),
    effectFormulaX: 'resetTime',
    effectOperation: 'mul',
    overrideDisplay: true
})
.register()