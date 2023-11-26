export async function submitJob(s3_url:string):Promise<string | null>{
    const payload = {
        input: {
            s3_url: s3_url,
        }
    };

    const headers = {
        'accept': 'application/json',
        'content-type': 'application/json',
        'authorization': `Bearer ${process.env.RUNPOD_API_TOKEN}`,
    };

    try {
        console.log('Submitting job');
        const url = `https://api.runpod.ai/v2/${process.env.RUNPOD_API_ENDPOINT}/runsync`
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: headers,
        });
        const responseData = await response.json();
        console.log(responseData);
        const jobId = responseData.id;
        return jobId
    } catch (error) {
        console.error('Error submitting job:', error);
        return null
    }
};

