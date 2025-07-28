export default createLayer({
    name: "Slamo Incinerator V1",
    id: "slamo",
    startData() { return {
        unlocked: false,
        points: new OmegaNum(0), // V1 Slamos earned
        incinerated: new OmegaNum(0), // Total V1 Slamos incinerated
        incinerating: false, // Whether currently incinerating
        animationTime: 3000, // 3 seconds for animation
        lastIncinerationTime: 0,
    }},
    color: "#8B4513", // Brown color for incinerator
    resource: "V1 Slamos",
    row: 2,
    branches: ["friendliness"],
    type: "none",
    requires: new OmegaNum(0), // No requirements since it's unlocked via friendliness upgrade

    
    style: {
        color: "white",
    },
    buttonStyle: {
        color: "#ffffff",
        "background-color": "#8B4513",
    },
    
    tabFormat: [
        "main-display",
        "blank",
        ["display-text", function() {
            return `You have incinerated ${format(player.slamo.incinerated)} V1 Slamos total.`
        }],
        "blank",
        ["clickable", "incinerator"],
        "blank",
        "milestones",
        "blank",
        ["display-text", function() {
            if (player.slamo.incinerating) {
                const elapsed = Date.now() - player.slamo.lastIncinerationTime
                const remaining = Math.max(0, player.slamo.animationTime - elapsed)
                return `<div style="color: orange;">Incineration in progress... ${Math.ceil(remaining/1000)} seconds remaining</div>`
            }
            return ""
        }]
    ],
    
    clickables: {
        incinerator: {
            display() {
                if (player.slamo.incinerating) {
                    return `<div style="background: #654321; border: 2px solid #8B4513; padding: 20px; border-radius: 10px;">
                        <h3>🔥 INCINERATOR V1 🔥</h3>
                        <div style="background: #333; padding: 10px; margin: 10px 0; border-radius: 5px; position: relative; overflow: hidden;">
                            <div class="slamo-animation" style="background: #888; width: 40px; height: 40px; margin: 0 auto; border-radius: 5px; position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);">
                                😊
                            </div>
                            <div style="margin-top: 10px;">▶▶▶ Conveyor Belt ▶▶▶</div>
                        </div>
                        <div style="color: orange;">INCINERATING...</div>
                    </div>`
                } else {
                    return `<div style="background: #654321; border: 2px solid #8B4513; padding: 20px; border-radius: 10px; cursor: pointer;">
                        <h3>🔥 INCINERATOR V1 🔥</h3>
                        <div style="background: #333; padding: 10px; margin: 10px 0; border-radius: 5px;">
                            <div style="background: #888; width: 40px; height: 40px; margin: 0 auto; border-radius: 5px; display: flex; align-items: center; justify-content: center;">
                                😊
                            </div>
                            <div style="margin-top: 10px;">▶▶▶ Conveyor Belt ▶▶▶</div>
                        </div>
                        <div style="color: lime;">Click to incinerate a Slamo!</div>
                    </div>`
                }
            },
            canClick() {
                return !player.slamo?.incinerating
            },
            onClick() {
                if (!player.slamo.incinerating) {
                    player.slamo.incinerating = true
                    player.slamo.lastIncinerationTime = Date.now()
                    
                    // Schedule the completion
                    setTimeout(() => {
                        if (player.slamo.incinerating) {
                            player.slamo.incinerating = false
                            player.slamo.points = player.slamo.points.add(1)
                            player.slamo.incinerated = player.slamo.incinerated.add(1)
                        }
                    }, player.slamo.animationTime)
                }
            },
            style: {
                "width": "300px",
                "height": "200px",
                "background": "#654321",
                "border": "3px solid #8B4513",
                "border-radius": "15px",
                "font-size": "14px"
            }
        }
    },
    
    milestones: {
        1: {
            requirementDescription: "25 V1 Slamos incinerated",
            effectDescription: "1.5x Skill gain",
            done() {
                return player.slamo?.incinerated.gte(25)
            }
        },
        2: {
            requirementDescription: "75 V1 Slamos incinerated", 
            effectDescription: "1.5x Cash gain and automate Incinerator V1",
            done() {
                return player.slamo?.incinerated.gte(75)
            }
        },
        3: {
            requirementDescription: "200 V1 Slamos incinerated",
            effectDescription: "1.5x Tickspeed",
            done() {
                return player.slamo?.incinerated.gte(200)
            }
        }
    },
    
    update(diff) {
        // Auto-incinerator from milestone 2
        if (hasMilestone("slamo", 2) && !player.slamo?.incinerating) {
            // Auto-click every 3.5 seconds when automated
            if (Date.now() - (player.slamo.lastAutoClick || 0) > 3500) {
                player.slamo.lastAutoClick = Date.now()
                this.clickables.incinerator.onClick()
            }
        }
        
        // Update incinerating status
        if (player.slamo?.incinerating) {
            const elapsed = Date.now() - player.slamo.lastIncinerationTime
            if (elapsed >= player.slamo.animationTime) {
                player.slamo.incinerating = false
                player.slamo.points = player.slamo.points.add(1)
                player.slamo.incinerated = player.slamo.incinerated.add(1)
            }
        }

    }
})
.register()