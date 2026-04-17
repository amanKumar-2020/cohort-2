import axios from "axios"

const authApiInstance = axios.create({
    baseURL:"api/auth",
    withCredentials:true
});

export async function register({ contact, email, fullName, isSeller, password }) {
  const Response = await authApiInstance.post("/register", {
    contact,
    email,
    password,
    fullName,
    isSeller,
  });

  return Response.data;
}