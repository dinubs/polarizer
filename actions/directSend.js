function directSend(command) {
  return fetch(`/api/direct?command=${command}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        throw new Error('Could not run direct command');
      }

      return data;
    });
}

export default directSend;
