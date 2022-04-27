// custom-tab-bar/index.js
Component({
    properties: {},
    data: {
        active: 'home'
    },
    methods: {
        changeActive({detail}) {
            wx.switchTab({
                url: `/pages/${detail}/index`,
            });
        },
    }
})