export async function submitJob(bucket_name:string, object_name:string):Promise<string | null>{
    const payload = {
        input: {
            s3:{
                bucket_name:bucket_name,
                object_name:object_name,
            }
        }
    };

    const headers = {
        'accept': 'application/json',
        'content-type': 'application/json',
        'authorization': `Bearer ${process.env.RUNPOD_API_TOKEN}`,
    };

    try {
        console.log('Submitting job');
        const url = `https://api.runpod.ai/v2/${process.env.RUNPOD_API_ENDPOINT}/run`
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
}

export type JobStatus = "IN_QUEUE" | "IN_PROGRESS" | "CANCELLED" |"FAILED" | "COMPLETED";

export async function checkJobStatus(jobId: string): Promise<JobStatus|null> {
    const url = `https://api.runpod.ai/v2/${process.env.RUNPOD_API_ENDPOINT}/status/${jobId}`;
    const headers = {
        "accept": "application/json",
        "authorization": `Bearer ${process.env.RUNPOD_API_TOKEN}`,
    };
    try{
        const statusResponse = await fetch(url, { headers: headers });
        const statusDict = await statusResponse.json();
        return statusDict.status;
    }
    catch(error:any){
        console.error(error)
        return null
    }
}

