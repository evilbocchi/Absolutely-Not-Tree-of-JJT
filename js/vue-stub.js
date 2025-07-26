// Minimal Vue.js stub to get the game working
if (typeof Vue === 'undefined') {
    window.Vue = {
        component: function(name, options) {
            console.log('Vue component registered:', name);
        },
        nextTick: function(callback) {
            setTimeout(callback, 0);
        },
        set: function(target, key, value) {
            target[key] = value;
        },
        delete: function(target, key) {
            delete target[key];
        }
    };
    
    // Create a basic Vue constructor
    window.Vue = function(options) {
        if (options.el) {
            this.$el = document.querySelector(options.el);
            this.$data = options.data || {};
            if (options.mounted) {
                setTimeout(options.mounted.bind(this), 100);
            }
        }
        return this;
    };
    
    // Add static methods
    window.Vue.component = function(name, options) {
        console.log('Vue component registered:', name);
    };
    
    window.Vue.nextTick = function(callback) {
        setTimeout(callback, 0);
    };
    
    window.Vue.set = function(target, key, value) {
        target[key] = value;
    };
    
    window.Vue.delete = function(target, key) {
        delete target[key];
    };
}