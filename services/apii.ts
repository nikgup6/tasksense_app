const API_URL = "http://192.168.2.118:5000/api/users";

export const fetchProfile = async (token: string) => {
    const response = await fetch(API_URL, {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: token },
    });
    return response.json();
};

export const updateProfile = async (token: string, data: { FullName: string; age: String; address:String }) => {
    const response = await fetch(`${API_URL}/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: token },
        body: JSON.stringify(data),
    });
    return response.json();
};
