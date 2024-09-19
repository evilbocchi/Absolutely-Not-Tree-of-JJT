var layoutInfo = {
    startTab: "tfd",
    startNavTab: "class-negative",
	showTree: true,

    treeLayout: ""
}

addLayer("class-negative", {
    tabFormat: [["tree", function() {return (layoutInfo.treeLayout ? layoutInfo.treeLayout : TREE_LAYERS)}]],
    previousTab: "",
    leftTab: true,
})