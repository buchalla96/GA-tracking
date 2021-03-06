var gaUtils = {
    sendGA: function (ev) {
        var me = $(this);
        var action = me.attr('ga-action') || me.attr('ga-trigger');
        var category = me.attr('ga-category');
        var label = me.attr('ga-label') || false;
        try {
            if (label) {
                ga('send','event', category, action, label);
//                console.log(['send','event', category, action]);
            } else {
//                console.log(['send','event', category, action, label]);
                ga('send', 'event', category, action);
            }
        } catch (err) {
            console.log(err);
        }
        if (me.is('a')) {
            if ((me.attr('href')) && ((!me.attr('target')) || (me.attr('target') === 'self'))) {
                ev.preventDefault();
                if (me.attr('href').indexOf('#') !== 0) {
                    setTimeout(function () {
                        document.location.href = me.attr('href');
                    }, 300);
                }
                return false;
            }
        }
    },
    bindEvents: function () {
        var events = [];
        $('[ga-trigger]').each(function(){
            var trigger = $(this).attr('ga-trigger');
            if($.inArray(trigger, events) === -1){
                events.push(trigger);
            }
        });
        for(var i = 0; i < events.length; i++){
            $(document).on(events[i], '[ga-trigger="'+events[i]+'"]', this.sendGA);
        }
    }
};

$(document).ready(function(){
    gaUtils.bindEvents();
});
