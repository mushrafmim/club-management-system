import apiClient from ".";

function sendIndividualMail(template: string, data, user_id: string) {
  return apiClient.post("send", {
    message: {
      template,
      to: {
        user_id: user_id,
      },
      data,
    },
  });
}

function sendBroadcastMail(template: string, data: JSON, recipient_list: string) {
  return apiClient.post("send", {
    message: {
      template: template,
      to: {
        data: data,
        list_id: recipient_list,
      },
    },
  });
}

export { sendIndividualMail, sendBroadcastMail };
