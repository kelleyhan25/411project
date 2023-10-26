import requests

# Define the API endpoint URL
api_url = "https://api.api-ninjas.com/v1/facts"

# Replace 'YOUR_API_KEY' with your actual API key
api_key = "526QR0kJwoLViPbK+krDiw==mTa6VQSbMiq47NWo"

# Set up the headers with the API key
headers = {
    "APIKey": api_key
}

# Make the GET request to the API
response = requests.get(api_url, headers=headers)

# Check if the request was successful (status code 200)
if response.status_code == 200:
    # Parse the JSON response
    data = response.json()
    # Extract and print the fact
    fact = data.get("fact")
    print("Random Fact:", fact)
else:
    # If the request was not successful, print an error message
    print("Error:", response.status_code)
