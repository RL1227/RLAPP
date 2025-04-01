document.getElementById('microwave-button').addEventListener('click', () => {
    document.getElementById('microwave-form').style.display = 'block';
    document.getElementById('project-sekai-form').style.display = 'none';
    document.getElementById('microwave-results').innerHTML = '';
});

document.getElementById('project-sekai-button').addEventListener('click', () => {
    document.getElementById('project-sekai-form').style.display = 'block';
    document.getElementById('microwave-form').style.display = 'none';
    document.getElementById('project-sekai-results').innerHTML = '';
});

document.getElementById('calculate-microwave').addEventListener('click', () => {
    const inputTime = document.getElementById('input-time').value.split(':');
    const inputPower = parseInt(document.getElementById('input-power').value);
    const minutes = parseInt(inputTime[0]);
    const seconds = parseInt(inputTime[1]);
    const totalSeconds = minutes * 60 + seconds;

    const calculateTime = (targetPower, basePower, baseTime) => {
        return Math.floor((basePower / targetPower) * baseTime);
    };

    const results = {
        500: calculateTime(500, inputPower, totalSeconds),
        600: calculateTime(600, inputPower, totalSeconds),
        700: calculateTime(700, inputPower, totalSeconds)
    };

    const displayResults = `
        500W: ${Math.floor(results[500] / 60)}分${results[500] % 60}秒<br>
        600W: ${Math.floor(results[600] / 60)}分${results[600] % 60}秒<br>
        700W: ${Math.floor(results[700] / 60)}分${results[700] % 60}秒
    `;

    document.getElementById('microwave-results').innerHTML = displayResults;
});
document.getElementById('calculate-project-sekai').addEventListener('click', () => {
    const currentStamina = parseInt(document.getElementById('current-stamina').value);
    const timeToNextRecovery = parseInt(document.getElementById('time-to-next-recovery').value);

    const recoveryTimes = {
        20: (20 - currentStamina) * 30,
        25: (25 - currentStamina) * 30,
        30: (30 - currentStamina) * 30,
        50: (50 - currentStamina) * 30
    };

    const now = new Date();
    const calculateRecoveryTime = (stamina, currentStamina, timeToNextRecovery) => {
        if (currentStamina >= stamina) {
            return `${stamina}ライボ: 到達済み`;
        }
        const fullRecoveryTime = new Date(now.getTime() + recoveryTimes[stamina] * 60000);
        const adjustedRecoveryTime = new Date(fullRecoveryTime.getTime() - (30 - timeToNextRecovery) * 60000);

        let dayText = "";
        if (adjustedRecoveryTime.getDate() > now.getDate()) {
            dayText = "翌日";
        }

        return `ライボ${stamina}:${dayText}${adjustedRecoveryTime.getHours()}時${adjustedRecoveryTime.getMinutes()}分`;
    };

    const results = [
        calculateRecoveryTime(20, currentStamina, timeToNextRecovery),
        calculateRecoveryTime(25, currentStamina, timeToNextRecovery),
        calculateRecoveryTime(30, currentStamina, timeToNextRecovery),
        calculateRecoveryTime(50, currentStamina, timeToNextRecovery)
    ].join('<br>');

    document.getElementById('project-sekai-results').innerHTML = results;
});