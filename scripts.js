document.addEventListener('DOMContentLoaded', function() {
    function updateInfo() {
        var currentTime = new Date();
        var hours = currentTime.getHours();
        var minutes = currentTime.getMinutes();
        var formattedTime = hours + ':' + (minutes < 10 ? '0' : '') + minutes;
        document.getElementById('current-time').innerText = formattedTime;

        if ('getBattery' in navigator) {
            navigator.getBattery().then(function(battery) {
                var level = Math.round(battery.level * 100);
                document.getElementById('battery-indicator').innerText = level + '%';
            });
        }
    }

    updateInfo();
    setInterval(updateInfo, 60000);

    if ('getBattery' in navigator) {
        navigator.getBattery().then(function(battery) {
            function updateBatteryInfo() {
                var level = Math.round(battery.level * 100);
                document.getElementById('battery-indicator').innerText = level;
            }

            updateBatteryInfo();
            setInterval(updateBatteryInfo, 60000);

            battery.addEventListener('levelchange', updateBatteryInfo);
        });
    }
});
