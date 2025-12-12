// Quick test of the API
const testGenerate = async () => {
    try {
        console.log('Testing /generate endpoint...');
        const response = await fetch('http://localhost:5000/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                inputText: 'John Doe, Senior Software Engineer with 5 years of experience in web development'
            }),
            timeout: 60000  // 60 second timeout for Gemini API
        });
        
        console.log('Response status:', response.status);
        const data = await response.json();
        console.log('Response received:');
        console.log(JSON.stringify(data, null, 2));
        process.exit(0);
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
};

// Set a hard timeout of 70 seconds
setTimeout(() => {
    console.error('Test timeout after 70 seconds');
    process.exit(1);
}, 70000);

testGenerate();
