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
                updateBatteryIndicator(level);
            });
        }
    }

    function updateBatteryIndicator(level) {
        var indicator = document.getElementById('battery-indicator');
        var percentageText = document.getElementById('battery-percentage');

        // Обновляем текст с процентами
        if (percentageText) {
            percentageText.innerText = level;
        }

        // Выбираем цвет в зависимости от уровня заряда
        if (indicator) {
            if (level < 20) {
                indicator.style.backgroundColor = 'red';
            } else if (level < 50) {
                indicator.style.backgroundColor = 'yellow';
            } else {
                indicator.style.backgroundColor = 'green';
            }
        }
    }

    updateInfo();
    setInterval(updateInfo, 60000);

    if ('getBattery' in navigator) {
        navigator.getBattery().then(function(battery) {
            function updateBatteryInfo() {
                var level = Math.round(battery.level * 100);
                updateBatteryIndicator(level);
            }

            updateBatteryInfo();
            setInterval(updateBatteryInfo, 60000);

            battery.addEventListener('levelchange', updateBatteryInfo);
        });
    }
});
