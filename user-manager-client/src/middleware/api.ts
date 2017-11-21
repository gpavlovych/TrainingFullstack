const request = async (method: string, url: string, {payload, token}: any): Promise<any> => {
    let options: any = {
        method: method,
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    };

    if (typeof payload !== 'undefined') {
        options.body = JSON.stringify(payload);
    }

    if (typeof token !== 'undefined') {
        options.headers["Authorization"] = `Bearer ${token}`
    }

    return await fetch(url, options)
        .then(result=>{
            console.log(`success; response: ${result}`);
            return result;
        })
        .catch(error=>{
            console.log(`error; response: ${error}`);
        });
};

const get = async (url: string, token: string ) => {
    let response = await request("GET", url, {token});
    let responseBody = response.json();
    console.log(`response body: ${responseBody}`);
    return responseBody;
};

const post = async (url: string, payload: any) => {
    let response = await request("POST", url, {payload});
    let responseBody = response.json();
    console.log(`response body: ${responseBody}`);
    return responseBody;
};

export const login = async (payload:any)=> {
    return await post("http://localhost:4245/token",payload);
};

export const register = async (payload: any) =>{
    return await post("http://localhost:4245/api/v1/users",payload);
};

export const getUsers = async (jwt: string) =>{
    return await get("http://localhost:4245/api/v1/users", jwt);
};