let upgradesSortedPerLayer = new Array()

let layersPerId = new Map()
function getOperationSymbol(operation) {
    switch (operation) {
        case "add":
            return "+"
        case "sub":
            return "-"
        case "mul":
            return "x"
        case "div":
            return "/"
        case "pow":
            return "^"
        case "tetr":
            return "^^"
        case "pent":
            return "^^^"
    }
}

const HALF = new OmegaNum(0.5);
class Formula {

    operations = new Array();

    constructor() {
        
    }

    add(number) {
        this.operations.push({
            type: "add",
            amount: new OmegaNum(number)
        });
        return this;
    }

    sub(number) {
        this.operations.push({
            type: "sub",
            amount: new OmegaNum(number)
        });
        return this;
    }

    mul(number) {
        this.operations.push({
            type: "mul",
            amount: new OmegaNum(number)
        });
        return this;
    }

    div(number) {
        this.operations.push({
            type: "div",
            amount: new OmegaNum(number)
        });
        return this;
    }

    pow(number) {
        this.operations.push({
            type: "pow",
            amount: new OmegaNum(number)
        });
        return this;
    }

    sqrt() {
        this.operations.push({type: "sqrt"});
        return this;
    }

    log(number) {
        this.operations.push({
            type: "log",
            amount: new OmegaNum(number)
        });
        return this;
    }

    applyOnValue(number) {
        if (number === undefined)
            return undefined
        for (const operation of this.operations) {
            switch (operation.type) {
                case "add":
                    number = number.add(operation.amount);
                    break;
                case "sub":
                    number = number.sub(operation.amount);
                    break;
                case "mul":
                    number = number.mul(operation.amount);
                    break;
                case "div":
                    number = number.div(operation.amount);
                    break;
                case "pow":
                    number = number.pow(operation.amount);
                    break;
                case "sqrt":
                    number = number.pow(HALF);
                    break;
                case "log":
                    number = number.logBase(operation.amount) ?? def;
                    break;
            }
        }
        return number;
    }

    tostring(nameOfX) {
        let prevOperation = undefined
        for (const operation of this.operations) {
            switch (operation.type) {
                case "add":
                    nameOfX += " + " + operation.amount;
                    break;
                case "sub":
                    nameOfX += " - " + operation.amount;
                    break;
                case "mul":
                    nameOfX += " * " + operation.amount;
                    break;
                case "div":
                    nameOfX += " / " + operation.amount;
                    break;
                case "pow":
                    if (prevOperation === "add" || prevOperation === "sub" || prevOperation === "mul" || prevOperation === "div")
                        nameOfX = "(" + nameOfX + ")"
                    nameOfX += "<sup>" + operation.amount + "</sup> ";
                    break;
                case "sqrt":
                    nameOfX = "√(" + nameOfX + ")";
                    break;
                case "log":
                    nameOfX = "log<sub>" + operation.amount + "</sub>(" + nameOfX + ")";
                    break;
            }
            prevOperation = operation.type
        }
        return nameOfX;
    }
}

function editFormula(layerId, upgradeId, editCallback) {
    for (const upgrade of ALL_UPGRADES) {
        if (upgrade.layerId === layerId && upgrade.upgradeId === upgradeId) {
            const newFormula = editCallback(upgrade.effectFormula())
            upgrade.effectFormula = () => newFormula
            upgrade.refreshFormula(true)
            break;
        }
    }
}

