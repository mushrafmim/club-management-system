import apiClient from ".";

function addUser(userId, data) {
  return apiClient.post(`profiles/${userId}`, {
    profile: data,
  });
}

export { addUser };
