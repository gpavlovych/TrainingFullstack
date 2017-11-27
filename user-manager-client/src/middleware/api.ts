// tslint:disable-next-line
const request = async (method: string, url: string, {body, token, contentType}: any): Promise<any> => {
    url = process.env.REACT_APP_API_URL + url;
    const options: RequestInit = {
        method: method,
        credentials: 'same-origin',
        body: body,
        headers: {}
    };

    if (typeof contentType !== 'undefined') {
        options.headers['Content-Type'] = contentType;
    }

    if (typeof token !== 'undefined') {
        options.headers.Authorization = `Bearer ${token}`;
    }

    return await fetch(url, options)
        .then(result => {
            if (!result.ok) {
                throw `error; response:  ${result.status} ${result.statusText}`;
            }

            return result;
        })
        .catch(error => {
            throw error;
        });
};

// tslint:disable-next-line
const get = async (url: string, token: string ) => {
    const response = await request('GET', url, {token});
    const responseBody = await response.json();
    return responseBody;
};

// tslint:disable-next-line
const post = async (url: string, {body, token, contentType}: any) => {
    const response = await request('POST', url, {body, token, contentType});
    const responseBody = await response.json();
    return responseBody;
};

// tslint:disable-next-line
export const login = async ({email, password}: any) => {
    return await post('token', {
        body: JSON.stringify({username: email, password}),
        contentType: 'application/json'
    });
};

// tslint:disable-next-line
export const register = async ({email, password, firstName, lastName, position, userPhoto}: any) => {
    const formData = new FormData();
    if (userPhoto) {
        formData.append('userPhoto', userPhoto, userPhoto.name);
    }

    formData.append('email', email);
    formData.append('password', password);
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('position', position);

    return await post('api/v1/users', {
        body: formData
    });
};

// tslint:disable-next-line
export const getUsers = async ({token}: any) => {
    return await get('api/v1/users', token);
};