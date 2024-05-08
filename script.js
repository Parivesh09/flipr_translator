async function translateText() {
    const inputText = document.getElementById('inputText').value;
    const sourceLang = document.getElementById('sourceLang').value;
    const targetLang = document.getElementById('targetLang').value;
    const translatedText = document.getElementById('translatedText');

    const url = 'https://google-translate113.p.rapidapi.com/api/v1/translator/text';
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': '4d2b3572bdmsh0fefe22b48abf75p1c6b8djsn36a2f1164436',
            'X-RapidAPI-Host': 'google-translate113.p.rapidapi.com'
        },
        body: new URLSearchParams({
            from: sourceLang,
            to: targetLang,
            text: inputText
        })
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        translatedText.innerHTML = result.trans;
    } catch (error) {
        console.error(error);
    }

}

const url = 'https://google-translate113.p.rapidapi.com/api/v1/translator/support-languages';
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '4d2b3572bdmsh0fefe22b48abf75p1c6b8djsn36a2f1164436',
        'X-RapidAPI-Host': 'google-translate113.p.rapidapi.com'
    }
};

async function populateLanguages() {
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        // console.log(data);
        const supportedLanguages = data;
        // console.log(supportedLanguages);

        const sourceLangSelect = document.getElementById('sourceLang');
        const targetLangSelect = document.getElementById('targetLang');

        supportedLanguages.forEach(lang => {
            const option = document.createElement('option');
            option.value = lang.code;
            option.text = lang.language;
            sourceLangSelect.add(option.cloneNode(true));
            targetLangSelect.add(option.cloneNode(true));
        });
    } catch (error) {
        console.error('Error fetching supported languages:', error);
    }
}

populateLanguages();
inputText.addEventListener('input', translateText);