const layersPerCurrency = new Map()
function createLayer(layer) {
    const layerId = layer.symbol.toLowerCase()
    const layerCount = sortedDiffs.indexOf(layerId) ?? layersPerId.size
    if (layerCount > 0 && layer.branches === undefined) {
        layer.branches = [sortedDiffs[layerCount - 1]]
    }
    if (layer.position === undefined)
        layer.position = layerCount
    if (layer.row === undefined)
        layer.row = layerCount
    const baseTooltip = layer.tooltip
    layer.tooltip = layer.tooltip === undefined ? layer.name : () => {
        return layer.name + "<br>" + baseTooltip()
    }
    layer.layerShown = () => {
        const branches = layer.branches
        if (branches === undefined)
            return true
        let allow = true
        for (const branch of branches) {
            allow = false
            const lastUpgrade = tmp[branch].lastUpgrade
            if (lastUpgrade !== undefined && hasUpgrade(branch, lastUpgrade.id))
                return branch.layerShown ?? true
        }
        return allow
    }
    layer.upgrades = {}
    if (layer.tabFormat === undefined)
        layer.tabFormat = ["upgrades"]
    if (layer.resource !== undefined) {
        layersPerCurrency.set(layer.resource, layerId)
    }
    let layerUpgrades = new Array()
    if (layer.buyables !== undefined) {
        for (const [buyId, buyable] of Object.entries(layer.buyables)) {
            if (buyable.style !== undefined && buyable.style["background-color"] === undefined)
                buyable.style["background-color"] = layer.color
            buyable.getCurrencyAmount = () => {
                if (buyable.currency !== undefined) {
                    const currencyLayer = layersPerCurrency.get(buyable.currency)
                    if (currencyLayer !== undefined) {
                        return player[currencyLayer].points
                    }
                }
                return player.points
            }
            buyable.pseudo = true
            buyable.canAfford = () =>  buyable.getCurrencyAmount().gte(buyable.cost(getBuyableAmount(layerId, buyId)))
            buyable.buy = () => {
                const amount = getBuyableAmount(layerId, buyId)
                setBuyableAmount(layerId, buyId, amount.add(1))
                if (buyable.currency !== undefined) {
                    const currencyLayer = layersPerCurrency.get(buyable.currency)
                    if (currencyLayer !== undefined) {
                        player[currencyLayer].points = player[currencyLayer].points.sub(buyable.cost(amount))
                        return
                    }
                }
                player.points = player.points.sub(buyable.cost())
            }
            if (buyable.effect !== undefined) {
                buyable.effectX = () => getBuyableAmount(layerId, buyId)
                layerUpgrades.push(buyable)
            }

            if (buyable.display === undefined) {
                buyable.display = () => {
                    const amount = getBuyableAmount(layerId, buyId)
                    let d = "<small>Amount: " + amount
                    if (buyable.purchaseLimit !== undefined && buyable.purchaseLimit < Infinity)
                        d += "/" + buyable.purchaseLimit
                    d += "</small><br>" + buyable.description + "<br>"
                    if (buyable.effectDisplayStatic !== undefined)
                        d += "Currently: " + buyable.effectDisplayStatic + "<br>"
                    
                    d += "<br>Cost: " + format(buyable.cost(amount)) + " " + (buyable.currency === "points" ? "Skill" : buyable.currency)
                    return d
                }
            }
        }
    }
    layersPerId.set(layerId, layer)

    let i = 0
    upgradesSortedPerLayer[layerCount] = layerUpgrades
    const obj = {
        layer: layer,

        addUpgrade(upg) {
            let id = ++i
            if (upg.title === undefined)
                upg.title = layer.name + " " + i
            if (upg.currency !== undefined) {
                upg.currencyDisplayName = upg.currency === "points" ? "Skill" : upg.currency
                upg.currencyInternalName = upg.currency
                upg.currencyLayer = layersPerCurrency.get(upg.currency)
                if (upg.currencyLayer !== undefined) {
                    upg.currencyInternalName = "points"
                }
            }
            if (upg.style === undefined)
                upg.style = layer.buttonStyle
            const upgId = 100 + id
            layer.upgrades[upgId] = upg
            const reg = (upg) => {
                if (upg.effectFormula !== undefined) {
                    const originalDesc =  upg.description
                    const refreshFormula = (actuallyRefresh) => {
                        if (actuallyRefresh !== true)
                            return
                        const formula = upg.effectFormula()
                        upg.effect = (x) => formula.applyOnValue(x)
                        upg.description = originalDesc + '<br><small class="formula">Formula: ' + formula.tostring(upg.effectFormulaX) + '</small>'
                        if (tmp[layerId] !== undefined)
                            tmp[layerId].upgrades[upgId].description = upg.description
                        const element = document.querySelector("#upgrade-" + layerId + "-" + upgId + " .description")
                        if (element !== null)
                            element.innerHTML = upg.description
                    }
                    refreshFormula(true)
                    upg.refreshFormula = refreshFormula
                }

                if (upg.overrideDisplay === true)
                    upg.effectDisplay = () => upg.effectDisplayStatic ?? "Locked!"

                upg.layerId = layerId
                upg.upgradeId = upgId

                layerUpgrades.push(upg)
            }
            if (upg.effectFormula !== undefined || (upg.effect !== undefined && upg.effectOperation !== undefined)) {
                reg(upg)
            }
            if (upg.effects !== undefined) {
                for (const effect of upg.effects)
                    reg(effect)
            }
            if (upg.formulaEdit !== undefined) {
                const callback = upg.formulaEdit.callback
                upg.formulaEdit.callback = undefined
                let edited = false
                const interval = setInterval(() => {
                    if (edited === false && player !== undefined && player[layerId].upgrades.includes(upgId)) {
                        editFormula(upg.formulaEdit.layer, upg.formulaEdit.upgrade, callback)
                        edited = true
                        clearInterval(interval)
                    }
                }, 50)
            }
            layer.lastUpgrade = upg
            return obj
        },

        register() {
            addLayer(layerId, layer)
            return obj
        }
    }
    return obj
}

function addCurrencyToHeader(currency, getter, base, color) {
    const amount = getter()
    if (amount === undefined || amount.lte($ZERO))
        return
    const token = "currency-" + currency
    let existingElements = document.getElementsByClassName(token)
    if (existingElements.length < 2) {
        existingElements = []
        const overlayHeads = document.getElementsByClassName("overlay-head")
        if (overlayHeads === null)
            return
    
        for (const overlayHead of overlayHeads) {
            if (overlayHead.getElementsByClassName(token).length > 0)
                continue
            const existingElement = document.createElement("div")
            existingElement.classList.add("overlayThing")
            existingElement.classList.add(token)

            const valueElement = document.createElement("h2")
            const incomeElement = document.createElement("span")
            valueElement.style.color = color
            existingElement.appendChild(valueElement)
            existingElement.appendChild(incomeElement)

            overlayHead.appendChild(existingElement)
            existingElements.push(existingElement)
        }
    }
    for (const existingElement of existingElements) {
        existingElement.firstElementChild.innerHTML = currency + ": " + format(amount) + "&nbsp;"
        existingElement.lastElementChild.innerHTML = "(" + format(getBoost(currency, base)) + "/sec)"
    }
}