import apiClient from ".";

function addToList(list_id, recipient_id) {
  return apiClient.put(`lists/${list_id}/subscriptions/${recipient_id}`);
}


export {
    addToList
}
