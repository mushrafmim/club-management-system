import apiClient from ".";

function scheduleAutomation(delay_until, recipient, template, data) {
  return apiClient.post(`automations/invoke`, {
    automation: {
      steps: [
        {
          action: "delay",
          until: delay_until,
        },
        {
          action: "send",
          recipient: recipient,
          template: template,
        },
      ],
    },
    data,
  });
}

export { scheduleAutomation };
