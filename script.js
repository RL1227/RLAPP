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

    const results = {
        500: Math.floor((totalSeconds / inputPower) * 500),
        600: Math.floor((totalSeconds / inputPower) * 600),
        700: Math.floor((totalSeconds / inputPower) * 700)
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
        30: (30 - currentStamina) * 30
    };

    const now = new Date();
    const calculateRecoveryTime = (stamina, currentStamina, timeToNextRecovery) => {
        if (currentStamina >= stamina) {
            return `${stamina}ライボ: 到達済み`;
        }
        const fullRecoveryTime = new Date(now.getTime() + recoveryTimes[stamina] * 60000);
        const adjustedRecoveryTime = new Date(fullRecoveryTime.getTime() - (30 - timeToNextRecovery) * 60000);
        return `ライボ${stamina}:${adjustedRecoveryTime.getHours()}時${adjustedRecoveryTime.getMinutes()}分`;

    };

    const results = [
        calculateRecoveryTime(20, currentStamina, timeToNextRecovery),
        calculateRecoveryTime(25, currentStamina, timeToNextRecovery),
        calculateRecoveryTime(30, currentStamina, timeToNextRecovery)
    ].join('<br>');

    document.getElementById('project-sekai-results').innerHTML = results;
});
