
export function authHeader() {
    // return authorization header with jwt token
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
        return { Authorization: `Bearer ${accessToken}` };
    } else {
        return {};
    }
}