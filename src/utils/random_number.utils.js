function generateOrderNumber() {
  const timestamp = Date.now().toString(); // Get current timestamp
  const randomNumber = Math.floor(Math.random() * 1000); // Generate random number
  return randomNumber + timestamp; // Concatenate timestamp and random number
}

export default generateOrderNumber;
