const request = async (method: string, url: string, {body, token, contentType}: any): Promise<any> => {
    let options: any = {
        method: method,
        credentials: "same-origin",
        body: body,
        headers: {}
    };

    if (typeof contentType !== 'undefined') {
        options.headers["Content-Type"] = contentType;
    }

    if (typeof token !== 'undefined') {
        options.headers["Authorization"] = `Bearer ${token}`;
    }

    return await fetch(url, options)
        .then(result => {
            console.log(`success; response: ${result}`);
            return result;
        })
        .catch(error => {
            console.log(`error; response: ${error}`);
        });
};

const get = async (url: string, token: string ) => {
    let response = await request("GET", url, {token});
    let responseBody = response.json();
    console.log(`response body: ${responseBody}`);
    return responseBody;
};

const post = async (url: string, {body, token, contentType}: any) => {
    let response = await request("POST", url, {body, token, contentType});
    let responseBody = response.json();
    console.log(`response body: ${responseBody}`);
    return responseBody;
};
/*
const put = async (url: string, {payload, token}: any) => {
    let response = await request("PUT", url, {token, payload});
    let responseBody = response.json();
    console.log(`response body: ${responseBody}`);
    return responseBody;
};
*/
export const login = async ({email, password}: any)=> {
    return await post("http://localhost:4245/token",{body: JSON.stringify({username: email, password}), contentType: "application/json"});
};

export const register = async ({email, password, firstName, lastName, position, userPhoto}: any) =>{
    let formData = new FormData();

    formData.append("userPhoto", userPhoto, userPhoto.name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("position", position);

    return await post("http://localhost:4245/api/v1/users",{body: formData});
};

export const getUsers = async ({token}: any) =>{
    return await get("http://localhost:4245/api/v1/users", token);
};